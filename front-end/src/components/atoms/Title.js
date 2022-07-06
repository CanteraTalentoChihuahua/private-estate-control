import React, { Component } from "react";

export default class Title extends Component {
  render() {
    return <h1 className={"title " + this.props.class} style={{ color: "#FFFFFF" }}>{this.props.title}</h1>;
  }
}
