import { Route, Switch } from 'react-router-dom';
import Login from "./components/molecules/Login";
import NewUser from "./pages/NewUser";
import Users from "./pages/Users";
import Navbar from "./components/molecules/Navbar";
import 'bulma/css/bulma.min.css';

function App() {
  return (
    <div>
      <Switch>
      <Route path="/Api/login" component={Login} exact/>
      <Route path="/Api/user" component={NewUser} exact/>
      <Route path="/Api/users" component={Users} exact/>
      <Route path="/navbar" component={Navbar} exact />
      </Switch>
    </div>
  );
}

export default App;
