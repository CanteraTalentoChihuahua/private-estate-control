import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/molecules/Sidebar";
import Title from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
import "./estilo.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
export default class Profile extends Component {

  state = {
    user: [],
  };
  //GET para obtener user
  async getUser() {
    const res = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/users/get/" + JSON.parse(localStorage.getItem("idUser"))
    );
    await this.setState({ user: res.data });
  }
  async componentDidMount() {
    this.getUser();
    console.log(this.state.user)
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
          <div className="column box has-background-white-ter" style={{ marginRight: "14px" }}>
            <div className="columns is-multiline" style={{ marginTop: "5px" }}>
              <div className="column is-12">
                <div className="box titulo">
                  <Title title="Profile" class="is-2 has-text-white" />
                </div>
              </div>

              <div className="column is-12">
                <div className="box has-background-white">
                  <div className="columns mb-0">
                    <div className="column is-11">
                      <Title title="Basic information" class="is-4 is-family-sans-serif" />
                    </div>
                  </div>
                </div>

                <Link
                  /*to={"/Outcomes/" + outcome.IdOutcome}
                  onClick={() => this.onEditarOut(outcome)}*/
                  className="button">
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
                <div className="box has-background-white">
                  <div className="field">
                    <label className="label">First Name</label>
                    <label className="is-size-6 ml-5">John</label>
                  </div>
                  <div className="field">
                    <label className="label">Last Name</label>
                    <label className="is-size-6 ml-5">Johnson</label>
                  </div>
                  <div className="field">
                    <label className="label">Phone Number</label>
                    <label className="is-size-6 ml-5">6141234567</label>
                  </div>
                  <div className="field">
                    <label className="label">Address</label>
                    <label className="is-size-6 ml-5">Río Bravo #2345, Provincia del Lago</label>
                  </div>
                  <div className="field">
                    <label className="label">Email</label>
                    <label className="is-size-6 ml-5">admin@resdev.com</label>
                  </div>

                  {/*<div id="outcomesForm" className="is-hidden">
                    <form onSubmit={this.onSubmitOut}>
                      <div className="field">
                        <label className="label">First name</label>
                        <div className="control has-icons-left">
                          <input name="first" type="text" placeholder="YYYY-MM-DD" required className="input" value={this.state.newOutcomes.date} onChange={this.onChangeOut}/>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Description</label>
                        <div className="control has-icons-left">
                          <input name="description" type="text" placeholder="Pago del agua" className="input" required value={this.state.newOutcomes.description} onChange={this.onChangeOut}/>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Amount</label>
                        <div className="control has-icons-left">
                          <input name="amount" type="text" placeholder="$2000.00" className="input" required value={this.state.newOutcomes.amount} onChange={this.onChangeOut}/>
                          </div>
                      </div>
                      <div className="field">
                        <div className="label">Residential wallet</div>
                        <div className="label">$ {this.state.residentialBalance}</div>
                      </div>
                      <div className="field">
                        <button type="submit" className="button" style={{ backgroundColor: "#47b181", color: "#FFF" }}>
                          <h2>Edit</h2>
                        </button>
                      </div>
                    </form>
                  </div>*/}

                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    );
  }
}
