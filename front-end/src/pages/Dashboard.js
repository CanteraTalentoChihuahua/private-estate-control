import React, { Component } from "react";
import Sidebar from "../components/molecules/Sidebar";
import Titlee from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
import "./estilo.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const scores = [60, 55, 52, 51, 45, 39, 50, 47, 50];
const labels = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
];
const options = {
  responsive: true,
  fill: true,
};

export default class Dashboard extends Component {
  state = {
    transactions: [
      { Description: "Pago del agua", Amount: 20563 },
      { Description: "Pago de la luz", Amount: 16754 },
      { Description: "Pago del agua", Amount: 20563 },
      { Description: "Pago de la luz", Amount: 16754 },
      { Description: "Pago del agua", Amount: 20563 },
      { Description: "Pago de la luz", Amount: 16754 },
      { Description: "Pago del agua", Amount: 20563 },
      { Description: "Pago de la luz", Amount: 16754 },
    ],
    //Data from the chart
    data: {
      datasets: [
        {
          label: "Users who paid at time",
          data: scores,
          tension: 0.3,
          borderColor: "#20c997",
          pointRadius: 6,
          pointBackgroundColor: "#00D1B2",
          backgroundColor: "rgb(209, 231, 224, 0.7)",
        },
      ],
      labels,
    },
  };

  //chequeo del Token
  render() {
    const tkn = JSON.parse(localStorage.getItem("tkn"));
    const idResDev = JSON.parse(localStorage.getItem("idResDev"));
    console.log(idResDev)
    if (tkn == null) {
      this.props.history.push("/login");
    }
    return (
      <div>
        <Navbar />
        <section className="main-content columns is-multiline is-variable">
          <Sidebar />
          <div className="column box has-background-white-ter" style={{ marginRight: "14px" }}>
            <div className="columns is-multiline" style={{ marginTop: "5px" }}>
              <div className="column is-12">
                <div className="box titulo">
                  <Titlee title="Dashboard" class="is-2 has-text-white" />
                </div>
              </div>
              <div className="column is-9">
                <div className="box ">
                  <Line data={this.state.data} options={options} />
                </div>
              </div>
              <div className="column is-3">
                <div className="box has-background-white">
                  <Titlee title="Transactions" class="is-3" />
                  {this.state.transactions.map((transaction) => (
                    <ul key={transaction.Id}>
                      <span className="icon has-text-danger">
                        <FontAwesomeIcon icon={faCircle} />
                      </span>{" "}
                      {transaction.Description} ${transaction.Amount}
                    </ul>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
