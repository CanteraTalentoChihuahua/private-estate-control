import { Route, Switch } from 'react-router-dom';
import Login from "./components/molecules/Login";
import NewUser from "./pages/NewUser";
import Users from "./pages/Users";
import Sidebar from "./components/molecules/Sidebar";
import 'bulma/css/bulma.min.css';

function App() {
  return (
    <div>
      <Switch>
      <Route path="/Api/login" component={Login} exact/>
      <Route path="/Api/user" component={NewUser} exact/>
      <Route path="/Api/users" component={Users} exact/>
      <Route path="/Api/sidebar" component={Sidebar} exact/>
      </Switch>
    </div>
  );
}

export default App;
