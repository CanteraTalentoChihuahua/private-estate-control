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
  onAddModal = () => {
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
        openModal($target);
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  };
  onDeleteAlert = async (users) => {
    Swal.fire({
      title: "Are you sure you want to delete " + users + "?",
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
                <Link
                  onClick={() => this.onDeleteAlert(user.FirstName)}
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
                data-target="modal-js-example"
                onClick={this.onAddModal}
                className="js-modal-trigger button is-light is-fullwidth has-text-info"
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
