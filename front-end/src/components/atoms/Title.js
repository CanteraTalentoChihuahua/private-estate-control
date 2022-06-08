import React, {Component} from "react";

export default class Title extends Component {
    render() {
        return(
            <h1 className="title is-2 box m-0">{this.props.title}</h1>
        )
    }
}