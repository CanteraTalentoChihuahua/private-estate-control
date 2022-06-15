//import { Link } from "react-router-dom"
import React, {Component} from "react"
//import axios from "axios"
import './Sidebar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoneyCheckAlt,faUsers, faHome,faLockOpen,faChartBar} from '@fortawesome/free-solid-svg-icons';

export default class Sidebar extends Component {
    
    render() {
        return(
            <aside className="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
                <ul className="menu-list">
                    <li>
                        <a href="/dashboard" className="">
                            <span className="icon"><FontAwesomeIcon icon={faChartBar}/></span> Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/transactions" className="">
                            <span className="icon"><FontAwesomeIcon icon={faMoneyCheckAlt}/></span> Transactions
                        </a>
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
                        <a href="/users" className="">
                            <span className="icon"><FontAwesomeIcon icon={faUsers}/></span> Users
                        </a>
                    </li>
                    <li>
                        <a href="/houses" className="">
                            <span className="icon"><FontAwesomeIcon icon={faHome}/></span> Houses
                        </a>
                    </li>
                    {/*<li>
                        <a href="#" className="">
                            <span className="icon"><FontAwesomeIcon icon={faPaperPlane}/></span> Requests
                        </a>
                    </li>*/}
                    <li>
                        <a href="access" className="">
                            <span className="icon"><FontAwesomeIcon icon={faLockOpen}/></span> Access
                        </a>
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
        )
    }
}