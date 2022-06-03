//import { Link } from "react-router-dom"
import React, {Component} from "react"
//import axios from "axios"
import './Navbar.css';

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }

export default class Navbar extends Component {
    render() {
        return(
            <div>
                <nav class="navbar ">
                    <div class="navbar-brand">
                        <a class="navbar-item" href="http://bulma.io">
                            <h1 class="title is-2">MIND</h1>
                        </a>
                    </div>
                    <div class="navbar-start">
                        <a class="navbar-item" onclick="openNav()">☰ Open Sidebar</a>
                    </div>
                    <div id="navMenubd-example" class="navbar-menu">
                        <div class="navbar-end">
                            <a class="navbar-item" href="localhost:3000/login">
                                <span class="icon">
                                    <i class="fa fa-user fa-2x"></i>
                                </span>
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}