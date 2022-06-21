import { Route, Switch } from 'react-router-dom';
import Login from "./components/molecules/Login";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Houses from "./pages/Houses";
import Transactions from "./pages/Transactions";
import Access from "./pages/Access";
import Profile from "./pages/Profile";
import Sidebar from "./components/molecules/Sidebar";
import 'bulma/css/bulma.min.css';

function App() {
  return (
    <div id="app">
      <Switch>
      <Route path="/login" component={Login} exact/>
      <Route path="/dashboard" component={Dashboard} exact/>
      <Route path="/houses" component={Houses} exact/>
      <Route path="/transactions" component={Transactions} exact/>
      <Route path="/access" component={Access} exact/>
      <Route path="/profile" component={Profile} exact/>
      <Route path="/users" component={Users}/>
      </Switch>
    </div>
  );
}

export default App;
