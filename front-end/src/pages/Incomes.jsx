import axios from "axios";
import React, { Component, useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import Title from "../components/atoms/Title";

import Navbar from "../components/molecules/Navbar";
import Sidebar from "../components/molecules/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faPlus,
  faMapMarkerAlt,
  faCalendarAlt,
  faFileAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
export default class Incomes extends Component {
  state = {
    houses: [],
    incomes: [],
    outcomes: [],
    newIncomes: {
      idResDev: "",
      idHouse: "",
      date: "",
      description: "",
      amount: "",
    },
    newOutcomes: {
      idResDev: "",
      date: "",
      description: "",
      amount: "",
    },
    edit: false,
    idEdit: "",
  };
  //GET para obtener incomes y outcomes
  async getTransactions() {
    const resIn = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/incomes/get"
    );
    const resOut = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/outcomes/get"
    );
    const resHouses = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/houses/get"
    );
    this.setState({ incomes: resIn.data });
    this.setState({ outcomes: resOut.data });
    this.setState({ houses: resHouses.data });
  }
  async componentDidMount() {
    this.getTransactions();
  }
  onEditarIn = async (key) => {
    this.onBurgerIn();
    // eslint-disable-next-line
    this.state.edit = true;
    await this.setState({
      idEdit: key.IdIncome,
      newIncomes: {
        ...this.state.newIncomes,
        id: key.IdIncome,
        idResDev: key.IdResDev,
        idHouse: key.IdHouse,
        date: key.Date,
        amount: key.Amount,
        description: key.Description,
      },
    });
    console.log(this.state.newIncomes);
  };
  onEditarOut = async (key) => {
    this.onBurgerOut();
    // eslint-disable-next-line
    this.state.edit = true;
    await this.setState({
      idEdit: key.IdOutcome,
      newOutcomes: {
        ...this.state.newOutcomes,
        id: key.IdOutcome,
        idResDev: key.IdResDev,
        date: key.Date,
        amount: key.Amount,
        description: key.Description,
      },
    });
    console.log(this.state.newOutcomes);
  };
  //Función para ocultar y mostrar el formulario incomes
  onBurgerIn = () => {
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".income-form"),
      0
    );
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      if ($target.classList.value === "is-danger") {
        el.classList.toggle("is-success");
      } else {
        el.classList.toggle("is-danger");
      }
      $target.classList.toggle("is-hidden");
    });
  };
  //Función para ocultar y mostrar el formulario outcomes
  onBurgerOut = () => {
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".outcome-form"),
      0
    );
    // Add a click event on each of them
    $navbarBurgers.forEach((el) => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      if ($target.classList.value === "is-danger") {
        el.classList.toggle("is-success");
      } else {
        el.classList.toggle("is-danger");
      }
      $target.classList.toggle("is-hidden");
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
  };
  onChangeSearchBar = async (e) => {
    await this.setState({
      newIncomes: {
        ...this.state.newIncomes,
        [e.target.id]: e.target.value,
      },
    });
  };
  //Capturando datos del formulario outcomes
  onChangeOut = async (e) => {
    await this.setState({
      newOutcomes: {
        ...this.state.newOutcomes,
        [e.target.name]: e.target.value,
      },
    });
  };
  //DELETE para incomes
  onDeleteIn = async (key) => {
    await axios
      .delete(
        "https://gestion-fraccionamiento.herokuapp.com/incomes/delete/" +
          key.IdIncome,
        key.IdIncome
      )
      .then((res) => {
        console.log(res);
        this.getTransactions();
      })
      .catch((exception) => {
        console.log(exception.response);
      });
  };
  //DELETE para outcomes
  onDeleteOut = async (key) => {
    await axios
      .delete(
        "https://gestion-fraccionamiento.herokuapp.com/outcomes/delete/" +
          key.IdOutcome,
        key.IdOutcome
      )
      .then((res) => {
        console.log(res);
        this.getTransactions();
      })
      .catch((exception) => {
        console.log(exception.response);
      });
  };
  //POST y PUT para incomes
  onSubmitIn = async (e) => {
    e.preventDefault();
    if (this.state.edit) {
      for (let i = 0; i < this.state.houses.length; i++) {
        if (
          (await this.state.houses[i].Address) === this.state.newIncomes.idHouse
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
          this.getTransactions();
        })
        .catch((exception) => {
          console.log(exception.response);
        });
    } else {
      for (let i = 0; i < this.state.houses.length; i++) {
        if (
          (await this.state.houses[i].Address) === this.state.newIncomes.idHouse
        ) {
          await this.setState({
            newIncomes: {
              ...this.state.newIncomes,
              idHouse: this.state.houses[i].IdHouse,
              idResDev: JSON.parse(localStorage.getItem("idResDev")),
            },
          });
        }
      }
      console.log(this.state.newIncomes);
      axios
        .post(
          "https://gestion-fraccionamiento.herokuapp.com/incomes/post",
          this.state.newIncomes
        )
        .then((res) => {
          console.log(res);
          this.getTransactions();
        })
        .catch((exception) => {
          console.log(exception.response);
        });
    }
  };
  //POST y PUT para crear Outcomes
  onSubmitOut = async (e) => {
    e.preventDefault();
    if (this.state.edit) {
      console.log(this.state.newOutcomes);
      axios
        .put(
          "https://gestion-fraccionamiento.herokuapp.com/outcomes/put/" +
            this.state.idEdit,
          this.state.newOutcomes
        )
        .then((res) => {
          console.log(res);
          this.getTransactions();
        })
        .catch((exception) => {
          console.log(exception.response);
        });
    } else {
      console.log(this.state.newOutcomes);
      await this.setState({
        newOutcomes: {
          ...this.state.newOutcomes,
          idResDev: JSON.parse(localStorage.getItem("idResDev")),
        },
      });
      console.log(this.state.newOutcomes);
      axios
        .post(
          "https://gestion-fraccionamiento.herokuapp.com/outcomes/post",
          this.state.newOutcomes
        )
        .then((res) => {
          console.log(res);
          this.getTransactions();
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

    let options = this.state.houses.map((house) => {
      return { value: house.IdHouse, label: house.Address };
    });
    console.log(options);
    return (
      <div>
        <Navbar />
        <section className="main-content columns is-multiline is-variable">
          <Sidebar />
          <div className="column box" style={{ marginRight: "14px" }}>
            <div className="columns is-multiline" style={{ marginTop: "5px" }}>
              <div className="column is-12">
                <div className="box has-background-white-ter">
                  <Title title="Incomes" class="is-2" />
                </div>
              </div>
              <div className="column is-12">
                <div className="box has-background-white-ter">
                  <div className="columns mb-0">
                    <div className="column is-11">
                      <Title title="New Income" class="is-4" />
                    </div>
                    <div className="column is-1">
                      <button
                        onClick={this.onBurgerIn}
                        className="button icon income-form is-success"
                        data-target="incomesForm"
                      >
                        <FontAwesomeIcon id="icono" icon={faPlus} />
                      </button>
                    </div>
                  </div>
                  {/*form para New income oculto*/}
                  <div id="incomesForm" className="is-hidden">
                    <form onSubmit={this.onSubmitIn}>
                      <div className="control has-icons-left">
                        <div className="field">
                          <Select
                            name="idHouse"
                            onChange={this.onChangeIn}
                            options={this.state.houses.map((house) => ({
                              label: house.Address,
                              value: house.IdHouse,
                            }))}
                          />
                          {/* <select name="idHouse" onChange={this.onChangeIn}>
                              <option>Address</option>
                              {this.state.houses.map((house) => (
                                <option
                                  key={house.IdHouse}
                                  className="dropdown-item"
                                >
                                  {house.Address}
                                </option>
                              ))}
                            </select> */}
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Date</label>
                        <div className="control has-icons-left">
                          <input
                            name="date"
                            type="text"
                            placeholder="YYYY-MM-DD"
                            className="input"
                            required
                            value={this.state.newIncomes.date}
                            onChange={this.onChangeIn}
                          />
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Description</label>
                        <div className="control has-icons-left">
                          <input
                            name="description"
                            type="text"
                            placeholder="House 74 Payment"
                            className="input"
                            required
                            value={this.state.newIncomes.description}
                            onChange={this.onChangeIn}
                          />
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faFileAlt} />
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Amount</label>
                        <div className="control has-icons-left">
                          <input
                            name="amount"
                            type="text"
                            placeholder="$500.00"
                            className="input"
                            required
                            value={this.state.newIncomes.amount}
                            onChange={this.onChangeIn}
                          />
                          <span className="icon is-small is-left">
                            <i className="fa fa-mobile"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <button type="submit" className="button is-success">
                          New income
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div className="column is-12">
                <div className="box has-background-white-ter">
                  <table className="table is-fullwidth has-background-white-ter is-hoverable">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.incomes.map((income) => (
                        <tr key={income.IdIncome}>
                          <td>{income.Date}</td>
                          <td>{income.Description}</td>
                          <td>{income.Amount}</td>
                          <td>
                            <Link
                              to={"/transactions/" + income.IdIncome}
                              onClick={() => this.onEditarIn(income)}
                              className="button"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={"/transactions/" + income.IdIncome}
                              onClick={() => this.onDeleteIn(income)}
                              className="button"
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </Link>
                          </td>
                        </tr>
                      ))}
                      {this.state.outcomes.map((outcome) => (
                        <tr key={outcome.IdOutcome}>
                          <td>{outcome.Date}</td>
                          <td>{outcome.Description}</td>
                          <td>{outcome.Amount}</td>
                          <td>
                            <Link
                              to={"/transactions/" + outcome.IdOutcome}
                              onClick={() => this.onEditarOut(outcome)}
                              className="button"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Link>
                          </td>
                          <td>
                            <Link
                              to={"/transactions/" + outcome.IdOutcome}
                              onClick={() => this.onDeleteOut(outcome)}
                              className="button"
                            >
                              <FontAwesomeIcon icon={faTimes} />
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
