import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Formik} from "formik";
import {withStyles} from "@material-ui/core";
import {config} from "../../../config";
import {styles} from "./styles";
import {validationSchema} from "./validationSchema";
import {
  eventsRequested,
  pushNotification,
  startLoading,
  stopLoading,
} from "../../../state/actions";
import apiRequest from "../../../lib/apiRequest";
import {
  handleApiErrors,
} from "../../../lib/apiUtils";
import CreateEventForm from "./form";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

class CreateEvent extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: "",
      initialTickets: "",
    };
  }


  handleSubmit = (values, {setErrors, setSubmitting}) => {
    const {
      startLoading,
      stopLoading,
      eventsRequested,
      notify,
    } = this.props;
    startLoading();
    const {
      api,
      resources
    } = config;
    const {successAction} = this.props;
    const response = apiRequest.post(api, resources.createEvent, values);
    response
      .then(response => {
        if (!response.ok) {
          return response.text().then(data => {
            throw new Error(data);
          });
        }
        return response.json();
      })
      .then(data => {
        let msgArgs = {
          status: "success",
          message: "Event created successfully."
        };
        successAction();
        eventsRequested();
        notify(msgArgs);
      })
      .catch(e => {
        handleApiErrors(notify, JSON.parse(e.message), setErrors, Object.keys(values));
        setSubmitting(false);
      })
      .finally(() => {
        stopLoading()
      })
  }

  render() {
    const {classes} = this.props;
    return (
        <React.Fragment>
          <div className={classes.formWrapper}>
            <Formik
              enableReinitialize
              initialValues={{
                name: "",
                date: "",
                initialTickets: "",
              }}
              onSubmit={this.handleSubmit}
              validationSchema={validationSchema}
              render={props => <CreateEventForm {...props}/>}
            />
          </div>
        </React.Fragment>
    )
  }
}


CreateEvent.propTypes = {
  startLoading: PropTypes.func,
  stopLoading: PropTypes.func,
  notify: PropTypes.func,
  successAction: PropTypes.func.isRequired,
  classes: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoading()),
  stopLoading: () => dispatch(stopLoading()),
  eventsRequested: () => dispatch(eventsRequested()),
  notify: payload => dispatch(pushNotification(payload)),
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(CreateEvent));