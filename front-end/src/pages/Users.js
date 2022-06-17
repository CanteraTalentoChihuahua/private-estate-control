//import { Link } from "react-router-dom"
import axios from "axios";
import React, { Component } from "react";
import Title from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
import Sidebar from "../components/molecules/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
export default class Users extends Component {
  state = {
    users: [],
  };
  async getUsers() {
    const res = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/users/get"
    );
    this.setState({ users: res.data });
    console.log(res.data);
  }
  async componentDidMount() {
    this.getUsers();
    console.log(this.state.users);
  }
  deleteUser = async (id) => {
    await axios.delete(
      "https://gestion-fraccionamiento.herokuapp.com/users" + id
    );
    this.getUsers();
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
          <div className="column box" style={{ marginRight: "14px" }}>
            <div className="columns is-multiline" style={{ marginTop: "5px" }}>
              <div className="column is-12">
                <div className="box has-background-white-ter">
                  <Title title="Users" />
                </div>
              </div>
              <div className="column is-12">
                <div className="box has-background-white-ter">
                  <table className="table is-fullwidth has-background-white-ter is-hoverable">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.users.map((user) => (
                        <tr
                          key={user.IdUser}
                          onDoubleClick={() => this.deleteUser(user.IdUser)}
                        >
                          <td>{user.FirstName}</td>
                          <td>{user.LastName}</td>
                          <td>{user.PhoneNumber}</td>
                          <td>{user.Email}</td>
                          <td>
                            {user.Active ? (
                              <FontAwesomeIcon icon={faCheck} />
                            ) : (
                              <FontAwesomeIcon icon={faTimes} />
                            )}
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
