import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOutAlt,faMoneyCheckAlt,faUsers, faHome,faLockOpen,faChartBar } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"
import Title from "../atoms/Title";
export default class Navbar extends Component {
  logOut=()=>{
    localStorage.clear();
  }
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
      <nav className="navbar is-dark has-shadow" role="navigation" aria-label="main navigation">
        
          <div className="navbar-brand">
            <div className="navbar-item"><Title title="MIND" color="has-text-white"/></div>
            <span href="#"onClick={this.onBurger} role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-end">
{/* Comienzo de opciones invisibles */}
            <Link to="/dashboard" className="navbar-item is-tab is-hidden-tablet">
            <span className="icon"><FontAwesomeIcon icon={faChartBar}/></span>{" "}
              Dashboard
            </Link>
            <Link to="/transactions" className="navbar-item is-tab is-hidden-tablet">
            <span className="icon"><FontAwesomeIcon icon={faMoneyCheckAlt}/></span>{" "}
              Transactions
            </Link>
            <Link to="/users" className="navbar-item is-tab is-hidden-tablet">
            <span className="icon"><FontAwesomeIcon icon={faUsers}/></span>{" "}
              Users
            </Link>
            <Link to="/houses" className="navbar-item is-tab is-hidden-tablet">
            <span className="icon"><FontAwesomeIcon icon={faHome}/></span>{" "}
              Houses
            </Link>
            <Link to="/access" className="navbar-item is-tab is-hidden-tablet">
            <span className="icon"><FontAwesomeIcon icon={faLockOpen}/></span>{" "}
              Access
            </Link>
{/* Comienzo de opciones visibles */}
            <Link to="/profile" className="navbar-item is-tab">
              <span className="icon">
                <FontAwesomeIcon icon={faUserCircle} />
              </span>{" "}
              <span className="is-hidden-widescreen">Profile</span>
            </Link>
            <Link onClick={this.logOut} to="/login" className="navbar-item is-tab">
              <span className="icon">
                <FontAwesomeIcon icon={faSignOutAlt}/>
              </span><span className="is-hidden-widescreen">Log out</span>
            </Link>

            </div>
          </div>
      </nav>
    );
  }
}
