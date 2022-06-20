//import { Link } from "react-router-dom"
import axios from "axios";
import React, { Component } from "react";
import Title from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
import Sidebar from "../components/molecules/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
const tkn = JSON.parse(localStorage.getItem("tkn"));
axios.defaults.headers.common = {'Authorization': 'bearer '+ tkn}
export default class Users extends Component {
  state = {
    users: [],
    newUsers:{
        "idResDev":"",
        "firstName":"",
        "lastName":"",
        "phoneNumber":"",
        "email":"",
        "password":"",
        "faceId":""
      }
  };
  //Función para editar
  onEditar=(key)=>{
    console.log(key);
  }
  //GET para obtener usuarios
  async getUsers() {
    const res = await axios.get("https://gestion-fraccionamiento.herokuapp.com/users/get");
    this.setState({ users: res.data });
    //console.log(res.data);
  }
  async componentDidMount() {
    this.getUsers();
    //console.log(this.state.users);
  }
  //Función para ocultar y mostrar el formulario
  onBurger = () => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.user-form'), 0);
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        if($target.classList.value==='is-danger'){
            el.classList.toggle('is-success');
        }else{
            el.classList.toggle('is-danger');
        }
        $target.classList.toggle('is-hidden');
    });
  };
  //Capturando datos del formulario
  onChange = async e => {
    await this.setState({
      newUsers:{
        ...this.state.newUsers,
        [e.target.name]: e.target.value
      }
    })
  }
  //POST para crear usuarios
  onSubmit = async e => {
    e.preventDefault();
    console.log("State:", this.state.newUsers);
    axios.post('https://gestion-fraccionamiento.herokuapp.com/users/post',this.state.newUsers)
    .then(res=>{
      console.log(res);
      this.getUsers();
    })
    .catch((exception) => {
      alert(exception.response.data.msg);
    });
  }
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
                  <Title title="Users" />
                </div>
              </div>
              <div className="column is-12">
                <div className="box has-background-white-ter">
                  <div className="columns mb-0">
                    <div className="column is-11">
                      <Title title="New user" color="is-4" />
                    </div>
                    <div className="column is-1">
                      <button onClick={this.onBurger} className="button icon user-form is-success" data-target="usersForm">
                          <FontAwesomeIcon id="icono" icon={faPlus}/>
                      </button>
                    </div>
                  </div>
                  {/*form para New user oculto*/}
                  <div id="usersForm" className="is-hidden">
                    <form onSubmit={this.onSubmit}>
                      <div className="field">
                        <label className="label">Id</label>
                        <div className="control has-icons-left">
                          <input
                            name="idResDev"
                            type="text"
                            placeholder="1"
                            className="input"
                            required
                            value={this.state.IdResDev}
                            onChange={this.onChange}
                          />
                          <span className="icon is-small is-left">
                            <i className="fa fa-id-badge"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Name</label>
                        <div className="control has-icons-left">
                          <input
                            name="firstName"
                            type="text"
                            placeholder="Bob"
                            className="input"
                            required
                            value={this.state.FirstName}
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
                            value={this.state.LastName}
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
                            value={this.state.PhoneNumber}
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
                            value={this.state.Email}
                            onChange={this.onChange}
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
                            name="password"
                            type="password"
                            placeholder="*******"
                            className="input"
                            required
                            value={this.state.Password}
                            onChange={this.onChange}
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
                            value={this.state.FaceId}
                            onChange={this.onChange}
                          />
                          <span className="icon is-small is-left">
                            <i className="fa fa-smile-plus"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <button type="submit" className="button is-success">
                          New user
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
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Active</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.users.map((user) => (<tr key={user.IdUser}>
                          <td>{user.FirstName}</td>
                          <td>{user.LastName}</td>
                          <td>{user.PhoneNumber}</td>
                          <td>{user.Email}</td>
                          <td>
                            {user.Active ? (<FontAwesomeIcon icon={faCheck} />) : (<FontAwesomeIcon icon={faTimes} />)}
                          </td>
                          <td><button onClick={()=>this.onEditar(user)} className="button"><FontAwesomeIcon icon={faEdit}/></button></td>
                        </tr>
                      ))}
                    </tbody>
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