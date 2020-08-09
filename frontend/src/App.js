import React from "react";
import {Router} from "react-router-dom";
import {
  createMuiTheme, MuiThemeProvider,
  responsiveFontSizes,
  CssBaseline
} from "@material-ui/core";
import {jssPreset} from "@material-ui/styles";
import globalPlugin from "jss-global";

import camelCase from "jss-plugin-camel-case";
import {create} from "jss";
import {
  createGenerateClassName,
  JssProvider
} from "react-jss";

import Routes from "./components/Routes";
import history from "./lib/history";
import Loading from "./components/Loading";
import SnackBar from "./components/SnackBar";

let theme = createMuiTheme({
  palette: {
    primary: {
      "main": "#391181",
    },
    secondary: {
      "main": "#FA0764"
    }
  },
  typography: {
    useNextVariants: true,
  },
  direction: "ltr"
});


theme = responsiveFontSizes(theme);

const jss = create({
  plugins: [
    ...jssPreset().plugins,
  ]
});

jss.use(globalPlugin(), camelCase());
const generateClassName = createGenerateClassName();


class App extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <JssProvider
          jss={jss}
          generateClassName={generateClassName}
        >
          <MuiThemeProvider
            theme={theme}>
            <CssBaseline/>
            <Router history={history}>
              <Routes/>
            </Router>
            <Loading/>
            <SnackBar/>
          </MuiThemeProvider>
        </JssProvider>
      </React.Fragment>
    )
  }
}

export default App;