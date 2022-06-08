//import { Link } from "react-router-dom"
import React, {Component} from "react"
//import axios from "axios"
import './Sidebar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoneyCheckAlt, faSwimmer, faUsers, faHome, faCar, faChild, faPlus, faEdit, faLockOpen, faUserTag, faUserCircle, faPaperPlane, faSignOutAlt, faChartBar} from '@fortawesome/free-solid-svg-icons';
import { click } from "@testing-library/user-event/dist/click";

export default class Users extends Component {
    
    render() {
        return(
            <div>
            <aside class="column is-3 is-narrow-mobile is-fullheight section is-hidden-mobile">
                <ul class="menu-list">
                    <li>
                        <a href="/dashboard" class="">
                            <span class="icon"><FontAwesomeIcon icon={faChartBar}/></span> Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="/transactions" class="">
                            <span class="icon"><FontAwesomeIcon icon={faMoneyCheckAlt}/></span> Transactions
                        </a>
                    </li>
                    {/*<li>
                        <a href="#">
                            <span class="icon"><FontAwesomeIcon icon={faSwimmer}/></span> Green Areas
                        </a>

                        <ul>
                            <li>
                                <a href="#">
                                    <span class="icon is-small"><FontAwesomeIcon icon={faPlus}/></span> Register
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="icon is-small"><FontAwesomeIcon icon={faEdit}/></span> Edit
                                </a>
                            </li>
                        </ul>
                    </li>*/}
                    <li>
                        <a href="/users" class="">
                            <span class="icon"><FontAwesomeIcon icon={faUsers}/></span> Users
                        </a>
                    </li>
                    <li>
                        <a href="/houses" class="">
                            <span class="icon"><FontAwesomeIcon icon={faHome}/></span> Houses
                        </a>
                    </li>
                    {/*<li>
                        <a href="#" class="">
                            <span class="icon"><FontAwesomeIcon icon={faPaperPlane}/></span> Requests
                        </a>
                    </li>*/}
                    <li>
                        <a href="access" class="">
                            <span class="icon"><FontAwesomeIcon icon={faLockOpen}/></span> Entries
                        </a>
                    </li>
                    {/*<li>
                        <a href="#" class="">
                            <span class="icon"><FontAwesomeIcon icon={faUserTag}/></span> Roles
                        </a>
                    </li>
                    <li>
                        <a href="#" class="">
                            <span class="icon"><FontAwesomeIcon icon={faCar}/></span> Vehicles
                        </a>
                    </li>
                    <li>
                        <a href="#" class="">
                            <span class="icon"><FontAwesomeIcon icon={faChild}/></span> Visitors
                        </a>
                    </li>*/}
                </ul>
            </aside>
            </div>
        )
    }
}