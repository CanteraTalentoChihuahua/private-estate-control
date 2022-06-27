import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
export default class UserForm extends Component {
  state = {
    users: []
  }
  async getUsers() {
    const res = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/registry/get/user/"+this.props.idHouse);
    this.setState({ users: res.data });
  }
  async componentDidMount() {
    this.getUsers();
    //console.log(this.state.users);
  }
  render() {
    return (
          <table className="table is-fullwidth has-background-white-ter is-hoverable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Lastname</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Edit</th>
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
                      className="button">
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    );
  }
}
