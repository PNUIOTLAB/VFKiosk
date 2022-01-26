import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Components/Home"
import Menu from "./Components/Menu"
import Payment from "./Components/Payment"
import End from "./Components/End"
function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Home}>
        </Route>
        <Route path="/menu" component={Menu}>
        </Route>
        <Route path="/payment" component={Payment}>
        </Route>
        <Route path="/end" component={End}>
        </Route>
      </BrowserRouter> 
    </div>
   
    
  );
}

export default App;
