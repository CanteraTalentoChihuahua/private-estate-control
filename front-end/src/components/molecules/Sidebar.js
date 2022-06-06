//import { Link } from "react-router-dom"
import React, {Component} from "react"
//import axios from "axios"
import './Sidebar.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoneyCheckAlt, faSwimmer, faUsers, faHome} from '@fortawesome/free-solid-svg-icons';

export default class Users extends Component {
    
    render() {
        return(
            <div id="app">

        <nav class="navbar has-shadow">
            <div class="container">
                <div class="navbar-left">
                <a class="navbar-item">
                    <h1 class="title is-3">Website</h1>
                </a>
            </div>
            <label for="menu-toggle" class="navbar-toggle">
                <span></span>
                <span></span>
                <span></span>
            </label>
            <input type="checkbox" id="menu-toggle" class="is-hidden"/>
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
                
                <a class="navbar-item is-tab is-active">
                    <span class="icon"><i class="fa fa-user"></i></span>
                </a>
                <a class="navbar-item is-tab">
                    <span class="icon"><i class="fa fa-sign-out"></i></span>
                </a>
            </div>
            </div>
        </nav>

        <section class="main-content columns is-fullheight">
        
            <aside class="column is-3 is-narrow-mobile is-fullheight section is-hidden-mobile">
                <p class="menu-label is-hidden-touch">Dashboard</p>
                <ul class="menu-list">
                    <li>
                        <a href="#" class="">
                            <span class="icon"><FontAwesomeIcon icon={faMoneyCheckAlt}/></span> Transactions
                        </a>
                    </li>
                    <li>
                        <a href="#" class="is-active">
                            <span class="icon"><FontAwesomeIcon icon={faSwimmer}/></span> Green Areas
                        </a>

                        <ul>
                            <li>
                                <a href="#">
                                    <span class="icon is-small"><i class="fa fa-link"></i></span> Register
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <span class="icon is-small"><i class="fa fa-link"></i></span> Edit
                                </a>
                            </li>
                        </ul>
                    </li>
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
                    <li>
                        <a href="#" class="">
                            <span class="icon"><i class="fa fa-info"></i></span> Requests
                        </a>
                    </li>
                    <li>
                        <a href="#" class="">
                            <span class="icon"><i class="fa fa-info"></i></span> Entries
                        </a>
                    </li>
                    <li>
                        <a href="#" class="">
                            <span class="icon"><i class="fa fa-info"></i></span> Roles
                        </a>
                    </li>
                    <li>
                        <a href="#" class="">
                            <span class="icon"><i class="fa fa-info"></i></span> Vehicles
                        </a>
                    </li>
                    <li>
                        <a href="#" class="">
                            <span class="icon"><i class="fa fa-info"></i></span> Visitors
                        </a>
                    </li>
                </ul>
            </aside>
                
        </section>
                
            </div>
        )
    }
}