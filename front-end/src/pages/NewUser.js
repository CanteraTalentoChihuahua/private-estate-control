import axios from "axios";
import { Link } from "react-router-dom";
import React, {Component} from "react"

export default class NewUser extends Component {

  /*onChangeUsername = (e) => {
    this.setState({
      username: e.target.value
      
    })
  }
  onChangeLastname = (e) => {
    this.setState({
      lastname: e.target.value
      
    })
  }
  onChangePhone = (e) => {
    this.setState({
      phone: e.target.value
      
    })
  }
  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value
      
    })
  }
  onChangePassword = (e) => {
    this.setState({
      password: e.target.value
      
    })
  }

  onSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:2000/users',{
      username:this.state.username
    })
    this.setState({username:''});
    console.log(res);
  }*/

  render() {
    return (
    <section class="hero is-primary is-fullheight is-link">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-4-widescreen">
          <h1 class="title is-2">New User</h1>
            <form class="box" onSubmit={this.onSubmit}>
            <div class="field">
                <label for="" class="label">Name</label>
                <div class="control has-icons-left">
                  <input type="text" placeholder="Bob" class="input" required value={this.state.username} onChange={this.onChangeUsername}/>
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Lastname</label>
                <div class="control has-icons-left">
                  <input type="text" placeholder="Smith" class="input" required value={this.state.lastname} onChange={this.onChangeLastname} />
                  <span class="icon is-small is-left">
                    <i class="fa fa-user"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Phone number</label>
                <div class="control has-icons-left">
                  <input type="text" placeholder="6141234567" class="input" required value={this.state.phone} onChange={this.onChangePhone} />
                  <span class="icon is-small is-left">
                    <i class="fa fa-mobile"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Email</label>
                <div class="control has-icons-left">
                  <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input" required value={this.state.email} onChange={this.onChangeEmail} />
                  <span class="icon is-small is-left">
                    <i class="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                <label for="" class="label">Password</label>
                <div class="control has-icons-left">
                  <input type="password" placeholder="*******" class="input" required value={this.state.password} onChange={this.onChangePassword} />
                  <span class="icon is-small is-left">
                    <i class="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div class="field">
                  <Link type="submit" class="button is-success" to="/login">
                    New user
                  </Link>                
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
    }
}