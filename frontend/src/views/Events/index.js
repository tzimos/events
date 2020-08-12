import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";
import {config} from "../../config";
import {eventsRequested, eventTicketsRequested} from "../../state/actions";
import BaseTable from "../../components/Table";
import history from "../../lib/history";
import {Typography, withStyles} from "@material-ui/core";
import {styles} from "../common/eventsAndTicketsStyles";
import EventsActions from "./actions";
import CreateEvent from "./CreateEvent";

const columns = [
  "Name",
  "Date",
  "Initial numbers",
  "Total tickets",
  "Total tickets redeemed",
];

const cellMapping = [
  "name",
  "date",
  "initialTickets",
  "totalTickets",
  "totalRedeemedTickets",
];


class EventsView extends React.PureComponent {

  UNSAFE_componentWillMount() {
    this.props.eventsRequested();
  }

  render() {
    const {
      pageTitle,
      routePath
    } = config;
    const {
      events,
      eventsRequested,
      classes,
    } = this.props;

    return (
      <React.Fragment>
        <Helmet title={pageTitle.events}/>
        <div className={classes.pageWrapper}>
          <Typography
            className={classes.title}
            variant={"h3"}>
            Events
          </Typography>
          <div className={classes.tableWrapper}>
            {events.count === 0 ?
              <div className={classes.createEventWrapper}>
                <CreateEvent successAction={() => {}}/>
              </div>
              : <BaseTable
                rowId={"id"}
                disableRowClick={false}
                onRowClick={eventPk => history.push(routePath.eventTickets, {eventPk: eventPk})}
                columns={columns}
                cellMapping={cellMapping}
                getDatasource={eventsRequested}
                attachActions={(props) => <EventsActions {...props}/>}
                messages={events}/>}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

EventsView.propTypes = {
  classes: PropTypes.object,
  events: PropTypes.object,
  eventsRequested: PropTypes.func,
  eventTicketsRequested: PropTypes.func,

};

const mapStateToProps = state => ({
  events: state.events.events,
});

const mapDispatchToProps = dispatch => ({
  eventsRequested: paginationUrl => dispatch(eventsRequested(paginationUrl)),
  eventTicketsRequested: (eventPk) => dispatch(eventTicketsRequested(eventPk))
});


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EventsView));
