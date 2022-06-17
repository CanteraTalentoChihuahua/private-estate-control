import axios from "axios";
import React, { Component } from "react";
import Sidebar from "../components/molecules/Sidebar";
import Title from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
export default class Houses extends Component {
  state = {
    houses: [],
  };
  async getHouses() {
    const res = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/houses/get"
    );
    this.setState({ houses: res.data });
    console.log(res.data);
  }
  async componentDidMount() {
    this.getHouses();
    console.log(this.state.houses);
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
                  <Title title="Houses" />
                </div>
              </div>
              <div className="column is-12">
                <div className="box has-background-white-ter">
                <table className="table is-fullwidth has-background-white-ter is-hoverable">
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.houses.map((house) => (
                      <tr key={house.IdHouse}>
                        <td>{house.Address}</td>
                        <td>{house.Balance}</td>
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
