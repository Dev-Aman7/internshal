import React from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Router from "./utils/Router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
