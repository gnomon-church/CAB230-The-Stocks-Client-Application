import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// Components
import NavigationIN from "./components/HeaderIN"
import NavigationOUT from "./components/HeaderOUT"

// Pages
import Home from "./pages/Home";
import PriceHistory from "./pages/PriceHistory";
import Stocks from "./pages/Stocks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";

const token = localStorage.getItem("token");

function symbolPasser(props) {
  return(
    <PriceHistory stock_symbol={props.match.params.stock_symbol} />
  )
}

export default function App() {

  let navigation;
  if (token !== null) {
    navigation = <NavigationIN />;
  } else {
    navigation = <NavigationOUT />;
  }

  return (
    <Router>
      <div className="App">
        {navigation}

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/stocks/:stock_symbol" component={symbolPasser} />

          <Route exact path="/stocks">
            <Stocks />
          </Route>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route exact path="/register">
            <Register />
          </Route>

          <Route exact path="/logout">
            <Logout />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
