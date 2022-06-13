import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt,faMoneyCheckAlt,faUsers, faHome,faLockOpen,faChartBar } from "@fortawesome/free-solid-svg-icons";


export default class Navbar extends Component {

  onBurger = () => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

    });
  
  };
  render() {
    return (
      <nav className="navbar has-shadow" role="navigation" aria-label="main navigation">
        
          <div className="navbar-brand">
            <h1 className="title is-3 navbar-item">MIND</h1>
            <span href="#"onClick={this.onBurger} role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-end">
{/* Comienzo de opciones invisibles */}
            <a href="/dashboard" className="navbar-item is-tab is-hidden-tablet">
            <span className="icon"><FontAwesomeIcon icon={faChartBar}/></span>{" "}
              Dashboard
            </a>
            <a href="/transactions" className="navbar-item is-tab is-hidden-tablet">
            <span className="icon"><FontAwesomeIcon icon={faMoneyCheckAlt}/></span>{" "}
              Outcomes
            </a>
            <a href="/users" className="navbar-item is-tab is-hidden-tablet">
            <span className="icon"><FontAwesomeIcon icon={faUsers}/></span>{" "}
              Users
            </a>
            <a href="/houses" className="navbar-item is-tab is-hidden-tablet">
            <span className="icon"><FontAwesomeIcon icon={faHome}/></span>{" "}
              Houses
            </a>
            <a href="/access" className="navbar-item is-tab is-hidden-tablet">
            <span className="icon"><FontAwesomeIcon icon={faLockOpen}/></span>{" "}
              Access
            </a>
{/* Comienzo de opciones visibles */}
            <a href="/profile" className="navbar-item">
              <span className="icon">
                <FontAwesomeIcon icon={faUserCircle} />
              </span>{" "}
              <div className="is-tab is-hidden-tablet">Profile</div>
            </a>
            <a href="/login" className="navbar-item">
              <span className="icon">
                <FontAwesomeIcon icon={faSignOutAlt} />
              </span>{" "}
              <div className="is-tab is-hidden-tablet">Log out</div>
            </a>

            </div>
          </div>
      </nav>
    );
  }
}
