import axios from "axios";
import React, { Component } from "react";
import Title from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
import Sidebar from "../components/molecules/Sidebar";
import UserTable from "../components/molecules/userTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
const tkn = JSON.parse(localStorage.getItem("tkn"));
axios.defaults.headers.common = { Authorization: "bearer " + tkn };
export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      houses: [],
      users: [],
      newUsers: {
        idUser: "",
        idResDev: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        email: "",
        faceId: "",
        idHouse: "",
      },
      edit: false,
      idEdit: "",
    };
  }

  //GET para obtener usuarios
  async getUsers() {
    const res = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/users/get"
    );
    const resHouses = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/houses/get"
    );
    this.setState({ users: res.data });
    this.setState({ houses: resHouses.data });
  }
  async componentDidMount() {
    this.getUsers();
    //console.log(this.state.users);
  }
  //Función para editar
  onEditar = (key) => {
    Swal.fire({
      title: "Edit users",
      html: `<label className="label">Name</label>
        <input class="swal2-input"
          name="firstName"
          type="text"
          id="firstName"
          placeholder="Bob"
          required/>
      <label className="label">Lastname</label>
        <input class="swal2-input"
          name="lastName"
          type="text"
          placeholder="Smith"
          className="input"
          required
        />
      <label className="label">Phone number</label>
        <input class="swal2-input"
          name="phoneNumber"
          type="text"
          placeholder="6141234567"
          className="input"
          required
        />
      <label className="label">Email</label>
        <input class="swal2-input"
          name="email"
          type="email"
          placeholder="e.g. bobsmith@gmail.com"
          className="input"
          required
        />
      <label className="label">Password</label>
        <input class="swal2-input"
          id="passwordInput"
          name="password"
          type="password"
          placeholder="*******"
          required
        />
      <label className="label">FaceId</label>
        <input class="swal2-input"
          name="faceId"
          type="text"
          placeholder="TuCara"
          required
        />`,
      confirmButtonText: "Sign in",
      buttonsStyling: true,
      cancelButtonClass: "button is-danger",
      confirmButtonClass: "button is-success",
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const login = Swal.getPopup().querySelector("#firstName").value;
        const password = Swal.getPopup().querySelector("#passwordInput").value;
        if (!login || !password) {
          Swal.showValidationMessage(`Please enter login and password`);
        }
        return { login: login, password: password };
      },
    }).then((result) => {
      Swal.fire(
        `Login: ${result.value.login}
        Password: ${result.value.password}`.trim()
      );
    });
    /*console.log(this.state.users);
    const password = document.getElementById("password");
    const passwordInput = document.getElementById("passwordInput");
    passwordInput.removeAttribute("required");
    password.classList.toggle("is-hidden");
    this.onBurger();
    // eslint-disable-next-line
    this.state.edit = true;
    this.setState({
      idEdit: key.IdUser,
      newUsers: {
        ...this.state.newUsers,
        idUser: key.IdUser,
        idResDev: key.IdResDev,
        firstName: key.FirstName,
        lastName: key.LastName,
        phoneNumber: key.PhoneNumber,
        email: key.Email,
        faceId: key.FaceID,
        active: key.Active,
        idHouse: key.Address,
      },
    });*/
  };
  //Función para ocultar y mostrar el formulario
  onBurger = () => {
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".user-form"),
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
  //Capturando datos del formulario
  onChange = async (e) => {
    await this.setState({
      newUsers: {
        ...this.state.newUsers,
        [e.target.name]: e.target.value,
      },
    });
  };
    //DELETE para incomes
    onDelete = async (key) => {
      await axios.delete("https://gestion-fraccionamiento.herokuapp.com/users/delete/"+key.IdUser,key.IdUser)
      .then((res) => {
        console.log(res);
        this.getUsers();
      })
      .catch((exception) => {
        console.log(exception.response);
      });
    };
  //POST y PUT para crear usuarios
  onSubmit = async (e) => {
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
      axios
        .put(
          "https://gestion-fraccionamiento.herokuapp.com/users/put/" +
            this.state.idEdit,
          this.state.newUsers
        )
        .then((res) => {
          console.log(res);
          this.getUsers();
        })
        .catch((exception) => {
          console.log(exception.response);
        });
    } else {
      console.log(this.state.newUsers);
      axios
        .post(
          "https://gestion-fraccionamiento.herokuapp.com/users/post",
          this.state.newUsers
        )
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
        <Navbar />
        <section className="main-content columns is-multiline is-variable">
          <Sidebar />
          <div className="column box" style={{ marginRight: "14px" }}>
            <div className="columns is-multiline" style={{ marginTop: "5px" }}>
              <div className="column is-12">
                <div className="box has-background-white-ter">
                  <Title title="Users" class="is-2" />
                </div>
              </div>
              <div className="column is-12">
                <div className="box has-background-white-ter">
                  <div className="columns mb-0">
                    <div className="column is-11">
                      <Title title="New user" class="is-4" />
                    </div>
                    <div className="column is-1">
                      <button
                        onClick={()=>this.onEditar()}
                        className="button icon user-form is-success"
                        data-target="usersForm"
                      >
                        <FontAwesomeIcon id="icono" icon={faPlus} />
                      </button>
                    </div>
                  </div>
                  {/*form para New user oculto*/}
                </div>
              </div>
              <UserTable state={this.state} onEditar={this.onEditar} onDelete={this.onDelete}/>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
