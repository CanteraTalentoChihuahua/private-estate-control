import React, {Component} from "react";
import Sidebar from "../components/molecules/Sidebar";
import Title from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
export default class Houses extends Component {
    render() {
        const salute = JSON.parse(localStorage.getItem('tkn'));
        if(salute==null){
            this.props.history.push("/login");
        }
        return(
            <div>
                <Navbar/>
                <section className="main-content columns is-fullheight">
                    <Sidebar/>
                    <div className="container column is-10 m-0">
                        <br/>
                        <Title title="Houses"/>
                    </div>
                </section>
            </div>
        )
    }
}