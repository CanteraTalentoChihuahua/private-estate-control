import axios from "axios";
import React, { Component } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import Title from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
import Sidebar from "../components/molecules/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faCalendarAlt,
  faFileAlt,
  faDollarSign,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
export default class Incomes extends Component {
  state = {
    houses: [],
    incomes: [],
    newIncomes: {
      idResDev: "",
      idHouse: "",
      date: "",
      description: "",
      amount: "",
    },
    balance: "",
    edit: false,
    idEdit: "",
  };
  //GET para obtener incomes y outcomes
  async getIncomes() {
    const resIn = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/incomes/get"
    );
    const resHouses = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/houses/get"
    );
    this.setState({ incomes: resIn.data });
    this.setState({ houses: resHouses.data });
  }
  async componentDidMount() {
    this.getIncomes();
  }
  onEditarIn = async (key) => {
    if (!this.state.edit) {
      this.onBurgerIn(1);
    }
    // eslint-disable-next-line
    this.state.edit = true;
    await this.setState({
      idEdit: key.IdIncome,
      newIncomes: {
        ...this.state.newIncomes,
        id: key.IdIncome,
        idResDev: key.IdResDev,
        idHouse: key.IdHouse,
        date: key.Date.substring(0, 10),
        amount: key.Amount,
        description: key.Description,
      },
    });
    //console.log(this.state.newIncomes);
  };
  //Función para ocultar y mostrar el formulario incomes
  onBurgerIn = (edit) => {
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".income-form"),
      0
    );
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      if ($target.classList.value === "is-hidden") {
        el.classList.add("is-success");
        el.classList.remove("is-danger");
        this.setState({
          newIncomes: {
            idResDev: "",
            idHouse: "",
            date: "",
            description: "",
            amount: "",
          }
        })
      } else {
        el.classList.remove("is-success");
        el.classList.add("is-danger");
      }
      if(!(edit===1&&$target.classList.value==="")){
      $target.classList.toggle("is-hidden");
      }
    });
  };
  //Capturando datos del formulario incomes
  onChangeIn = async (e) => {
    await this.setState({
      newIncomes: {
        ...this.state.newIncomes,
        [e.target.name]: e.target.value,
      },
    });
    console.log(e.target.value)
    console.log(this.state.newIncomes)
  };
  onChangeSearchBar = async (e) => {
    await this.setState({
      balance: e.balance,
      newIncomes: {
        ...this.state.newIncomes,
        idHouse: e.value,
      },
    });
  };
  //POST y PUT para incomes
  onSubmitIn = async (e) => {
    e.preventDefault();
    if (this.state.edit) {
      for (let i = 0; i < this.state.houses.length; i++) {
        if (
          (await this.state.houses[i].IdHouse) === this.state.newIncomes.idHouse
        ) {
          this.setState({
            newIncomes: {
              ...this.state.newIncomes,
              idHouse: this.state.houses[i].IdHouse,
            },
          });
        }
      }
      axios
        .put(
          "https://gestion-fraccionamiento.herokuapp.com/incomes/put/" +
            this.state.idEdit,
          this.state.newIncomes
        )
        .then((res) => {
          console.log(res);
          this.getIncomes();
          this.setState({
            idEdit: "",
            newIncomes: {
              ...this.state.newIncomes,
              id: "",
              idResDev: "",
              idHouse: "",
              date: "",
              amount: "",
              description: "",
            },
          });
          this.onBurgerIn();
        })
        .catch((exception) => {
          console.log(exception.response);
        });
    } else {
      for (let i = 0; i < this.state.houses.length; i++) {
        if (
          (await this.state.houses[i].IdHouse) === this.state.newIncomes.idHouse
        ) {
          await this.setState({
            newIncomes: {
              ...this.state.newIncomes,
              idHouse: this.state.houses[i].IdHouse,
              idResDev: JSON.parse(localStorage.getItem("idResDev")),
              amount: parseInt(this.state.newIncomes.amount)
            },
          });
        }
      }
      console.log(this.state.newIncomes);
      axios.post("https://gestion-fraccionamiento.herokuapp.com/incomes/post",this.state.newIncomes)
        .then((res) => {
          console.log(res);
          this.getIncomes();
          this.setState({
            newIncomes: {
              ...this.state.newIncomes,
              id: "",
              idResDev: "",
              idHouse: "",
              date: "",
              amount: "",
              description: "",
            },
          });
          this.onBurgerIn();
        })
        .catch((exception) => {
          console.log(exception.response);
        });
    }
  };
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
          <div className="column box has-background-white-ter" style={{ marginRight: "14px" }}>
            <div className="columns is-multiline" style={{ marginTop: "5px" }}>
              <div className="column is-12">
                <div className="box titulo">
                  <Title title="Incomes" class="is-2 has-text-white is-family-sans-serif" />
                </div>
              </div>
              <div className="column is-12">
                <div className="box has-background-white">
                  <div className="columns mb-0">
                    <div className="column is-11">
                      <Title title="New Income" class="is-4 is-family-sans-serif" />
                    </div>
                    <div className="column is-1">
                      <button onClick={()=>this.onBurgerIn(0)} className="button icon income-form is-success" data-target="incomesForm">
                        <FontAwesomeIcon id="icono" icon={faPlus} />
                      </button>
                    </div>
                  </div>
                  {/*form para New income oculto*/}
                  <div id="incomesForm" className="is-hidden">
                    <form onSubmit={this.onSubmitIn}>
                      <div className="field">
                        <label className="label">Date</label>
                        <div className="control has-icons-left">
                          <input name="date" value={this.state.newIncomes.date} min="2000-01-01" max="2099-12-31" type="date" placeholder="YYYY-MM-DD" className="input" required onChange={this.onChangeIn}/>
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Description</label>
                        <div className="control has-icons-left">
                          <input name="description" type="text" placeholder="House 74 Payment" className="input" required value={this.state.newIncomes.description} onChange={this.onChangeIn}/>
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faFileAlt} />
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Amount</label>
                        <div className="control has-icons-left">
                          <input name="amount" type="number" placeholder="$500.00" className="input" required value={this.state.newIncomes.amount} onChange={this.onChangeIn}/>
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faDollarSign} />
                          </span>
                        </div>
                      </div>
                      <div className="field">
                      <label className="label">Receipt</label>
                        <div class="file has-name">
                          <label class="file-label">
                            <input class="file-input" type="file" name="receipt"/>
                            <span class="file-cta">
                              <span class="file-icon">
                              <FontAwesomeIcon icon={faFile} />
                              </span>
                              <span class="file-label">Choose a file…</span>
                            </span>
                            <span class="file-name">
                              Receipt 2017-07-29 at 15.54.25.png
                            </span>
                          </label>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Address</label>
                        <div className="control has-icons-left">
                          <Select name="idHouse" className="" onChange={this.onChangeSearchBar} options={this.state.houses.map((house) => ({ label: house.Address, value: house.IdHouse, balance: house.Balance, }))}/>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Balance: </label>
                        <label className="label">${this.state.balance}</label>
                      </div>
                      <div className="field">
                        <button type="submit" className="button" style={{ backgroundColor: "#47b181", color: "#FFF" }}>
                          <h2>Save</h2>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="column is-12">
                <div className="box has-background-white">
                  <table className="table is-fullwidth has-background-white is-hoverable">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.incomes.map((income) => (
                        <tr key={income.IdIncome}>
                          <td>{income.Date.substring(0, 10)}</td>
                          <td>{income.Description}</td>
                          <td>{income.Amount}</td>
                          <td>
                            <Link to={"/Incomes/" + income.IdIncome} onClick={() => this.onEditarIn(income)} className="button">
                              <FontAwesomeIcon icon={faEdit} />
                            </Link>
                          </td>
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
