import React from "react";
import {connect} from "react-redux";
import {Button, withStyles} from "@material-ui/core";
import history from "../../lib/history";
import {actionStyles} from "../common/eventsAndTicketsStyles";
import {config} from "../../config";
import {
  pushNotification,
} from "../../state/actions";


class EventTicketsActions extends React.PureComponent {

  render() {
    const {
      classes,
    } = this.props;
    const {routePath} = config;
    return (
      <div className={classes.buttons}>
        <Button
          onClick={() => history.push(routePath.events)}>
          Back to Events
        </Button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  notify: payload => dispatch(pushNotification(payload)),
});
export default withStyles(actionStyles)(connect(null, mapDispatchToProps)(EventTicketsActions));
