import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../components/molecules/Sidebar";
import Title from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
import "./estilo.css";
export default class Access extends Component {
  state = {
    entries: [],
  };
    //GET para obtener incomes y outcomes
    async getEntries() {
      await axios.get(
        "https://gestion-fraccionamiento.herokuapp.com/access/get"
      ).then(res=>{
      console.log(res)
      this.setState({ entries: res.data });
    })
    }
    async componentDidMount() {
      this.getEntries();
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
          <div
            className="column box has-background-white-ter"
            style={{ marginRight: "14px" }}
          >
            <div className="columns is-multiline" style={{ marginTop: "5px" }}>
              <div className="column is-12">
                <div className="box titulo">
                  <Title title="Access" class="is-2 has-text-white is-family-sans-serif" />
                </div>
              </div>
              <div className="column is-12">
                <div className="box has-background-white">
                  <table className="table is-fullwidth has-background-white is-hoverable">
                    <thead>
                      <tr>
                        <th>Fullname</th>
                        <th>Access type</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.entries.slice(0,15).map((entry) => (
                        <tr key={entry.IdEntry}>
                          <td>{entry.FullName}</td>
                          <td>{entry.AccessType}</td>
                          <td>{entry.Date.substring(0, 10)}</td>
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
