import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import 'bulma/css/bulma.min.css'

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <h1> <App /> </h1>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
