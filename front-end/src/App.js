import { Route, Switch } from "react-router-dom";
import Login from "./components/molecules/Login";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import Houses from "./pages/Houses";
import Transactions from "./pages/Transactions";
import Incomes from "./pages/Incomes";
import Outcomes from "./pages/Outcomes"
import Access from "./pages/Access";
import Profile from "./pages/Profile";
import "bulma/css/bulma.min.css";
import "react-datepicker/dist/react-datepicker.css"
function App() {
  return (
    <div id="app">
      <Switch>
        <Route path="/" component={Dashboard} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/incomes" component={Incomes} />
        <Route path="/outcomes" component={Outcomes} />
        <Route path="/houses" component={Houses} />
        <Route path="/transactions" component={Transactions} />
        <Route path="/access" component={Access} />
        <Route path="/profile" component={Profile} exact />
        <Route path="/users" component={Users} />
      </Switch>
    </div>
  );
}

export default App;
