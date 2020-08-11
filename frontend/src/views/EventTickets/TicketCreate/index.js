import React from "react";
import {Formik} from "formik";
import {validationSchema} from "./validationSchema";
import TicketCreateForm from "./form";
import {config} from "../../../config";
import apiRequest from "../../../lib/apiRequest";
import {handleApiErrors} from "../../../lib/apiUtils";
import PropTypes from "prop-types";
import {
  downloadTicketsRequested,
  eventsRequested,
  eventTicketsRequested,
  pushNotification,
  startLoading,
  stopLoading
} from "../../../state/actions";
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";

class TicketCreate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newCreatedTicketIds: []
    }
  }

  downloadNewTickets = () => this.props.downloadTicketsRequested({ticketIds: this.state.newCreatedTicketIds})

  getTicketDownloadBtn = () => {
    return [
      <Button
        key={"newTicketsDownloader"}
        onClick={this.downloadNewTickets}>
        Download in CSV
      </Button>
    ]
  }

  handleSubmit = (values, {setErrors, setSubmitting}) => {
    const {
      startLoading,
      stopLoading,
      successAction,
      eventTicketsRequested,
      notify,
    } = this.props;
    startLoading();
    const {
      api,
      resources
    } = config;
    const response = apiRequest.post(api, resources.bulkCreateTickets, values);
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
        const createdLen = data.createdTicketIds.length;
        const tickets = createdLen > 1 ? "tickets" : "ticket";
        let msgArgs = {
          status: "success",
          message: `${createdLen} ${tickets} created successfully.`
        };
        this.setState({newCreatedTicketIds: data.createdTicketIds})
        successAction();
        eventTicketsRequested(values.eventId);
        notify(msgArgs, 30000, this.getTicketDownloadBtn());
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
    const {
      eventId
    } = this.props;
    return (
      <React.Fragment>
        <Formik
          enableReinitialize
          initialValues={{
            eventId: eventId,
            numOfTickets: 0,
          }}
          onSubmit={this.handleSubmit}
          validationSchema={validationSchema}
          render={props => <TicketCreateForm {...props}/>}
        />
      </React.Fragment>
    );
  }
}

TicketCreate.propTypes = {
  startLoading: PropTypes.func,
  stopLoading: PropTypes.func,
  notify: PropTypes.func,
  successAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoading()),
  stopLoading: () => dispatch(stopLoading()),
  eventsRequested: () => dispatch(eventsRequested()),
  eventTicketsRequested: eventId => dispatch(eventTicketsRequested(eventId)),
  downloadTicketsRequested: filters => dispatch(downloadTicketsRequested(filters)),
  notify: (payload, autohideDuration, snackBarActions) => dispatch(pushNotification(payload, autohideDuration, snackBarActions)),
});

export default connect(null, mapDispatchToProps)(TicketCreate);
