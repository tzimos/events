import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  withStyles,
} from "@material-ui/core";
import {styles} from "./styles";
import {logoutUser} from "../../state/actions";

class NavBar extends React.PureComponent {

  render() {
    const {
      classes,
      isAuthenticated,
      logoutUser
    } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              className={classes.title}>
              Events management
            </Typography>
            {isAuthenticated && <Button
              onClick={() => logoutUser()}
              color="inherit">Logout</Button>}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
NavBar.propTypes = {
  classes: PropTypes.object,
  isAuthenticated: PropTypes.bool,
  logoutUser: PropTypes.func,
};

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NavBar));
