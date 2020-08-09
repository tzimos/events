import React from "react";
import PropTypes from "prop-types";
import {
  CircularProgress,
  Dialog,
  withStyles
} from "@material-ui/core";
import {connect} from "react-redux";
import {Fade} from "react-reveal";
import styles from "./styles"


class Loading extends React.PureComponent {

  render() {
    const {
      loading,
      classes
    } = this.props;
    if (!loading) {
      return null;
    }
    return (
      <>
        <Fade>
          <Dialog
            open={loading}
            className={classes.Dialog}
          ><CircularProgress
            className={classes.CircularProgress}/>
          </Dialog>
        </Fade>
      </>
    );
  }


}

Loading.propTypes = {
  loading: PropTypes.bool,
  classes: PropTypes.object,
};

const mapStateToProps = (store) => ({
  loading: store.loadingProcedure.loading,
});


export default withStyles(styles)(connect(mapStateToProps, null)(Loading));
