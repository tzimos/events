import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import {connect} from "react-redux";
import {Formik} from "formik";
import {withStyles} from "@material-ui/core";
import {config} from "../../config";
import history from "../../lib/history";
import LoginForm from "./LoginForm";
import {styles} from "./styles";
import {validationSchema} from "./validationSchema";
import {
  pushNotification,
  startLoading,
  stopLoading,
  userLoggedIn
} from "../../state/actions";
import apiRequest from "../../lib/apiRequest";
import {storeJWT} from "../../lib/jwTokenHandler";
import {hasProperty} from "../../lib/checkProperty";
import {
  handleApiErrors,
  handleUnexpectedError
} from "../../lib/apiUtils";

class LoginView extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }


  handleSubmit = (values, {setErrors, setSubmitting}) => {
    const {
      startLoading,
      stopLoading,
      userLoggedIn,
      notify,
    } = this.props;
    startLoading();
    const {api, resources, routePath} = config;
    const response = apiRequest.post(api, resources.getToken, values);
    // eslint-disable-next-line promise/catch-or-return
    response
      .then(response => response.json())
      .then(data => {
        if (hasProperty(data, "refresh") && hasProperty(data, "access")) {
          storeJWT(data);
          userLoggedIn();
          history.push(routePath.events);
        } else {
          handleApiErrors(notify, data, setErrors, Object.keys(values));
          setSubmitting(false);
        }
      })
      .catch(() => handleUnexpectedError(notify))
      .finally(() => {
        stopLoading();
      });
  }

  render() {
    const {pageTitle} = config;
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Helmet title={pageTitle.login}/>
        <div className={classes.formWrapper}>
          <Formik
            enableReinitialize
            initialValues={{
              username: "",
              password: ""
            }}
            onSubmit={this.handleSubmit}
            validationSchema={validationSchema}
            render={props => <LoginForm {...props}/>}
          />
        </div>
      </React.Fragment>
    );
  }
}


LoginView.propTypes = {
  startLoading: PropTypes.func,
  stopLoading: PropTypes.func,
  notify: PropTypes.func,
  userLoggedIn: PropTypes.func,
  classes: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoading()),
  stopLoading: () => dispatch(stopLoading()),
  notify: payload => dispatch(pushNotification(payload)),
  userLoggedIn: () => dispatch(userLoggedIn()),
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(LoginView));
