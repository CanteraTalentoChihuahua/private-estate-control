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
  async getHouses() {
    const res = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/houses/get"
    );
    this.setState({ houses: res.data });
  }
  async getUsers() {
    const res = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/users/get"
    );
    this.setState({ users: res.data });
  }
  async componentDidMount() {
    this.getHouses();
    this.getUsers();
    console.log(this.state.users);
  }
  //Función para editar
  onEditar = (key) => {
    this.onBurger();
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
  onBurger = () => {
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".house-form"),
      0
    );
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      if ($target.classList.value === "is-danger") {
        el.classList.toggle("is-success");
      } else {
        el.classList.toggle("is-danger");
      }
      $target.classList.toggle("is-hidden");
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
  //Abrir modal para add users
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
  //POST y PUT para crear houses
  onSubmit = async (e) => {
    e.preventDefault();
    if (this.state.edit) {
      axios
        .put(
          "https://gestion-fraccionamiento.herokuapp.com/houses/put/" +
            this.state.idEdit,
          this.state.newHouses
        )
        .then((res) => {
          console.log(res);
          this.getHouses();
          this.onBurger();
          // eslint-disable-next-line
          this.state.edit = false;
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
          console.log(exception.response.data);
        });
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
  onDeleteAlert = async (address) => {
    Swal.fire({
      title: "Are you sure you want to delete " + address + "?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your file has been deleted.",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "error",
          title: "Cancelled",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  addUser = () => {};
  onCreateUser = async (e) => {
    e.preventDefault();
    if (this.state.edit) {
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
      axios.put("https://gestion-fraccionamiento.herokuapp.com/users/put/"+this.state.idEdit,this.state.newUsers)
        .then((res) => {
          console.log(res);
          this.getUsers();
        })
        .catch((exception) => {
          console.log(exception.response);
        });
    } else {
      await this.setState({
        newUsers: {
          ...this.state.newUsers,
          idResDev: JSON.parse(localStorage.getItem("idResDev")),
        },
      });
      console.log(this.state.newUsers);
      axios.post("https://gestion-fraccionamiento.herokuapp.com/users/post",this.state.newUsers)
        .then((res) => {
          console.log(res);
          this.getUsers();
        })
        .catch((exception) => {
          console.log(exception.response);
        });
    }
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
              <Title title="Add resident" class="is-4" />
              <br />
              <Select
                name="idHouse"
                className=""
                onChange={this.onChangeSearchBar}
                options={this.state.users.map((user) => ({
                  label: user.FirstName,
                  value: user.IdUser,
                }))}
              />
              <br />
              <div className="columns is-multiline container">
                <div className="column is-6 has-text-centered">
                  <Link
                    to="/houses"
                    onClick={this.addUser}
                    className="button is-success is-fullwidth"
                  >
                    Save
                  </Link>
                </div>
                <div className="column is-6 has-text-centered">
                  <Link
                    to="/houses"
                    className="b-close button is-danger is-fullwidth"
                    aria-label="close"
                  >
                    Cancel
                  </Link>
                </div>
                <div className="column is-12 has-text-centered">
                  <Link
                    to="/houses"
                    data-target="modal-create"
                    onClick={this.onAddModal}
                    className="js-modal-create b-close button is-link is-light is-outlined"
                  >
                    Create User
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
              <Title title="Create resident" class="is-4" />
              <form onSubmit={this.onCreateUser}>
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
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left">
                    <input
                      name="email"
                      type="email"
                      placeholder="e.g. bobsmith@gmail.com"
                      className="input"
                      required
                      value={this.state.newUsers.email}
                      onChange={this.onChangeUsers}
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control has-icons-left">
                    <input
                      id="passwordInput"
                      name="password"
                      type="password"
                      placeholder="*******"
                      className="input"
                      required
                      value={this.state.newUsers.password}
                      onChange={this.onChangeUsers}
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">FaceId</label>
                  <div className="control has-icons-left">
                    <input
                      name="faceId"
                      type="text"
                      placeholder="TuCara"
                      className="input"
                      required
                      value={this.state.newUsers.faceId}
                      onChange={this.onChangeUsers}
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-smile-plus"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
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
              <Title title="Update resident" class="is-4" />
              <form>
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
                      onChange={this.onChange}
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
                      onChange={this.onChange}
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
                      onChange={this.onChange}
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-mobile"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control has-icons-left">
                    <input
                      name="email"
                      type="email"
                      placeholder="e.g. bobsmith@gmail.com"
                      className="input"
                      required
                      value={this.state.newUsers.email}
                      onChange={this.onChange}
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-envelope"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <label className="label">FaceId</label>
                  <div className="control has-icons-left">
                    <input
                      name="faceId"
                      type="text"
                      placeholder="TuCara"
                      className="input"
                      required
                      value={this.state.newUsers.faceId}
                      onChange={this.onChange}
                    />
                    <span className="icon is-small is-left">
                      <i className="fa fa-smile-plus"></i>
                    </span>
                  </div>
                </div>
                <div className="field">
                  <button type="submit" className="button is-success">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close"></button>
        </div>
        <Navbar />
        <section className="main-content columns is-multiline is-variable">
          <Sidebar />
          <div className="column box" style={{ marginRight: "14px" }}>
            <div className="columns is-multiline" style={{ marginTop: "5px" }}>
              <div className="column is-12">
                <div className="box has-background-white-ter">
                  <Title title="Houses" class="is-2" />
                </div>
              </div>
              <div className="column is-12">
                <div className="box has-background-white-ter">
                  <div className="columns mb-0">
                    <div className="column is-11">
                      <Title title="New House" class="is-4" />
                    </div>
                    <div className="column is-1">
                      <button
                        onClick={this.onBurger}
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
                        <button type="submit" className="button is-success">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="column is-12">
                <div className="box has-background-white-ter">
                  <table className="table is-fullwidth has-background-white-ter is-hoverable">
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
                                onClick={() =>
                                  this.onDeleteAlert(house.Address)
                                }
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
