import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  Button,
  Dialog, DialogContent,
  DialogTitle,
  Typography,
  withStyles
} from "@material-ui/core";
import history from "../../lib/history";
import {
  actionStyles
} from "../common/eventsAndTicketsStyles";
import {config} from "../../config";
import {
  pushNotification,
} from "../../state/actions";
import TicketCreate from "./TicketCreate";


class EventTicketsActions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dialogIsOpen: false
    };
  }

  handleOpenDialog = () => this.setState({dialogIsOpen: true})
  handleCloseDialog = () => this.setState({dialogIsOpen: false})

  render() {
    const {
      classes,
      messages,
    } = this.props;
    const eventId = messages && messages.results[0].event.id;
    const {
      dialogIsOpen
    } = this.state;
    const {routePath} = config;
    return (
      <React.Fragment>
        <div className={classes.buttons}>
          <Button
            onClick={() => history.push(routePath.events)}>
            Back to Events
          </Button>
          <Button onClick={() => this.handleOpenDialog()}>
            Create tickets
          </Button>
        </div>
        <Dialog
          open={dialogIsOpen}
          onClose={this.handleCloseDialog}>
          <DialogTitle>
            <Typography variant={"h3"}>
              Tickets creation
            </Typography>
          </DialogTitle>
          <DialogContent>
            <TicketCreate
              eventId={eventId}
              successAction={this.handleCloseDialog}/>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

EventTicketsActions.propTypes = {
  classes: PropTypes.object,
  messages: PropTypes.object,
  notify: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  notify: payload => dispatch(pushNotification(payload)),
});
export default withStyles(actionStyles)(connect(null, mapDispatchToProps)(EventTicketsActions));
