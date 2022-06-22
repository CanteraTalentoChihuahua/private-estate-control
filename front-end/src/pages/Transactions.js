import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Title from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
import Sidebar from "../components/molecules/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faMapMarkerAlt, faCalendarAlt,faFileAlt} from "@fortawesome/free-solid-svg-icons";
export default class Transactions extends Component {
  state = {
    incomes: [],
    outcomes: [],
    newIncomes: {
      "address":"",
      "date":"",
      "description":"",
      "amount":""
    },
    newOutcomes: {
      "date":"",
      "description":"",
      "amount":""
    },
    edit: false,
    idEdit: "",
  }
  //GET para obtener incomes y outcomes
  async getTransactions() {
    const resIn = await axios.get("https://gestion-fraccionamiento.herokuapp.com/incomes/get");
    const resOut = await axios.get("https://gestion-fraccionamiento.herokuapp.com/outcomes/get");
    this.setState({ incomes: resIn.data });
    this.setState({ outcomes: resOut.data });
  }
  async componentDidMount() {
    this.getTransactions();
  }
  //Función para ocultar y mostrar el formulario incomes
  onBurgerIn = () => {
    console.log(this.state.incomes)
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.income-form'), 0);
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        if($target.classList.value==='is-danger'){
            el.classList.toggle('is-success');
        }else{
            el.classList.toggle('is-danger');
        }
        $target.classList.toggle('is-hidden');
    });
  };
  //Función para ocultar y mostrar el formulario outcomes
  onBurgerOut = () => {
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.outcome-form'), 0);
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        if($target.classList.value==='is-danger'){
            el.classList.toggle('is-success');
        }else{
            el.classList.toggle('is-danger');
        }
        $target.classList.toggle('is-hidden');
    });
  };
  //Capturando datos del formulario incomes
  onChangeIn = async e => {
    await this.setState({
      newIncomes:{
        ...this.state.newIncomes,
        [e.target.name]: e.target.value
      }
    })
  }
  //Capturando datos del formulario outcomes
  onChangeOut = async e => {
    await this.setState({
      newOutcomes:{
        ...this.state.newOutcomes,
        [e.target.name]: e.target.value
      }
    })
  }
  //POST para crear incomes
  onSubmitIn = async e => {
    e.preventDefault();
    console.log("State:", this.state.newIncomes);
    axios.post('https://gestion-fraccionamiento.herokuapp.com/incomes/post',this.state.newIncomes)
    .then(res=>{
      console.log(res);
      this.getTransactions();
    })
    .catch((exception) => {
      alert(exception.response.data.msg);
    });
  }
  //POST para crear outcomes
  onSubmitOut = async e => {
    e.preventDefault();
    await this.setState({
      newOutcomes:{
        ...this.state.newOutcomes,
        idResDev: 1
      }
    })
    console.log("State:", this.state.newOutcomes);
    axios.post('https://gestion-fraccionamiento.herokuapp.com/outcomes/post',this.state.newOutcomes)
    .then(res=>{
      console.log(res);
      this.getTransactions();
    })
    .catch((exception) => {
      alert(exception.response.data.msg);
    });
  }
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
          <div className="column box" style={{ marginRight: "14px" }}>
            <div className="columns is-multiline" style={{ marginTop: "5px" }}>
              <div className="column is-12">
                <div className="box has-background-white-ter">
                  <Title title="Transactions"  class="is-2"/>
                </div>
              </div>
              <div className="column is-6">
                <div className="box has-background-white-ter">
                  <div className="columns mb-0">
                    <div className="column is-11">
                      <Title title="New Income" class="is-4" />
                    </div>
                    <div className="column is-1">
                      <button onClick={this.onBurgerIn} className="button icon income-form is-success" data-target="incomesForm">
                          <FontAwesomeIcon id="icono" icon={faPlus}/>
                      </button>
                    </div>
                  </div>
                  {/*form para New income oculto*/}
                  <div id="incomesForm" className="is-hidden"> 
                    <form onSubmit={this.onSubmitIn}>
                      <div className="field">
                        <label className="label">Address</label>
                        <div className="control has-icons-left">
                          <input
                            name="address"
                            type="text"
                            placeholder="Calle Street #321"
                            className="input"
                            required 
                            value={this.state.Address}
                            onChange={this.onChangeIn}
                          />
                          <span className="icon is-small is-left">
                            <FontAwesomeIcon icon={faMapMarkerAlt} />
                          </span>
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
                            value={this.state.Date}
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
                            value={this.state.Description}
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
                            value={this.state.Amount}
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

              <div className="column is-6">
                <div className="box has-background-white-ter">
                  <div className="columns mb-0">
                    <div className="column is-11">
                      <Title title="New Outcome" class="is-4" />
                    </div>
                    <div className="column is-1">
                      <button onClick={this.onBurgerOut} className="button icon outcome-form is-success" data-target="outcomesForm">
                          <FontAwesomeIcon id="icono" icon={faPlus}/>
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
                            type="text"
                            placeholder="MM/DD/YYYY"
                            className="input"
                            required
                            value={this.state.Date}
                            onChange={this.onChangeOut}
                          />
                          <span className="icon is-small is-left">
                            <i className="fa fa-user"></i>
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
                            value={this.state.Description}
                            onChange={this.onChangeOut}
                          />
                          <span className="icon is-small is-left">
                            <i className="fa fa-user"></i>
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
                            value={this.state.Amount}
                            onChange={this.onChangeOut}
                          />
                          <span className="icon is-small is-left">
                            <i className="fa fa-mobile"></i>
                          </span>
                        </div>
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
                <div className="box has-background-white-ter">
                  <table className="table is-fullwidth has-background-white-ter is-hoverable">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.incomes.map((income) => (<tr key={income.IdIncome}>
                          <td>{income.Date}</td>
                          <td>{income.Description}</td>
                          <td>{income.Amount}</td>
                          <td><Link to={"/transactions/" + income.IdUser} onClick={() => this.props.onEditar(income)} className="button">
                            <FontAwesomeIcon icon={faEdit} /></Link>
                          </td>
                        </tr>
                      ))}
                      {this.state.outcomes.map((outcome) => (<tr key={outcome.IdOutcome}>
                          <td>{outcome.Date}</td>
                          <td>{outcome.Description}</td>
                          <td>{outcome.Amount}</td>
                          <td><Link to={"/transactions/" + outcome.IdUser} onClick={() => this.props.onEditar(outcome)} className="button">
                           <FontAwesomeIcon icon={faEdit} /></Link>
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
