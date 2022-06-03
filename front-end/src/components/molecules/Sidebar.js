//import { Link } from "react-router-dom"
import React, {Component} from "react"
//import axios from "axios"
import './Sidebar.css';

export default class Users extends Component {
    
    render() {
        return(
            <div id="app">

                <section class="main-content columns is-fullheight">
                
                <aside class="column is-3 is-narrow-mobile is-fullheight section is-hidden-mobile">
                    <p class="menu-label is-hidden-touch">Dashboard</p>
                    <ul class="menu-list">
                    <li>
                        <a href="#" class="">
                        <span class="icon"><i class="fa fa-home"></i></span> Transactions
                        </a>
                    </li>
                    <li>
                        <a href="#" class="is-active">
                        <span class="icon"><i class="fa-solid fa-bench-tree"></i></span> Green Areas
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
                        <span class="icon"><i class="fa fa-info"></i></span> Users
                        </a>
                    </li>
                    <li>
                        <a href="#" class="">
                        <span class="icon"><i class="fa fa-info"></i></span> Houses
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