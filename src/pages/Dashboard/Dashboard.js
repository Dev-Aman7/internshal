import React, { Component } from "react";
import Cookies from "js-cookie";
class Dashboard extends Component {
  render() {
    return (
      <div>
        <h1>Hello {Cookies.get("username")}</h1>
      </div>
    );
  }
}

export default Dashboard;
