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
            <div id="app">

        <nav class="navbar has-shadow">
            <div class="container">
                <div class="navbar-left container">
                    <h1 class="title is-3 navbar-item">MIND</h1>
            </div>
            <label for="navbar-menu" class="navbar-toggle">
                <span></span>
                <span></span>
                <span></span>
            </label>
            <input type="checkbox" id="navbar-menu" class="is-hidden"/>
            <div class="navbar-end navbar-menu">
                <a class="navbar-item is-tab is-hidden-tablet">
                    <span class="icon"><i class="fa fa-home"></i></span> Home
                </a>
                <a class="navbar-item is-tab is-hidden-tablet">
                    <span class="icon"><i class="fa fa-table"></i></span> Links
                </a>
                <a class="navbar-item is-tab is-hidden-tablet">
                    <span class="icon"><i class="fa fa-info"></i></span> About
                </a>
                
                <a class="navbar-item is-tab">
                    <span class="icon"><FontAwesomeIcon icon={faUserCircle}/></span>
                </a>
                <a class="navbar-item is-tab">
                    <span class="icon"><FontAwesomeIcon icon={faSignOutAlt}/></span>
                </a>
            </div>
            </div>
        </nav>

        <section class="main-content columns is-fullheight">
        
            <aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
                <ul class="menu-list">
                    <li>
                        <a href="#" class="">
                            <span class="icon"><FontAwesomeIcon icon={faChartBar}/></span> Dashboard
                        </a>
                    </li>
                    <li>
                        <a href="#" class="">
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
                        <a href="#" class="">
                            <span class="icon"><FontAwesomeIcon icon={faUsers}/></span> Users
                        </a>
                    </li>
                    <li>
                        <a href="#" class="">
                            <span class="icon"><FontAwesomeIcon icon={faHome}/></span> Houses
                        </a>
                    </li>
                    {/*<li>
                        <a href="#" class="">
                            <span class="icon"><FontAwesomeIcon icon={faPaperPlane}/></span> Requests
                        </a>
                    </li>*/}
                    <li>
                        <a href="#" class="">
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
                
        </section>
                
            </div>
        )
    }
}