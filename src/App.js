import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import isEmpty from "is-empty";

import Login from "./Login";
import SignUp from "./SignUp";
import Wallet from "./Wallet";
import Login2 from "./Login2";

function App() {
  const userId = useSelector((state) => state.user.userId);
  return (
    <Router>
      <Switch>
        <Route path="/Expenses/login">
          <Login />
        </Route>
        <Route path="/Expenses/signup">
          <SignUp />
        </Route>
        {!isEmpty(userId) ? (
          <Route path="/Expenses/wallet" component={Wallet} />
        ) : (
          <Redirect to="/Expenses/login" />
        )}
        <Route path="/Expenses/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
