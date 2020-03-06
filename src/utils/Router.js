import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Dashboard from "../pages/Dashboard/Dashboard";
class Router extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/" exact component={Login} />
        </Switch>
      </div>
    );
  }
}

export default Router;
