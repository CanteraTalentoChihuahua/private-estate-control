// A component in React is a function
import { Route, Switch } from 'react-router-dom';
import NavItem from "./components/NavItem";
import BodyItem from "./components/BodyItem";
import BottomItem from "./components/BottomItem";
import EndpointItem from "./components/EndpointItem";
import Login from "./components/molecules/Login";
import 'bulma/css/bulma.min.css';
// Better to have just the ones used AND in a component lol
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
// JSX with just one parent

  return (
    <div>
      <Switch>
      <Route path="/login" component={Login} exact/>
      </Switch>
    </div>
  );
}

export default App;
