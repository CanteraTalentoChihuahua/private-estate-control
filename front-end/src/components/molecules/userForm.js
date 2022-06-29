import { Component } from "react";
import Swal from "sweetalert2";
export default class UserForm extends Component {
  function(){
    Swal.fire({
    title: "Login Form",
    html: `<label className="label">Name</label>
    <div className="control has-icons-left">
      <input
        name="firstName"
        type="text"
        id="firstName"
        placeholder="Bob"
        className="input"
        required
        value={this.props.state.newUsers.firstName}
        onChange={this.props.onChange}
      />
      <span className="icon is-small is-left">
        <i className="fa fa-user"></i>
      </span>
    </div>

    <label className="label">Lastname</label>
    <div className="control has-icons-left">
      <input
        name="lastName"
        type="text"
        placeholder="Smith"
        className="input"
        required
        value={this.props.state.newUsers.lastName}
        onChange={this.props.onChange}
      />
      <span className="icon is-small is-left">
        <i className="fa fa-user"></i>
      </span>
    </div>
    <label className="label">Phone number</label>
    <div className="control has-icons-left">
      <input
        name="phoneNumber"
        type="text"
        placeholder="6141234567"
        className="input"
        required
        value={this.props.state.newUsers.phoneNumber}
        onChange={this.props.onChange}
      />
      <span className="icon is-small is-left">
        <i className="fa fa-mobile"></i>
      </span>
    </div>
    <label className="label">Email</label>
    <div className="control has-icons-left">
      <input
        name="email"
        type="email"
        placeholder="e.g. bobsmith@gmail.com"
        className="input"
        required
        value={this.props.state.newUsers.email}
        onChange={this.props.onChange}
      />
      <span className="icon is-small is-left">
        <i className="fa fa-envelope"></i>
      </span>
    </div>
    <div className="field">
      <label className="label">Password</label>
      <div className="control has-icons-left">
        <input
          id="passwordInput"
          name="password"
          type="password"
          id="password"
          placeholder="*******"
          className="input"
          required
          value={this.props.state.newUsers.password}
          onChange={this.props.onChange}
        />
        <span className="icon is-small is-left">
          <i className="fa fa-lock"></i>
        </span>
      </div>
    </div>
    <label className="label">FaceId</label>
    <div className="control has-icons-left">
      <input
        name="faceId"
        type="text"
        placeholder="TuCara"
        className="input"
        required
        value={this.props.state.newUsers.faceId}
        onChange={this.props.onChange}
      />
      <span className="icon is-small is-left">
        <i className="fa fa-smile-plus"></i>
      </span>
    </div>`,
    confirmButtonText: "Sign in",
    focusConfirm: false,
    preConfirm: () => {
      const login = Swal.getPopup().querySelector("#firstName").value;
      const password = Swal.getPopup().querySelector("#password").value;
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
  });}
  render() {
    return
  }
}
