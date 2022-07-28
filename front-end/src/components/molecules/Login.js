import React, { Component } from "react";
//import Button from "../atoms/button";
import "./Login.css";
import axios from "axios";
import Swal from 'sweetalert2';

export default class Login extends Component {
  state = {
    form: {
      email: "",
      password: "",
    },
    error: false,
    errorMsg: "",
  };
  onSubmit = (e) => {
    e.preventDefault();
    localStorage.clear();
  };
  onChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }
  onButton= async ()=>{
    await axios.post("https://gestion-fraccionamiento.herokuapp.com/login/auth",this.state.form)
    .then(res=>{
      console.log(res);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
      localStorage.setItem('tkn',JSON.stringify(res.data.salute));
      localStorage.setItem('idResDev',JSON.stringify(res.data.idResDev));
      localStorage.setItem('idUser',JSON.stringify(res.data.idUser));
      this.props.history.push("/dashboard");
    })
    .catch((exception) => {
      console.log(this.state.form)
      console.log(exception);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid email or password',
        showConfirmButton: false,
        timer: 2000
      })
    });
  };
  render() {
    /* Aquí imprimimos el token para probar la eliminación del mismo al hacer log out*/
    //const tkn = JSON.parse(localStorage.getItem('tkn'));
    //console.log(tkn);
    return (
      <section className="hero is-primary is-fullheight" style={{backgroundColor: "#64c5b1"}}>
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-5-tablet is-4-desktop is-5-widescreen">
                <h1 className="title is-2 has-text-centered">Welcome</h1>
                <form onSubmit={this.onSubmit} className="box">
                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control has-icons-left">
                      <input
                        name="email"
                        type="email"
                        placeholder="e.g. bobsmith@gmail.com"
                        className="input"
                        required
                        onChange={this.onChange}
                      />
                      <span className="icon is-small is-left">
                        <i className="fa fa-envelope"></i>
                      </span>
                    </div>
                  </div>
                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control has-icons-left">
                      <input
                        name="password"
                        type="password"
                        placeholder="*******"
                        className="input"
                        required
                        onChange={this.onChange}
                      />
                      <span className="icon is-small is-left">
                        <i className="fa fa-lock"></i>
                      </span>
                    </div>
                  </div>
                  <div className="columns is-multiline">
                  <div className="field column is-6">
                    <label className="checkbox">
                      <input type="checkbox" />
                      <span className="has-text-grey"> Remember me</span>
                    </label>
                  </div>
                  <div className="password column is-6">
                    <label className="checkbox forgotPassword has-text-grey">
                      Forgot Password?
                    </label>
                  </div>
                  </div>
                  <center className="column">
                    <button onClick={this.onButton} type="submit" className="button is-success is-light is-outlined">
                      Login
                    </button>
                  </center>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}