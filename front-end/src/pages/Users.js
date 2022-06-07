//import { Link } from "react-router-dom"
import axios from "axios"
import React, {Component} from "react"

export default class Users extends Component {
    state={
        users:[]
    }
    async getUsers(){
        const res = await axios.get('http://gestion-fraccionamiento.herokuapp.com/api/users');
        this.setState({users:res.data});
        console.log(res.data);
    }
    async componentDidMount(){
        this.getUsers();
        console.log(this.state.users);
    }
    deleteUser= async (id)=>{
        await axios.delete('http://gestion-fraccionamiento.herokuapp.com/api/users'+id)
        this.getUsers();
    }
    render() {
        return(
    <section className="hero is-primary is-fullheight is-link">
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-5-tablet is-4-desktop is-5-widescreen">
          <h1 className="title is-2">Users</h1>
            <table className="table is-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Lastname</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.users.map(user => <tr key={user.id} onDoubleClick={()=> this.deleteUser(user.IdUser)}>
                            <td>{user.FirstName}</td><td>{user.LastName}</td><td>{user.PhoneNumber}</td><td>{user.Email}</td><td>{user.Active}</td>
                            </tr>)
                    }
                </tbody>
            </table> 
          </div>
        </div>
      </div>
    </div>
  </section>
        )
    }
}