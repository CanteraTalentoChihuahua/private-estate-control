import axios from "axios";
import React, {Component} from "react"

export default class NewUser extends Component {
  
  state= {
    users:{
        "idResDev":"",
        "firstName":"",
        "lastName":"",
        "phone":"",
        "email":"",
        "password":"",
        "faceId":""
      }
  }
  onChange = async e => {
    await this.setState({
      users:{
        ...this.state.users,
        [e.target.name]: e.target.value
      }
    })
  }
  onSubmit = async e => {
    e.preventDefault();
    console.log("State:", this.state.users);
    axios.post('https://gestion-fraccionamiento.herokuapp.com/users/post',this.state.users)
    .then(res=>{
      console.log(res);
    })
    .catch((exception) => {
      alert(exception.response.data.msg);
    });
  }

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
                <label className="label">Id</label>
                <div className="control has-icons-left">
                  <input name="idResDev" type="text" placeholder="1" className="input" required value={this.state.IdResDev} onChange={this.onChange}/>
                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
              </div>
            <div className="field">
                <label className="label">Name</label>
                <div className="control has-icons-left">
                  <input name="firstName" type="text" placeholder="Bob" className="input" required value={this.state.FirstName} onChange={this.onChange}/>
                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Lastname</label>
                <div className="control has-icons-left">
                  <input name="lastName" type="text" placeholder="Smith" className="input" required value={this.state.LastName} onChange={this.onChange} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-user"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Phone number</label>
                <div className="control has-icons-left">
                  <input name="phone" type="text" placeholder="6141234567" className="input" required value={this.state.PhoneNumber} onChange={this.onChange} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-mobile"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Email</label>
                <div className="control has-icons-left">
                  <input name="email" type="email" placeholder="e.g. bobsmith@gmail.com" className="input" required value={this.state.Email} onChange={this.onChange} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-envelope"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control has-icons-left">
                  <input name="password" type="password" placeholder="*******" className="input" required value={this.state.Password} onChange={this.onChange} />
                  <span className="icon is-small is-left">
                    <i className="fa fa-lock"></i>
                  </span>
                </div>
              </div>
              <div className="field">
                <label className="label">FaceId</label>
                <div className="control has-icons-left">
                  <input name="faceId" type="text" placeholder="TuCara" className="input" required value={this.state.FaceId} onChange={this.onChange} />
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