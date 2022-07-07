import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../components/molecules/Sidebar";
import Title from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
import "./estilo.css";
export default class Access extends Component {
  state = {
    faceId: null,
  };
  async getFaceId() {
    const res = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/face-id"
    );
    this.setState({ faceId: res });
  }
  async componentDidMount() {
    this.getFaceId();
    console.log(this.state.faceId);
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
                  <Title title="Access" class="is-2 has-text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
