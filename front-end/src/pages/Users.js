//import { Link } from "react-router-dom"
import axios from "axios"
import React, {Component} from "react"
//import axios from "axios"

export default class Users extends Component {
    state={
        users:[{username:"Arnold",lastname:"Valdez",phoneNumber:"6141909090",email:"tut@tut.tut",active:1},{username:"Nono",lastname:"Valdez",phoneNumber:"6141234567",email:"tut@tut.tut",active:0}]
    }
    /*async componentDidMount(){
        getUsers();
        console.log(this.state.users);
    }
    async getUsers(){
        const res = await axios.get('http://localhost:2000/users');
        this.setState({users:res.data});
    }
    deleteUser= async (id)=>{
        await axios.delete('http://localhost:2000/users'+id)
        this.getUsers();
    }*/
    render() {
        return(
    <section class="hero is-primary is-fullheight is-link">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-5-tablet is-4-desktop is-5-widescreen">
          <h1 class="title is-2">Users</h1>
            <table class="table is-striped">
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
                        this.state.users.map(user => <tr key={user.id} onDoubleClick={()=> this.deleteUser(user.id)}>
                            <td>{user.username}</td><td>{user.lastname}</td><td>{user.phoneNumber}</td><td>{user.email}</td><td>{user.active}</td>
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