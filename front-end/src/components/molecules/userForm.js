import React, { Component } from "react";
export default class UserForm extends Component {
  render() {
    return (
      <div id="usersForm" className="is-hidden">
        <form onSubmit={this.props.onSubmit}>
          <div className="field">
            <label className="label">Id</label>
            <div className="control has-icons-left">
              <input
                name="idResDev"
                type="text"
                placeholder="1"
                className="input"
                required
                value={this.props.state.newUsers.idResDev}
                onChange={this.props.onChange}
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
                value={this.props.state.newUsers.firstName}
                onChange={this.props.onChange}
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
                value={this.props.state.newUsers.lastName}
                onChange={this.props.onChange}
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
                value={this.props.state.newUsers.phoneNumber}
                onChange={this.props.onChange}
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
                value={this.props.state.newUsers.email}
                onChange={this.props.onChange}
              />
              <span className="icon is-small is-left">
                <i className="fa fa-envelope"></i>
              </span>
            </div>
          </div>
          <div className="field" id="password">
            <label className="label">Password</label>
            <div className="control has-icons-left">
              <input
                id="passwordInput"
                name="password"
                type="password"
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
          <div className="field">
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
            </div>
          </div>
          <div className="field">
            <div className="select">
              <select
                name="idHouse"
                onChange={this.props.onChange}>
                <option>Address</option>
                  {this.props.state.houses.map((house)=>(
                  <option key={house.IdHouse} className="dropdown-item">{house.Address}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className="field">
            <button type="submit" className="button is-success">
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
