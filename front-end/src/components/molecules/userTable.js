import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
export default class UserForm extends Component {
  state = {
    users: [],
  };
  //Obtener usuarios por casa
  async getUsersPerHouse() {
    const res = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/registry/get/user/" +
        this.props.idHouse
    );
    this.setState({ users: res.data });
  }
  //Monar componentes
  async componentDidMount() {
    await this.getUsersPerHouse()
  }
  //Alerta de eliminacion
  onDeleteAlert = async (user) => {
    Swal.fire({
      title: "Are you sure you want to delete " + user.FirstName + "?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete("https://gestion-fraccionamiento.herokuapp.com/users/delete/"+user.IdUser)
        .then((res) => {
          console.log(res);
          this.getUsers();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "The user has been deleted.",
            showConfirmButton: false,
            timer: 2000,
          });
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
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          icon: "error",
          title: "Delete cancelled",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  render() {
    return (
      <table className="table is-bordered is-fullwidth has-background-white">
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
                  to="/houses"
                  data-target="modal-update"
                  onClick={()=>this.props.onUpdateModal(user)}
                  className="js-modal-update button"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </td>
              <td>
                <Link
                  onClick={() => this.onDeleteAlert(user)}
                  className="button"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </Link>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={6} style={{ textAlign: "center" }} className="p-0">
              <Link
                to="/houses"
                data-target="modal-add"
                onClick={()=>this.props.onAddModal(this.props.idHouse)}
                className="js-modal-add button is-light is-fullwidth has-text-info"
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
