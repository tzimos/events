import React from "react";
import Fader from "react-fader";
import {Route} from "react-router-dom";
import {LastLocationProvider} from "react-router-last-location";

import Switch from "react-router-transition-switch";
import {config} from "../../config";
import LoginView from "../../views/LoginView";
import EventsView from "../../views/Events";


class Routes extends React.PureComponent {

  render() {
    const {routePath} = config;
    return (
      <React.Fragment>
        <LastLocationProvider>
          <Switch component={Fader}>
            <Route
              exact
              path={routePath.login}
              component={LoginView}/>
            <Route
              exact
              path={routePath.events}
              component={EventsView}/>
          </Switch>
        </LastLocationProvider>
      </React.Fragment>
    )
  }
}

export default Routes;