//import axios from "axios";
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
    <section className="hero is-primary is-fullheight is-link">
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-5-tablet is-4-desktop is-4-widescreen">
          <h1 className="title is-2">New User</h1>
            <form className="box" onSubmit={this.onSubmit}>
            <div className="field">
                <label for="" className="label">Name</label>
                <div className="control has-icons-left">
                  <input type="text" placeholder="Bob" className="input" required value={this.state.username} onChange={this.onChangeUsername}/>
                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label for="" className="label">Lastname</label>
                <div className="control has-icons-left">
                  <input type="text" placeholder="Smith" className="input" required value={this.state.lastname} onChange={this.onChangeLastname} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label for="" className="label">Phone number</label>
                <div className="control has-icons-left">
                  <input type="text" placeholder="6141234567" className="input" required value={this.state.phone} onChange={this.onChangePhone} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-mobile"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label for="" className="label">Email</label>
                <div className="control has-icons-left">
                  <input type="email" placeholder="e.g. bobsmith@gmail.com" className="input" required value={this.state.email} onChange={this.onChangeEmail} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label for="" className="label">Password</label>
                <div className="control has-icons-left">
                  <input type="password" placeholder="*******" className="input" required value={this.state.password} onChange={this.onChangePassword} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div className="field">
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