import React, {Component} from "react";
import Sidebar from "../components/molecules/Sidebar";
import Title from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
export default class Transactions extends Component {
    render() {
        return(
            <div>
                <Navbar/>
                <section class="main-content columns is-fullheight">
                    <Sidebar/>
                    <div className="container column is-10 m-0">
                        <br/>
                        <Title title="Transactions"/>
                    </div>
                </section>
            </div>
        )
    }
}