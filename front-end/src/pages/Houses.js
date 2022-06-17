import axios from "axios"
import React, {Component} from "react";
import Sidebar from "../components/molecules/Sidebar";
import Title from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
export default class Houses extends Component {
    state={
        houses:[{Address: "Provincia del Lago #921", Balance: "$300.00"},{Address: "Av. Colegio Militar #470", Balance: "$520.00"}]
    }
    async getHouses(){
        const res = await axios.get('https://gestion-fraccionamiento.herokuapp.com/houses/get');
        this.setState({houses:res.data});
        console.log(res.data);
    }
    async componentDidMount(){
        this.getHouses();
        console.log(this.state.houses);
    }
    render() {
        const tkn = JSON.parse(localStorage.getItem('tkn'));
        if(tkn==null){
            this.props.history.push("/login");
        }
        return(
            <div>
                <Navbar/>
                <section className="main-content columns is-fullheight">
                    <Sidebar/>
                    <div className="container column is-10 m-0">
                        <br/>
                        <section className="is-fullheight">
                        <div className="column is-5-tablet is-4-desktop is-5-widescreen">
                            <Title title="Houses"/>
                            <table className="table is-striped is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>Address</th>
                                        <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.houses.map(house => <tr key={house.IdHouse}>
                                    <td>{house.Address}</td><td>{house.Balance}</td>
                                    </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                        </section>
                    </div>
                </section>
            </div>
        )
    }
}