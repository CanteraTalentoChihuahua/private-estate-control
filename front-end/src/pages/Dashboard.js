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

function TransactionsIcon(IncOut) {
  console.log(IncOut)
  if (IncOut.IncOut==="1") {
    return(<span className="icon has-text-success">
    <FontAwesomeIcon icon={faCircle} />
  </span>);
  }
return(<span className="icon has-text-danger">
<FontAwesomeIcon icon={faCircle} />
</span>);
}

export default class Dashboard extends Component {
  state = {
    transactions: [],
    //Show 12 entries
    entries: [],
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
    totalIn:"",
    totalOut:""
  };
  //Obtener todas las casas
  async getHouses() {
    await axios.get("https://gestion-fraccionamiento.herokuapp.com/houses/get"
    ).then((res)=>{this.setState({ houses: res.data });})
    await axios.get("https://gestion-fraccionamiento.herokuapp.com/incomes/allincome"
    ).then((res)=>{this.setState({ totalIn: res.data });})
    await axios.get("https://gestion-fraccionamiento.herokuapp.com/outcomes/alloutcome"
    ).then((res)=>{this.setState({ totalOut: res.data });})
    await axios.get("https://gestion-fraccionamiento.herokuapp.com/transactions/"+JSON.parse(localStorage.getItem("idResDev"))
    ).then((res)=>{this.setState({ transactions: res.data }); console.log(res)})
    await axios.get("https://gestion-fraccionamiento.herokuapp.com/access/get"
    ).then((res)=>{this.setState({ entries: res.data }); })
  }
  async componentDidMount() {
    this.getHouses();
  }
  //chequeo del Token
  render() {
    const tkn = JSON.parse(localStorage.getItem("tkn"));
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
                <Link style={{boxShadow:"0 .5em 1em -.125em rgba(10,10,10,.1),0 0 0 0px #485fc7"}} to="houses" className="box ">
                  <Line data={this.state.data} options={options} />
                </Link>
              </div>
              <div className="column is-3">
                <Link style={{boxShadow:"0 .5em 1em -.125em rgba(10,10,10,.1),0 0 0 0px #485fc7"}} to="/incomes" className="box has-background-white">
                  <Titlee title="Transactions" class="is-3 is-family-sans-serif" />
                  <table className="table is-fullwidth has-background-white">
                    <tbody>
                      {this.state.transactions.map((transaction) => (
                        <tr>
                          <td className="p-0">
                            <TransactionsIcon IncOut={transaction.IncOut}/>                              
                            {" "+transaction.Date.substring(0, 10)}
                          </td>
                          <td className="p-0">${transaction.Amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Link>
              </div>
              <div className="column is-4">
                <Link to="/incomes" style={{boxShadow:"0 .5em 1em -.125em rgba(10,10,10,.1),0 0 0 0px #485fc7"}}
                  className="box has-text-centered has-background-success-light"
                >
                  <Titlee title="INCOMES" class="is-3  has-text-success" />
                  <br />
                  <h2 class="subtitle is-2  has-text-success">${this.state.totalIn.totalincome}</h2>
                </Link>
              </div>
              <div className="column is-4">
                <Link to="/outcomes" style={{boxShadow:"0 .5em 1em -.125em rgba(10,10,10,.1),0 0 0 0px #485fc7"}}
                  className="box has-text-centered has-background-danger-light"
                >
                  <Titlee title="OUTCOMES" class="is-3 has-text-danger" />
                  <br />
                  <h2 class="subtitle is-2 has-text-danger">${this.state.totalOut.totaloutcome}</h2>
                </Link>
              </div>
              <div className="column is-4">
                <Link to="/outcomes" style={{boxShadow:"0 .5em 1em -.125em rgba(10,10,10,.1),0 0 0 0px #485fc7"}}
                  className="box has-text-centered has-background-link-light"
                >
                  <Titlee title="BALANCE" class="is-3 has-text-link" />
                  <br />
                  <h2 class="subtitle is-2 has-text-link">${this.state.totalIn.totalincome-this.state.totalOut.totaloutcome}</h2>
                </Link>
              </div>
              <div className="column is-9">
                <Link to="/houses" style={{boxShadow:"0 .5em 1em -.125em rgba(10,10,10,.1),0 0 0 0px #485fc7"}} className="box">
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
                </Link>
              </div>
              <div className="column is-3">
                <Link style={{boxShadow:"0 .5em 1em -.125em rgba(10,10,10,.1),0 0 0 0px #485fc7"}} to="/access" className="box">
                  <Titlee title="Entries" class="is-3" />
                  <table className="table is-fullwidth">
                    <tbody>
                      {this.state.entries.slice(0,8).map((entry) => (
                        <tr key={entry.Id}>
                          <td className="p-0">
                            <span className="icon has-text-link">
                              <FontAwesomeIcon icon={faCircle} />
                            </span>{" "}
                            {entry.Date.substring(0,10)}
                          </td>
                          <td className="p-0">{entry.FullName}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
