import { Route, BrowserRouter, withRouter } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import "antd/dist/antd.css";

import "./App.css";

import Nav from "./views/Nav";
import Line from "./views/line";
import Chart from "./views/chart";
import Index from "./views/index";

const { Content } = Layout;

class App extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Route component={Nav} />
          <Content>
            <Route path="/" exact component={Index} />
            <Route path="/line" component={Line} />
            <Route path="/chart" component={Chart} />
          </Content>
        </BrowserRouter>
        ,
      </div>
    );
  }
}

export default withRouter(App);
