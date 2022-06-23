import React,{Component} from "react";
//import Button from "../atoms/button";
import './Login.css';
import axios from "axios";

export default class Login extends Component {
  state={
    form:{
      "email":"",
      "password":""
    },
    error:false,
    errorMsg:""
  }
  onSubmit=e=>{
    e.preventDefault();
  }
  onChange = async e => {
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }
  onButton=()=>{
    axios.post("https://gestion-fraccionamiento.herokuapp.com/login/auth",this.state.form)
    .then(res=>{
      console.log(res);
      localStorage.setItem('tkn',JSON.stringify(res.data.salute));
      localStorage.setItem('idResDev',JSON.stringify(res.data.idResDev));
      this.props.history.push("/dashboard");
    })
    .catch((exception) => {
      console.log(exception);
    });
  }
  render() {
    /* Aquí imprimimos el token para probar la eliminación del mismo al hacer log out*/
    //const tkn = JSON.parse(localStorage.getItem('tkn'));
    //console.log(tkn);
    return(
    <section className="hero is-primary is-fullheight is-link">
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-5-tablet is-4-desktop is-4-widescreen">
          <h1 className="title is-2">Welcome</h1>
            <form onSubmit={this.onSubmit} className="box">
              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left">
                  <input name="email" type="email" placeholder="e.g. bobsmith@gmail.com" className="input" required onChange={this.onChange}/>
                  <span className="icon is-small is-left">
                    <i className="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left">
                  <input name="password" type="password" placeholder="*******" className="input" required onChange={this.onChange}/>
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="checkbox">
                  <input type="checkbox"/>
                  <span> Remember me</span>
                </label>
              </div>
              <div className="password">
                <label className="checkbox forgotPassword">
                  Forgot Password?
                </label>
              </div>
              <center><button onClick={this.onButton} type="submit" className="button">Login</button></center>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
}