import React, {Component} from "react";

export default class Dashboard extends Component {
    render() {
        return(
            <h1 className="title is-2">{this.props.title}</h1>
        )
    }
}