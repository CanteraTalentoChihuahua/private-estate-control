import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserTable from "../components/molecules/userTable";
import Sidebar from "../components/molecules/Sidebar";
import Title from "../components/atoms/Title";
import Select from "react-select";
import Navbar from "../components/molecules/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import {
  faBars,
  faEdit,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
const tkn = JSON.parse(localStorage.getItem("tkn"));
axios.defaults.headers.common = { Authorization: "bearer " + tkn };
export default class Houses extends Component {
  state = {
    houses: [],
    users: [],
    linkUser: "",
    house: {
      idHouse: "",
    },
    newUsers: {
      idResDev: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
      email: "",
      faceId: "",
      idHouse: "",
    },
    newHouses: {
      address: "",
      occuppied: "",
      balance: "",
      idResDev: JSON.parse(localStorage.getItem("idResDev")),
    },
    edit: false,
    idEdit: "",
  };
  //Obtener todas las casas
  async getHouses() {
    const res = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/houses/get"
    );
    console.log(this.myRef);
    this.setState({ houses: res.data });
  }
  //Obtener todos los usuarios
  async getUsers() {
    const res = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/users/get"
    );
    this.setState({ users: res.data });
  }
  //Creacion de componentes
  async componentDidMount() {
    this.getHouses();
    this.getUsers();
  }
  //Función para editar
  onEditar = (key) => {
    this.onBurger(1);
    // eslint-disable-next-line
    this.state.edit = true;
    this.setState({
      idEdit: key.IdHouse,
      newHouses: {
        ...this.state.newHouses,
        address: key.Address,
        occuppied: key.Occuppied,
        balance: key.Balance,
        idResDev: key.IdResDev,
      },
    });
  };
  //Función para ocultar y mostrar el formulario
  onBurger = (edit) => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll(".house-form"),0);
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      console.log($target.classList.value)
      if ($target.classList.value === "is-hidden") {
        el.classList.add("is-success");
        el.classList.remove("is-danger");
        this.setState({
          newHouses:{
          address: "",
          occuppied: "",
          balance: "",
          idResDev: JSON.parse(localStorage.getItem("idResDev")),
          }
        })
      } else {
        el.classList.remove("is-success");
        el.classList.add("is-danger");
      }
      if(!(edit===1&&$target.classList.value==="")){
      $target.classList.toggle("is-hidden");
      }
    });
  };
  //Mostrar usuarios en el select
  showUsers = (id) => {
    const row = document.getElementById("usersTable" + id);
    row.classList.toggle("is-hidden");
  };
  //Capturando datos del formulario
  onChange = async (e) => {
    await this.setState({
      newHouses: {
        ...this.state.newHouses,
        [e.target.name]: e.target.value,
      },
    });
  };
  //Capturando datos del formulario users
  onChangeUsers = async (e) => {
    await this.setState({
      newUsers: {
        ...this.state.newUsers,
        [e.target.name]: e.target.value,
      },
    });
  };
  //Abrir modal para link user-house
  onAddModalLink = async (idHouseL) => {
    await this.setState({ house: { idHouse: idHouseL } });
    function openModal($el) {
      $el.classList.add("is-active");
    }
    function closeModal($el) {
      $el.classList.remove("is-active");
    }
    function closeAllModals() {
      (document.querySelectorAll(".modal") || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll(".js-modal-add") || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
      openModal($target);
    });
    // Add a click event on various child elements to close the parent modal
    (
      document.querySelectorAll(
        ".modal-background, .modal-close, .modal-card-head, .delete, .modal-card-foot, .button, .b-close"
      ) || []
    ).forEach(($close) => {
      const $target = $close.closest(".modal");
      $close.addEventListener("click", () => {
        closeModal($target);
      });
    });
    // Add a keyboard event to close all modals
    document.addEventListener("keydown", (event) => {
      const e = event || window.event;
      if (e.keyCode === 27) {
        // Escape key
        closeAllModals();
      }
    });
  };
  //Abrir modal para create user
  onAddModal = () => {
    function openModal($el) {
      $el.classList.add("is-active");
    }

    function closeModal($el) {
      $el.classList.remove("is-active");
    }

    function closeAllModals() {
      (document.querySelectorAll(".modal") || []).forEach(($modal) => {
        closeModal($modal);
      });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll(".js-modal-create") || []).forEach(
      ($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);
        openModal($target);
      }
    );

    // Add a click event on various child elements to close the parent modal
    (
      document.querySelectorAll(
        ".modal-background, .modal-close, .modal-card-head, .delete, .modal-card-foot, .button, .b-close"
      ) || []
    ).forEach(($close) => {
      const $target = $close.closest(".modal");
      $close.addEventListener("click", () => {
        closeModal($target);
      });
    });

    // Add a keyboard event to close all modals
    document.addEventListener("keydown", (event) => {
      const e = event || window.event;

      if (e.keyCode === 27) {
        // Escape key
        closeAllModals();
      }
    });
  };
  //Abrir modal para update user
  onUpdateModal = async (user) => {
    await this.setState({
      newUsers: {
        IdUser: user.IdUser,
        firstName: user.FirstName,
        lastName: user.LastName,
        phoneNumber: user.PhoneNumber,
        idResDev: JSON.parse(localStorage.getItem("idResDev")),
      },
    });
    function openModal($el) {
      $el.classList.add("is-active");
    }
    function closeModal($el) {
      $el.classList.remove("is-active");
    }
    function closeAllModals() {
      (document.querySelectorAll(".modal") || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll(".js-modal-update") || []).forEach(
      ($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);
        openModal($target);
      }
    );
    // Add a click event on various child elements to close the parent modal
    (
      document.querySelectorAll(
        ".modal-background, .modal-close, .modal-card-head, .delete, .modal-card-foot, .button, .b-close"
      ) || []
    ).forEach(($close) => {
      const $target = $close.closest(".modal");
      $close.addEventListener("click", () => {
        closeModal($target);
      });
    });
    // Add a keyboard event to close all modals
    document.addEventListener("keydown", (event) => {
      const e = event || window.event;
      if (e.keyCode === 27) {
        // Escape key
        closeAllModals();
      }
    });
  };
  //POST y PUT para crear houses
  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.edit) {
      axios
        .put( "https://gestion-fraccionamiento.herokuapp.com/houses/put/" + this.state.idEdit, this.state.newHouses )
        .then((res) => {
          console.log(res);
          this.getHouses();
          this.onBurger();
          // eslint-disable-next-line
          this.state.edit = false;
          this.setState({ newHouses: { ...this.state.newHouses, address: "", occuppied: "", balance: "", },});
        })
        .catch((exception) => { console.log(exception.response.data); });
    } else {
      axios
        .post(
          "https://gestion-fraccionamiento.herokuapp.com/houses/post",
          this.state.newHouses
        )
        .then((res) => {
          console.log(res);
          this.getHouses();
          this.onBurger();
          this.setState({
            newHouses: {
              ...this.state.newHouses,
              address: "",
              occuppied: "",
              balance: "",
            },
          });
        })
        .catch((exception) => {
          alert(exception.response.data.msg);
        });
    }
  };
  //Alert para eliminar houses
  onDeleteAlert = async (house) => {
    Swal.fire({ title: "Are you sure you want to delete " + house.Address + "?", text: "You won't be able to revert this!", icon: "warning",  showCancelButton: true, confirmButtonText: "Yes, delete it!", cancelButtonText: "No, cancel!", reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios
          .delete(
            "https://gestion-fraccionamiento.herokuapp.com/houses/delete/" +
              house.IdHouse
          )
          .then((res) => {
            console.log(res);
            this.getUsers();
            Swal.fire({ icon: "success", title: "Deleted!",
              text: "The house has been deleted.", showConfirmButton: false, timer: 2000,});
          })
          .catch((exception) => {
            Swal.fire({ icon: "error", title: "Delete cancelled", text: exception.response.data.errors[0].msg, showConfirmButton: false, timer: 1500,});
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({icon: "error", title: "Delete cancelled", showConfirmButton: false, timer: 1500,});
      }
    });
  };
  //Axios para linkear user-house
  addUser = () => {
    console.log("idHouse: " + this.state.house.idHouse);
    console.log("idUser: " + this.state.linkUser);
    axios
      .post(
        "https://gestion-fraccionamiento.herokuapp.com/users/post/link/" +
          this.state.linkUser,
        this.state.house
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Linked!",
          text: "The resident was linked!",
          showConfirmButton: false,
          timer: 2000,
        });
        this.getUsers();
        this.getHouses();
      })
      .catch((exception) => {
        Swal.fire({
          icon: "error",
          title: "Delete cancelled",
          text: exception.response.data.errors[0].msg,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  //Capturando datos del select
  onChangeSearchBar = async (e) => {
    await this.setState({
      linkUser: e.value,
    });
  };
  //Axios para create user
  onCreateUser = async (e) => {
    e.preventDefault();
    await this.setState({
      newUsers: {
        ...this.state.newUsers,
        idResDev: JSON.parse(localStorage.getItem("idResDev")),
        idHouse: this.state.idHouse,
      },
    });
    axios
      .post(
        "https://gestion-fraccionamiento.herokuapp.com/users/post",
        this.state.newUsers
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Created!",
          text: this.state.newUsers.firstName + " has been created.",
          showConfirmButton: false,
          timer: 2000,
        });
        this.getHouses();
        this.getUsers();
      })
      .catch((exception) => {
        Swal.fire({
          icon: "error",
          title: "Create cancelled",
          text: exception.response.data.errors[0].msg,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  //Axios para update user
  onUpdateUser = async (e) => {
    e.preventDefault();
    for (let i = 0; i < this.state.houses.length; i++) {
      if (
        (await this.state.houses[i].Address) === this.state.newUsers.idHouse
      ) {
        this.setState({
          newUsers: {
            ...this.state.newUsers,
            idHouse: this.state.houses[i].IdHouse,
          },
        });
      }
    }
    console.log(this.state.newUsers);
    axios
      .put(
        "https://gestion-fraccionamiento.herokuapp.com/users/put/" +
          this.state.newUsers.IdUser,
        this.state.newUsers
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Your file has been updated.",
          showConfirmButton: false,
          timer: 2000,
        });
        this.getHouses();
        this.getUsers();
      })
      .catch((exception) => {
        Swal.fire({
          icon: "error",
          title: "Update cancelled",
          text: exception.response.data.errors[0].msg,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  render() {
    const tkn = JSON.parse(localStorage.getItem("tkn"));
    if (tkn == null) {
      this.props.history.push("/login");
    }
    return (
      <div>
        {/*Código para el modelo add user*/}
        <div id="modal-add" className="modal">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <Title title="Add resident" class="is-4 is-family-sans-serif"/>
              <br/>
              <Select name="idHouse" onChange={this.onChangeSearchBar} options={this.state.users.map((user) => ({ label: user.FirstName + " " + user.LastName, value: user.IdUser, }))}/>
              <br/>
              <div className="columns is-multiline container">
                <div className="column is-6 has-text-centered">
                  <Link to="/houses" onClick={this.addUser} className="button is-fullwidth" style={{ backgroundColor: "#47b181", color: "#FFF" }}>
                    <h2>Save</h2>
                  </Link>
                </div>
                <div className="column is-6 has-text-centered">
                  <Link to="/houses" className="b-close button is-danger is-fullwidth" aria-label="close">
                    <h2>Cancel</h2>
                  </Link>
                </div>
                <div className="column is-12 has-text-centered">
                  <Link to="/houses" data-target="modal-create" onClick={this.onAddModal} className="js-modal-create b-close button is-link is-light is-outlined">
                    <h2>Create User</h2>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close"></button>
        </div>
        {/*Código para el modelo create user*/}
        <div id="modal-create" className="modal">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <Title title="Create resident" class="is-4 is-family-sans-serif" />
              <form onSubmit={this.onCreateUser}>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control has-icons-left">
                    <input name="firstName" type="text" id="firstName" placeholder="Bob" className="input" required value={this.state.newUsers.firstName} onChange={this.onChangeUsers}/>
                    <span className="icon is-small is-left">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Last Name</label>
                  <div className="control has-icons-left">
                    <input name="lastName" type="text" placeholder="Smith" className="input" required value={this.state.newUsers.lastName} onChange={this.onChangeUsers}/>
                    <span className="icon is-small is-left">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Phone number</label>
                  <div className="control has-icons-left">
                    <input name="phoneNumber" type="text" placeholder="6141234567" className="input" required value={this.state.newUsers.phoneNumber} onChange={this.onChangeUsers}/>
                    <span className="icon is-small is-left">
                      <i className="fa fa-mobile"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left">
                    <input name="email" type="email" placeholder="e.g. bobsmith@gmail.com" className="input" required value={this.state.newUsers.email} onChange={this.onChangeUsers}/>
                    <span className="icon is-small is-left">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left">
                    <input id="passwordInput" name="password" type="password" placeholder="*******" className="input" required value={this.state.newUsers.password} onChange={this.onChangeUsers}/>
                    <span className="icon is-small is-left">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">FaceId</label>
                  <div className="control has-icons-left">
                    <input name="faceId" type="text" placeholder="TuCara" className="input" required value={this.state.newUsers.faceId} onChange={this.onChangeUsers}/>
                    <span className="icon is-small is-left">
                      <i className="fa fa-smile-plus"></i>
                    </span>
                  </div>
                </div>
                <div className="columns">
                <div className="field column is-6">
                  <button type="submit" className="button is-fullwidth" style={{ backgroundColor: "#47b181", color: "#FFF" }}>
                    <h2>Save</h2>
                  </button>
                </div>
                <div className="column is-6">
                  <Link to="/houses" className="b-close button is-danger is-fullwidth" aria-label="close">
                    <h2>Cancel</h2>
                  </Link>
                </div>
                </div>
              </form>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close"></button>
        </div>
        {/*Código para el modelo create user*/}
        <div id="modal-update" className="modal">
          <div className="modal-background"></div>
          <div className="modal-content">
            <div className="box">
              <Title title="Update resident" class="is-4 is-family-sans-serif" />
              <form onSubmit={this.onUpdateUser}>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control has-icons-left">
                    <input
                      name="firstName"
                      type="text"
                      id="firstName"
                      placeholder="Bob"
                      className="input"
                      required
                      value={this.state.newUsers.firstName}
                      onChange={this.onChangeUsers}
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Lastname</label>
                  <div className="control has-icons-left">
                    <input
                      name="lastName"
                      type="text"
                      placeholder="Smith"
                      className="input"
                      required
                      value={this.state.newUsers.lastName}
                      onChange={this.onChangeUsers}
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-user"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Phone number</label>
                  <div className="control has-icons-left">
                    <input
                      name="phoneNumber"
                      type="text"
                      placeholder="6141234567"
                      className="input"
                      required
                      value={this.state.newUsers.phoneNumber}
                      onChange={this.onChangeUsers}
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-mobile"></i>
                    </span>
                  </div>
                </div>
                <div className="columns">
                <div className="field column is-6 has-text-centered">
                  <button type="submit" className="button is-fullwidth" style={{ backgroundColor: "#47b181", color: "#FFF" }}>
                    <h2>Save</h2>
                  </button>
                </div>
                <div className="column is-6 has-text-centered">
                  <Link to="/houses" className="b-close button is-danger is-fullwidth" aria-label="close">
                    <h2>Cancel</h2>
                  </Link>
                </div>
                </div>
              </form>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close"></button>
        </div>
        <Navbar />
        <section className="main-content columns is-multiline is-variable">
          <Sidebar />
          <div className="column box has-background-white-ter" style={{ marginRight: "14px" }}>
            <div className="columns is-multiline" style={{ marginTop: "5px" }}>
              <div className="column is-12">
                <div className="box titulo">
                  <Title title="Houses" class="is-2 has-text-white is-family-sans-serif" />
                </div>
              </div>
              <div className="column is-12">
                <div className="box has-background-white">
                  <div className="columns mb-0">
                    <div className="column is-11">
                      <Title title="New House" class="is-4 is-family-sans-serif" />
                    </div>
                    <div className="column is-1">
                      <button
                        onClick={()=>this.onBurger(0)}
                        className="button icon house-form is-success"
                        data-target="housesForm"
                      >
                        <FontAwesomeIcon id="icono" icon={faPlus} />
                      </button>
                    </div>
                  </div>
                  <div id="housesForm" className="is-hidden">
                    <form onSubmit={this.onSubmit}>
                      <div className="field">
                        <label className="label">Address</label>
                        <div className="control has-icons-left">
                          <input
                            name="address"
                            type="text"
                            placeholder="Fake Address #2536"
                            className="input"
                            required
                            value={this.state.newHouses.address}
                            onChange={this.onChange}
                          />
                          <span className="icon is-small is-left">
                            <i className="fa fa-id-badge"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <button type="submit" className="button" style={{ backgroundColor: "#47b181", color: "#FFF" }}>
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="column is-12">
                <div className="box has-background-white">
                  <table className="table is-fullwidth has-background-white is-hoverable">
                    <thead>
                      <tr>
                        <th>Address</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    {this.state.houses.map((house) => {
                      return (
                        <tbody>
                          <tr role="button" key={house.IdHouse}>
                            <td
                              onClick={() => this.showUsers(house.IdHouse)}
                              style={{
                                verticalAlign: "middle",
                                cursor: "pointer",
                              }}
                            >
                              <span className="icon">
                                <FontAwesomeIcon icon={faBars} />
                              </span>{" "}
                              {house.Address}
                            </td>
                            <td>
                              <Link
                                to={"/houses/" + house.Id}
                                onClick={() => this.onEditar(house)}
                                className="button"
                              >
                                <FontAwesomeIcon icon={faEdit} />
                              </Link>
                            </td>
                            <td>
                              <Link
                                to="/houses"
                                onClick={() => this.onDeleteAlert(house)}
                                className="button"
                              >
                                <FontAwesomeIcon icon={faTimes} />
                              </Link>
                            </td>
                          </tr>
                          <tr
                            id={"usersTable" + house.IdHouse}
                            className="table is-fullwidth is-hidden"
                          >
                            <td
                              className="has-background-white-bis p-0"
                              colSpan={3}
                            >
                              <UserTable
                                ref={this.myRef}
                                onUpdateModal={this.onUpdateModal}
                                onAddModal={this.onAddModalLink}
                                idHouse={house.IdHouse}
                                state={this.state}
                              />
                            </td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
