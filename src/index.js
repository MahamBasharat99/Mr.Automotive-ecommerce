import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/style.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import App from "./container/App";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(

    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  ,
  document.getElementById("root")
);
