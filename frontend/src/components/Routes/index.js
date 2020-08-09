import React from "react";
import Fader from "react-fader";
import {Route} from "react-router-dom";
import {LastLocationProvider} from "react-router-last-location";

import Switch from "react-router-transition-switch";
import {routePath} from "../../lib/urlPath";
import LoginView from "../../views/LoginView";


class Routes extends React.PureComponent {

  render() {
    return (
      <React.Fragment>
        <LastLocationProvider>
          <Switch component={Fader}>
            <Route
              exact
              path={routePath.login}
              component={LoginView}/>
          </Switch>
        </LastLocationProvider>
      </React.Fragment>
    )
  }
}

export default Routes;