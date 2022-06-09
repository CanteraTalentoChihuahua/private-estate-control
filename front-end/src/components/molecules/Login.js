//import { Link } from "react-router-dom";
import React,{Component} from "react";
//import Button from "../atoms/button";
import './Login.css';

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
  onchange=async e=>{
    await this.setState({
      login:{
        ...this.state.form,
        [e.target.email]:e.target.value
      }
    })
    console.log(this.state.form);
  }
  render() {
    return(
    <section class="hero is-primary is-fullheight is-link">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-4-widescreen">
          <h1 class="title is-2">Welcome</h1>
            <form onSubmit={this.onSubmit} class="box">
              <div class="field">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                  <input name="email" type="email" placeholder="e.g. bobsmith@gmail.com" class="input" required onChange={this.onChange}/>
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Password</label>
                <div class="control has-icons-left">
                  <input name="password" type="password" placeholder="*******" class="input" required/>
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="checkbox">
                  <input type="checkbox"/>
                  Remember me
                </label>
              </div>
              <div class="password">
                <label for="" class="checkbox forgotPassword">
                  Forgot Password?
                </label>
              </div>
              <button type="submit" className="button">login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
}