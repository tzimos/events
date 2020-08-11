import React from "react";
import PropTypes from "prop-types";
import {
  Snackbar as DefaultSnackBar,
  SnackbarContent,
  withStyles
} from "@material-ui/core";
import {connect} from "react-redux";
import styles from "./styles";
import SnackBarMessage from "./SnackBarMessage";
import {closeSnackBar} from "../../state/actions";


class SnackBar extends React.PureComponent {

  onClose = () => this.props.closeSnackBar();

  determineStatus = () => {
    const {
      status,
      classes
    } = this.props;
    switch (status) {
      case "success":
        return classes.success;
      case "error":
        return classes.error;
      default:
        return classes.info;
    }
  };

  render() {
    const {
      message,
      autoHideDuration,
      snackBarActions,
      open,
    } = this.props;

    return (
      <React.Fragment>
        <DefaultSnackBar
          autoHideDuration={autoHideDuration}
          open={open}
          onClose={this.onClose}
        >
          <SnackbarContent
            action={snackBarActions}
            className={this.determineStatus()}
            message={<SnackBarMessage message={message}/>}/>
        </DefaultSnackBar>
      </React.Fragment>
    );
  }

}

SnackBar.propTypes = {
  closeSnackBar: PropTypes.func,
  status: PropTypes.string,
  message: PropTypes.string,
  open: PropTypes.bool,
  classes: PropTypes.object,
  action: PropTypes.array,
};

const mapStateToProps = ({notifications}) => ({
  open: notifications.open,
  message: notifications.message,
  status: notifications.status,
  autoHideDuration: notifications.autoHideDuration,
  snackBarActions: notifications.snackBarActions,
});

const mapDispatchToProps = dispatch => ({
  closeSnackBar: () => dispatch(closeSnackBar()),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SnackBar));
