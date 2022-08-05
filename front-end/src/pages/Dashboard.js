import React, { Component} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/molecules/Sidebar";
import Titlee from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      { Description: "Pago del agua", Amount: 20563 },
      { Description: "Pago de la luz", Amount: 16754 },
      { Description: "Pago del agua", Amount: 20563 },
    ],
    //Show 12 entries
    entries: [
      { id: 0, time: "12:05" },
      { id: 1, time: "12:15" },
      { id: 2, time: "12:25" },
      { id: 3, time: "12:35" },
      { id: 4, time: "12:45" },
      { id: 5, time: "12:55" },
      { id: 6, time: "1:20" },
      { id: 7, time: "2:27" },
      { id: 8, time: "3:15" },
      { id: 9, time: "4:59" },
      { id: 8, time: "5:15" },
      { id: 9, time: "5:38" },
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
    //Show 9 houses
    houses: [],
  };
  //Obtener todas las casas
  async getHouses() {
    const res = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/houses/get"
    );
    this.setState({ houses: res.data });
  }
  async componentDidMount() {
    this.getHouses();
  }
  //chequeo del Token
  render() {
    const tkn = JSON.parse(localStorage.getItem("tkn"));
    const idResDev = JSON.parse(localStorage.getItem("idResDev"));
    console.log(idResDev);
    if (tkn == null) {
      this.props.history.push("/login");
    }
    return (
      <div>
        <Navbar />
        <section className="main-content columns is-multiline is-variable">
          <Sidebar />
          <div
            className="column box has-background-white-ter"
            style={{ marginRight: "14px" }}
          >
            <div className="columns is-multiline" style={{ marginTop: "5px" }}>
              <div className="column is-12">
                <div className="box titulo">
                  <Titlee title="Dashboard" class="is-2 has-text-white is-family-sans-serif" />
                </div>
              </div>
              <div className="column is-9">
                <div className="box ">
                  <Line data={this.state.data} options={options} />
                </div>
              </div>
              <div className="column is-3">
                <div className="box has-background-white">
                  <Titlee title="Transactions" class="is-3 is-family-sans-serif" />
                  <table className="table is-fullwidth has-background-white">
                    <tbody>
                      {this.state.transactions.map((transaction) => (
                        <tr key={transaction.Id}>
                          <td className="p-0">
                            <span className="icon has-text-danger">
                              <FontAwesomeIcon icon={faCircle} />
                            </span>{" "}
                            {transaction.Description}
                          </td>
                          <td className="p-0">${transaction.Amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="column is-4">
                <Link to="/incomes" style={{boxShadow:"0 .5em 1em -.125em rgba(10,10,10,.1),0 0 0 0px #485fc7"}}
                  className="box has-text-centered has-background-success-light"
                >
                  <Titlee title="INCOMES" class="is-3  has-text-success" />
                  <br />
                  <h2 class="subtitle is-2  has-text-success">$20,000</h2>
                </Link>
              </div>
              <div className="column is-4">
                <Link to="/outcomes" style={{boxShadow:"0 .5em 1em -.125em rgba(10,10,10,.1),0 0 0 0px #485fc7"}}
                  className="box has-text-centered has-background-danger-light"
                >
                  <Titlee title="OUTCOMES" class="is-3 has-text-danger" />
                  <br />
                  <h2 class="subtitle is-2 has-text-danger">$20,000</h2>
                </Link>
              </div>
              <div className="column is-4">
                <Link to="/outcomes" style={{boxShadow:"0 .5em 1em -.125em rgba(10,10,10,.1),0 0 0 0px #485fc7"}}
                  className="box has-text-centered has-background-link-light"
                >
                  <Titlee title="BALANCE" class="is-3 has-text-link" />
                  <br />
                  <h2 class="subtitle is-2 has-text-link">$20,000</h2>
                </Link>
              </div>
              <div className="column is-9">
                <div className="box">
                  <Titlee title="Defaulter" class="is-4"/>
                  <table className="table is-fullwidth">
                    <thead>
                      <tr>
                        <th>Address</th>
                        <th>Debt</th>
                      </tr>
                    </thead>
                    {// eslint-disable-next-line
                    this.state.houses.map((house) => { if(house.Balance<0){
                      return (
                        <tbody>
                          <tr role="button" key={house.IdHouse}>
                            <td
                              onClick={() => this.showUsers(house.IdHouse)}
                              style={{
                                verticalAlign: "middle",
                              }}
                            >
                              {house.Address}
                            </td>
                            <td>{house.Balance}</td>
                          </tr>
                        </tbody>
                      );}
                    })}
                  </table>
                </div>
              </div>
              <div className="column is-3">
                <div className="box">
                  <Titlee title="Entries" class="is-3" />
                  <table className="table is-fullwidth">
                    <tbody>
                      {this.state.entries.map((entry) => (
                        <tr key={entry.Id}>
                          <td className="p-0">
                            <span className="icon has-text-danger">
                              <FontAwesomeIcon icon={faCircle} />
                            </span>{" "}
                            {entry.time}
                          </td>
                          <td className="p-0"> Door opened</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
