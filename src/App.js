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
import BarChart from "./BarChart";
import Login2 from "./Login2";

function App() {
  const userId = useSelector((state) => state.user.userId);
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
          {/* <Login2 /> */}
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        {!isEmpty(userId) ? (
          <Route path="/wallet" component={Wallet} />
        ) : (
          <Redirect to="/login" />
        )}
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
