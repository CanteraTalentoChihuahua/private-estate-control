import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Title from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
import Sidebar from "../components/molecules/Sidebar";
import "./estilo.css";
//import DatePicker from "react-datepicker"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faDollarSign,
  faEdit,
  faFileAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
export default class Outcomes extends Component {
  state = {
    outcomes: [],
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
  async getOutcomes() {
    const res = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/residentials/get/" +
        JSON.parse(localStorage.getItem("idResDev")),
      JSON.parse(localStorage.getItem("idResDev"))
    );
    await this.setState({ residentialBalance: res.data.TotalBalance });
    const resOut = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/outcomes/get"
    );
    this.setState({ outcomes: resOut.data });
  }
  async componentDidMount() {
    this.getOutcomes();
  }
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
        date: key.Date.substring(0, 10),
        amount: key.Amount,
        description: key.Description,
      },
    });
    console.log(this.state.newOutcomes);
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
  //Capturando datos del formulario outcomes
  onChangeOut = async (e) => {
    await this.setState({
      newOutcomes: {
        ...this.state.newOutcomes,
        [e.target.name]: e.target.value,
      },
    });
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
          this.getOutcomes();
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
          this.getOutcomes();
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
                  <Title title="Outcomes" class="is-2 has-text-white" />
                </div>
              </div>
              <div className="column is-12">
                <div className="box has-background-white">
                  <div className="columns mb-0">
                    <div className="column is-11">
                      <Title title="New Outcome" class="is-4" />
                    </div>
                    <div className="column is-1">
                      <button
                        onClick={this.onBurgerOut}
                        className="button icon outcome-form is-success"
                        data-target="outcomesForm"
                      >
                        <FontAwesomeIcon id="icono" icon={faPlus} />
                      </button>
                    </div>
                  </div>
                  {/*form para New outcome oculto*/}
                  <div id="outcomesForm" className="is-hidden">
                    <form onSubmit={this.onSubmitOut}>
                      <div className="field">
                        <label className="label">Date</label>
                        <div className="control has-icons-left">
                          <input
                            name="date"
                            type="date"
                            min="2000-01-01"
                            max="2099-12-31"
                            placeholder="YYYY-MM-DD"
                            required
                            className="input"
                            value={this.state.newOutcomes.date}
                            onChange={this.onChangeOut}
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
                            placeholder="Pago del agua"
                            className="input"
                            required
                            value={this.state.newOutcomes.description}
                            onChange={this.onChangeOut}
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
                            placeholder="$2000.00"
                            className="input"
                            required
                            value={this.state.newOutcomes.amount}
                            onChange={this.onChangeOut}
                          />
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faDollarSign} />
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <div className="label">Residential wallet</div>
                        <div className="label">$ {this.state.residentialBalance}</div>
                      </div>
                      <div className="field">
                        <button type="submit" className="button is-success">
                          New outcome
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
                      {this.state.outcomes.map((outcome) => (
                        <tr key={outcome.IdOutcome}>
                          <td>{outcome.Date}</td>
                          <td>{outcome.Description}</td>
                          <td>{outcome.Amount}</td>
                          <td>
                            <Link
                              to={"/Outcomes/" + outcome.IdOutcome}
                              onClick={() => this.onEditarOut(outcome)}
                              className="button"
                            >
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
