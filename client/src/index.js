import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import "semantic-ui-css/semantic.min.css";

axios.defaults.baseURL = process.env.BASE_URL || REACT_BASE_URL || "http://localhost:5555/";
// axios.defaults.baseURL = "http://localhost:5555/";

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);