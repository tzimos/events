import React from "react";
import {Router} from "react-router-dom";
import Routes from "./components/Routes";
import history from "./lib/history";

class App extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <Router history={history}>
          <Routes/>
        </Router>
      </React.Fragment>
    )
  }
}

export default App;