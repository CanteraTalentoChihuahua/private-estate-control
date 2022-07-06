import { Link } from "react-router-dom";
import React, { Component } from "react";
//import axios from "axios"
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyCheckAlt,
  faHome,
  faLockOpen,
  faChartBar,
} from "@fortawesome/free-solid-svg-icons";
export default class Sidebar extends Component {
  render() {
    return (
      <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
        <ul className="menu-list has-background-white">
          <li>
            <Link to="/dashboard" style={{ color: "#144339" }}>
              <span className="icon">
                <FontAwesomeIcon icon={faChartBar} />
              </span>{" "}
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/incomes" style={{ color: "#144339" }}>
              <span className="icon">
                <FontAwesomeIcon icon={faMoneyCheckAlt} />
              </span>{" "}
              Incomes
            </Link>
          </li>
          <li>
            <Link to="/outcomes" style={{ color: "#144339" }}>
              <span className="icon">
                <FontAwesomeIcon icon={faMoneyCheckAlt} />
              </span>{" "}
              Outcomes
            </Link>
          </li>
          {/*<li>
                        <a href="#">
                            <span className="icon"><FontAwesomeIcon icon={faSwimmer}/></span> Green Areas
                        </a>

                        <ul>
                            <li>
                                <a href="#">
                                    <span className="icon is-small"><FontAwesomeIcon icon={faPlus}/></span> Register
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span className="icon is-small"><FontAwesomeIcon icon={faEdit}/></span> Edit
                                </a>
                            </li>
                        </ul>
                    </li>*/}
          <li>
            <Link to="/houses" style={{ color: "#144339" }}>
              <span className="icon">
                <FontAwesomeIcon icon={faHome} />
              </span>{" "}
              Houses
            </Link>
          </li>
          {/*<li>
                        <a href="#" className="">
                            <span className="icon"><FontAwesomeIcon icon={faPaperPlane}/></span> Requests
                        </a>
                    </li>*/}
          <li>
            <Link to="/access" style={{ color: "#144339" }}>
              <span className="icon">
                <FontAwesomeIcon icon={faLockOpen} />
              </span>{" "}
              Access
            </Link>
          </li>
          {/*<li>
                        <a href="#" className="">
                            <span className="icon"><FontAwesomeIcon icon={faUserTag}/></span> Roles
                        </a>
                    </li>
                    <li>
                        <a href="#" className="">
                            <span className="icon"><FontAwesomeIcon icon={faCar}/></span> Vehicles
                        </a>
                    </li>
                    <li>
                        <a href="#" className="">
                            <span className="icon"><FontAwesomeIcon icon={faChild}/></span> Visitors
                        </a>
                    </li>*/}
        </ul>
      </aside>
    );
  }
}
