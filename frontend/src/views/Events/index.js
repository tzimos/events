import React from "react";
import {connect} from "react-redux"
import {Helmet} from "react-helmet";
import {config} from "../../config";
import {eventsRequested} from "../../state/actions";
import BaseTable from "../../components/Table";
import history from "../../lib/history";
import {Typography, withStyles} from "@material-ui/core";
import {styles} from "../common/eventsAndTicketsStyles";
import EventsActions from "./actions";

const columns = [
  "Name",
  "Date",
  "Initial numbers",
  "Total tickets",
  "Total tickets redeemed",
]

const cellMapping = [
  "name",
  "date",
  "initialTickets",
  "totalTickets",
  "totalRedeemedTickets",
]


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
    if (events.count === 0) return null;

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
            <BaseTable
              rowId={"id"}
              disableRowClick={false}
              onRowClick={eventPk => history.push(routePath.eventTickets, {eventPk: eventPk})}
              columns={columns}
              cellMapping={cellMapping}
              getDatasource={eventsRequested}
              attachActions={(props) => <EventsActions {...props}/>}
              messages={events}/>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  events: state.events.events,
});

const mapDispatchToProps = dispatch => ({
  eventsRequested: paginationUrl => dispatch(eventsRequested(paginationUrl)),
  eventTicketsRequested: (eventPk) => dispatch(eventTicketsRequested(eventPk))
});


export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(EventsView));
