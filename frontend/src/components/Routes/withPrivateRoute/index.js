import React from "react";
import PropTypes from "prop-types";
import {Route} from "react-router-dom";
import {connect} from "react-redux";
import {withLastLocation} from "react-router-last-location";
import Login from "../../../views/LoginView";
import {refreshJWT} from "../../../state/actions";


export default (WrappedComponent) => {
  const Wrapped = class extends React.PureComponent {
    UNSAFE_componentWillMount() {
      this.props.refreshJWT();
    }

    render() {
      const {
        loading,
        isAuthenticated,
      } = this.props;
      if (loading && !isAuthenticated) {
        return null;
      }
      return (
        isAuthenticated
          ? <WrappedComponent {...this.props}/>
          : <Route render={() => <Login/>}/>
      );
    }
  };
  Wrapped.propTypes = {
    WrappedComponent: PropTypes.element,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool,
    refreshJWT: PropTypes.func,
  };
  const mapStateToProps = state => ({
    isAuthenticated: state.authentication.isAuthenticated,
    loading: state.loadingProcedure.loading,
  });

  const mapDispatchToProps = dispatch => ({
    refreshJWT: () => dispatch(refreshJWT())
  });
  return withLastLocation(connect(mapStateToProps, mapDispatchToProps)(Wrapped));
};
