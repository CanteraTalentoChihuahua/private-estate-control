import React, {Component, useEffect} from "react";
import Sidebar from "../components/molecules/Sidebar";
import Title from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
export default class Dashboard extends Component {
    render() {
            const salute = JSON.parse(localStorage.getItem('tkn'));
            //console.log(salute);
            if(salute==null){
                this.props.history.push("/login");
            }
        return(
            <div>
                <Navbar/>
                <section className="main-content columns is-fullheight-with-navbar">
                    <Sidebar/>
                    <div className="container column is-10 m-0">
                        <br/>
                        <Title title="Dashboard"/>
                    </div>
                </section>
            </div>
        )
    }
}