import React from "react";
import PropTypes from "prop-types";
import {
  Typography,
  withStyles
} from "@material-ui/core";
import Icon from "@material-ui/core/Icon";
import {
  Visibility,
  VisibilityOff
} from "@material-ui/icons";
import styles from "./styles";

class ShowPasswordIcon extends React.PureComponent {

  render() {
    const {
      showPassword,
      classes,
      t,
      toggleShowPassword,
    } = this.props;
    return (
      <div className={classes.showPasswordIcon}>
        <Typography>
          {showPassword ? "hidePassword" : "showPassword"}
        </Typography>
        <Icon onClick={toggleShowPassword}>
          {showPassword ? <VisibilityOff/> : <Visibility/>}
        </Icon>
      </div>
    );
  }
}


ShowPasswordIcon.propTypes = {
  showPassword: PropTypes.bool,
  classes: PropTypes.object,
  toggleShowPassword: PropTypes.func,
};

export default withStyles(styles)(ShowPasswordIcon);
