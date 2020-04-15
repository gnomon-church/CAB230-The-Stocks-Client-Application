import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

// Components
import Navigation from "./components/Header"

// Pages
import Home from "./pages/Home";
import PriceHistory from "./pages/PriceHistory";
import Quote from "./pages/Quote";
import Stocks from "./pages/Stocks";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/pricehistory">
            <PriceHistory />
          </Route>

          <Route exact path="/quote">
            <Quote />
          </Route>

          <Route exact path="/stocks">
            <Stocks />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
