import React from "react";

class EndpointItem extends React.Component{

    constructor(props){
        super(props)
        this.state = 
            {
                error: null,
                isLoaded: false,
                items:[]
            };
    }

componentDidMount() {
    fetch("http://localhost:2000/endpoint")
    .then(res => res.json())
    .then(
        (result) => {
            this.setState({
                isLoaded: true,
                items: result.items
            });
        },
        (error) => {
            this.setState({
                isLoaded: true,
                error
            });
        }
    )
}

render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded){
        return <div>Loading loading...</div>;
    } else {
        return (
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                    {item.id} {item.name}
                    </li>
                ))}
            </ul>
        );
    }
}

}

export default EndpointItem;