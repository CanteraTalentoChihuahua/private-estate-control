//import axios from "axios";
import React, {Component} from "react"

export default class NewUser extends Component {
  
  state= {
    users:[]
  }
  /*
  onChangeFirstName = (e) => {
    this.setState({
      FirstName: e.target.value
    })
  }
  onChangeLastname = (e) => {
    this.setState({
      LastName: e.target.value
    })
  }
  onChangePhone = (e) => {
    this.setState({
      PhoneNumber: e.target.value
    })
  }
  onChangeEmail = (e) => {
    this.setState({
      Email: e.target.value
    })
  }
  onChangePassword = (e) => {
    this.setState({
      Password: e.target.value
    })
  }

  onSubmit = async e => {
    e.preventDefault();
    const res = await axios.post('http://http://gestion-fraccionamiento.herokuapp.com/api/users',{
      FirstName:this.state.FirstName,
      LastName:this.state.LastName,
      PhoneNumber:this.state.PhoneNumber,
      Email:this.state.Email,
      Password:this.state.Password
    });
    this.setState({FirstName:'',LastName:'',PhoneNumber:'',Email:'',Password:''});
    console.log(res);
    console.log("State:", this.state.users);
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
                  <input type="text" placeholder="Bob" className="input" required value={this.state.FirstName} onChange={this.onChangeFirstName}/>
                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label for="" className="label">Lastname</label>
                <div className="control has-icons-left">
                  <input type="text" placeholder="Smith" className="input" required value={this.state.LastName} onChange={this.onChangeLastname} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label for="" className="label">Phone number</label>
                <div className="control has-icons-left">
                  <input type="text" placeholder="6141234567" className="input" required value={this.state.PhoneNumber} onChange={this.onChangePhone} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-mobile"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label for="" className="label">Email</label>
                <div className="control has-icons-left">
                  <input type="email" placeholder="e.g. bobsmith@gmail.com" className="input" required value={this.state.Email} onChange={this.onChangeEmail} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label for="" className="label">Password</label>
                <div className="control has-icons-left">
                  <input type="password" placeholder="*******" className="input" required value={this.state.Password} onChange={this.onChangePassword} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                    <button type="submit" className="button is-success">New user</button>
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