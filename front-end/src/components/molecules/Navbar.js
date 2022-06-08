import React,{Component} from "react"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoneyCheckAlt, faSwimmer, faUsers, faHome, faCar, faChild, faPlus, faEdit, faLockOpen, faUserTag, faUserCircle, faPaperPlane, faSignOutAlt, faChartBar} from '@fortawesome/free-solid-svg-icons';

export default class Users extends Component {
    render() {
        return(
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
        )
    }
}