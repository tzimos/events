import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import {config} from "../../config";
import {
  eventTicketsLoaded,
  eventTicketsRequested
} from "../../state/actions";
import BaseTable from "../../components/Table";
import {
  Typography,
  withStyles
} from "@material-ui/core";
import {styles} from "../common/eventsAndTicketsStyles";
import EventTicketsActions from "./actions";
import RedeemCell from "./redeemCell";

const columns = [
  "id",
  "Status",
  "Event name",
  "Redeem Ticket",
];

const cellMapping = [
  "id",
  "status",
  "event.name",
  RedeemCell,
];


class EventTicketsView extends React.PureComponent {

  UNSAFE_componentWillMount() {
    const {eventPk} = this.props.history.location.state;
    this.props.eventTicketsRequested(null, eventPk);
  }

  componentWillUnmount() {
    this.props.eventTicketsLoaded({});
  }

  render() {
    const {pageTitle} = config;
    const {
      classes,
      eventTickets,
      eventTicketsRequested,
    } = this.props;
    if (eventTickets.count === 0 || eventTickets.count === undefined) return null;

    return (
      <React.Fragment>
        <Helmet title={pageTitle.eventTickets}/>
        <div className={classes.pageWrapper}>
          <Typography
            className={classes.title}
            variant={"h3"}>
            Tickets for event: {eventTickets.results[0].event.name}
          </Typography>
          <div className={classes.tableWrapper}>
            <BaseTable
              attachActions={(props) => <EventTicketsActions {...props}/>}
              disableRowClick
              rowId={"id"}
              columns={columns}
              cellMapping={cellMapping}
              getDatasource={eventTicketsRequested}
              messages={eventTickets}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
EventTicketsView.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  eventTickets: PropTypes.object,
  eventTicketsRequested: PropTypes.func,
  eventTicketsLoaded: PropTypes.func,
};

const mapStateToProps = state => ({
  eventTickets: state.eventTickets.eventTickets,
});

const mapDispatchToProps = dispatch => ({
  eventTicketsRequested: (paginationUrl, eventPk) => dispatch(eventTicketsRequested(eventPk, paginationUrl)),
  eventTicketsLoaded: eventTickets => dispatch(eventTicketsLoaded(eventTickets)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EventTicketsView));
