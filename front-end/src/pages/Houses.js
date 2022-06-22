import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/molecules/Sidebar";
import Title from "../components/atoms/Title";
import Navbar from "../components/molecules/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit,faPlus} from "@fortawesome/free-solid-svg-icons";
export default class Houses extends Component {
  state = {
    houses: [],
    newHouses: {
      address:'',
      occuppied:'',
      balance:'',
      idResDev:''
    },
    edit: false,
    idEdit:""
  };
  async getHouses() {
    const res = await axios.get(
      "https://gestion-fraccionamiento.herokuapp.com/houses/get"
    );
    this.setState({ houses: res.data });
  }
  async componentDidMount() {
    this.getHouses();
  }
    //Función para editar
    onEditar=(key)=>{
      this.onBurger();
      // eslint-disable-next-line
      this.state.edit=true
      this.setState({idEdit:key.IdHouse,
        newHouses:{
          ...this.state.newHouses,
        address:key.Address,
        occuppied:key.Occuppied,
        balance:key.Balance,
        idResDev:key.IdResDev
        }
      });
    }
    //Función para ocultar y mostrar el formulario
    onBurger = () => {
      const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.house-form'), 0);
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
          if($target.classList.value==='is-danger'){
              el.classList.toggle('is-success');
          }else{
              el.classList.toggle('is-danger');
          }
          $target.classList.toggle('is-hidden');
      });
    };
    //Capturando datos del formulario
    onChange = async e => {
      await this.setState({
        newHouses:{
          ...this.state.newHouses,
          [e.target.name]: e.target.value
        }
      })
    }
    //POST y PUT para crear houses
    onSubmit = async e => {
      e.preventDefault();
      if(this.state.edit){
        axios.put('https://gestion-fraccionamiento.herokuapp.com/houses/put/'+this.state.idEdit,this.state.newHouses)
        .then(res=>{
          console.log(res);
          this.getHouses();
        })
        .catch((exception) => {
          console.log(exception.response.data);
        });
      }else{
        axios.post('https://gestion-fraccionamiento.herokuapp.com/houses/post',this.state.newHouses)
        .then(res=>{
          console.log(res);
          this.getHouses();
        })
        .catch((exception) => {
          alert(exception.response.data.msg);
        });
      }
    }
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
                  <Title title="Houses"  class="is-2"/>
                </div>
              </div>
              <div className="column is-12">
                <div className="box has-background-white-ter">
                <div className="columns mb-0">
                    <div className="column is-11">
                      <Title title="New House" class="is-4" />
                    </div>
                    <div className="column is-1">
                      <button onClick={this.onBurger} className="button icon house-form is-success" data-target="housesForm">
                          <FontAwesomeIcon id="icono" icon={faPlus}/>
                      </button>
                    </div>
                  </div>
                  <div id="housesForm" className="is-hidden">
                  <form onSubmit={this.onSubmit}>
                      <div className="field">
                        <label className="label">Id</label>
                        <div className="control has-icons-left">
                          <input
                            name="idResDev"
                            type="text"
                            placeholder="1"
                            className="input"
                            required
                            value={this.state.newHouses.idResDev}
                            onChange={this.onChange}
                          />
                          <span className="icon is-small is-left">
                            <i className="fa fa-id-badge"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Address</label>
                        <div className="control has-icons-left">
                          <input
                            name="address"
                            type="text"
                            placeholder="Fake Address #2536"
                            className="input"
                            required
                            value={this.state.newHouses.address}
                            onChange={this.onChange}
                          />
                          <span className="icon is-small is-left">
                            <i className="fa fa-id-badge"></i>
                          </span>
                        </div>
                      </div>
                      <div className="field">
                        <button type="submit" className="button is-success">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="column is-12">
                <div className="box has-background-white-ter">
                <table className="table is-fullwidth has-background-white-ter is-hoverable">
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>Balance</th>
                      <th>Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.houses.map((house) => (
                      <tr key={house.IdHouse}>
                        <td>{house.Address}</td>
                        <td>{house.Balance}</td>
                        <td><Link to={"/houses/"+house.Id} onClick={()=>this.onEditar(house)} className="button"><FontAwesomeIcon icon={faEdit}/></Link></td>
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
