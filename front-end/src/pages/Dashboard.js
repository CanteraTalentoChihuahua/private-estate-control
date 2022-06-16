import React, {Component} from "react";
import Sidebar from "../components/molecules/Sidebar";
import Titlee from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
import {Chart as ChartJS,CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,Filler} from "chart.js"
import {Line} from "react-chartjs-2";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
ChartJS.register(CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend,Filler);


const scores = [60,55,52,51,45,39,50,47,50];
const labels = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre"];
const options = {
    responsive: true,
    fill: true
}
export default class Dashboard extends Component {
    state={
        transactions:[{Description: "Pago del agua",Amount: 20563},{Description: "Pago de la luz",Amount:16754}],
        //Data from the chart
        data: {
            datasets: [{
                label: "Users who paid at time",
                data: scores,
                tension: 0.3,
                borderColor: "#07689F",
                pointRadius: 6,
                pointBackgroundColor: "#07689F",
                backgroundColor: "rgb(7, 104, 159,0.4)"
            }],
            labels
        }
    }

            //chequeo del Token
            render() {
            const tkn = JSON.parse(localStorage.getItem('tkn'));
            //console.log(tkn);
            if(tkn==null){this.props.history.push("/login");}
        return(
            <div>
                <Navbar/>
                <section className="main-content columns is-fullheight-with-navbar">
                    <Sidebar/>
                    <div className="column is-6 m-0">
                        <br/>
                        <div className="box has-background-white-ter">
                        <Titlee title="Dashboard"/>
                        <Line data={this.state.data} options={options}/>
                        </div>
                    </div>
                    <div className="column is-3">
                        <br/>
                        <div className="box has-background-white-ter">
                        <Titlee title="Transactions"/>
                        {
                            this.state.transactions.map(transaction => <ul key={transaction.Id} >
                            <span className="icon has-text-danger"><FontAwesomeIcon icon={faCircle}/></span> {transaction.Description} ${transaction.Amount}
                            </ul>)
                        }
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}