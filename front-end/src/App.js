// A component in React is a function
import NavItem from "./components/NavItem";
import BodyItem from "./components/BodyItem";
import BottomItem from "./components/BottomItem";
import EndpointItem from "./components/EndpointItem";
// Better to have just the ones used AND in a component lol
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/js/src/collapse.js';

function App() {
// JSX with just one parent

  return (
    <div>
      <NavItem />
      <BodyItem />    
      <EndpointItem />
      <BottomItem /> 
    </div>
  );
}

export default App;
