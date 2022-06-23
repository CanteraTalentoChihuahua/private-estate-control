import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faEdit,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
export default class UserForm extends Component {
  render() {
    return (
        <div className="column is-12">
        <div className="box has-background-white-ter">
          <table className="table is-fullwidth has-background-white-ter is-hoverable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Lastname</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Wallet</th>
                <th>Active</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.props.state.users.map((user) => (
                <tr key={user.IdUser}>
                  <td>{user.FirstName}</td>
                  <td>{user.LastName}</td>
                  <td>{user.PhoneNumber}</td>
                  <td>{user.Email}</td>
                  <td>{user.Address}</td>
                  <td>{user.Balance}</td>
                  <td>
                    {user.Active ? (
                      <FontAwesomeIcon icon={faCheck} />
                    ) : (
                      <FontAwesomeIcon icon={faTimes} />
                    )}
                  </td>
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
                    <Link
                      to={"/users/" + user.IdUser}
                      onClick={() => this.props.onDelete(user)}
                      className="button">
                      <FontAwesomeIcon icon={faTimes} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
