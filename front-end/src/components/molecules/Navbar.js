import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserCircle,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar has-shadow">
        <div className="container">
          <div className="navbar-left">
            <h1 className="title is-3 navbar-item">MIND</h1>
          </div>
          <label className="navbar-burger">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <input type="checkbox" id="navbar-menu" className="is-hidden" />
          <div className="navbar-end navbar-menu">
            <a className="navbar-item is-tab is-hidden-tablet">
              <span className="icon">
                <i className="fa fa-home"></i>
              </span>{" "}
              Home
            </a>
            <a className="navbar-item is-tab is-hidden-tablet">
              <span className="icon">
                <i className="fa fa-table"></i>
              </span>{" "}
              Links
            </a>
            <a className="navbar-item is-tab is-hidden-tablet">
              <span className="icon">
                <i className="fa fa-info"></i>
              </span>{" "}
              About
            </a>

            <a className="navbar-item is-tab">
              <span className="icon">
                <FontAwesomeIcon icon={faUserCircle} />
              </span>
            </a>
            <a className="navbar-item is-tab">
              <span className="icon">
                <FontAwesomeIcon icon={faSignOutAlt} />
              </span>
            </a>
          </div>
        </div>
      </nav>
    );
  }
}
