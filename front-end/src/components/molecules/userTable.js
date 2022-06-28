import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";
export default class UserForm extends Component {
  state = {
    users: [],
  };
  async getUsers() {
    const res = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/registry/get/user/" +
        this.props.idHouse
    );
    this.setState({ users: res.data });
  }
  async componentDidMount() {
    this.getUsers();
    //console.log(this.state.users);
  }
  render() {
    return (
      <table className="table is-bordered is-fullwidth has-background-white-bis">
        <thead>
          <tr>
            <th>Name</th>
            <th>Lastname</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {this.state.users.map((user) => (
            <tr key={user.IdUser}>
              <td>{user.FirstName}</td>
              <td>{user.LastName}</td>
              <td>{user.PhoneNumber}</td>
              <td>{user.Email}</td>
              <td>
                <Link
                  to={"/users/" + user.IdUser}
                  onClick={() => this.props.onEditar(user)}
                  className="button"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </td>
              <td>
                <Link onClick={() => this.deleteAlert()} className="button">
                  <FontAwesomeIcon icon={faTimes} />
                </Link>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={6} style={{ textAlign: "center" }} className="p-0">
              <Link
                onClick={() => this.onModalAdd()}
                className="button is-light is-fullwidth has-text-info"
              >
                <FontAwesomeIcon icon={faUserPlus} /> Add resident
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
