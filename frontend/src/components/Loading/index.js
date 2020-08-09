import React from "react";
import PropTypes from "prop-types";
import {
  CircularProgress,
  Dialog,
  withStyles
} from "@material-ui/core";
import {connect} from "react-redux";
import {Fade} from "react-reveal";

const styles = () => ({
  CircularProgress: {
    backgroundColor: "rgba(255, 255, 255, 0.58)",
    position: "fixed",
    width: "500px",
    height: "200px",
    top: "50%",
    left: "50%",
    marginTop: "-100px",
    marginleft: "-250px"
  },
  Dialog: {

    "& .MuiBackdrop-root": {
      backgroundColor: "rgba(255, 255, 255, 0.58)"
    }
  }
});

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
