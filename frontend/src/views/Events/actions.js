import React from "react";
import {connect} from "react-redux";
import {
  Button,
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent, Typography,
} from "@material-ui/core";
import {actionStyles} from "../common/eventsAndTicketsStyles";
import {
  downloadNonRedeemedTicketsRequested,
  eventsRequested,
  pushNotification,
  startLoading,
  stopLoading,
} from "../../state/actions";
import CreateEvent from "./CreateEvent";


class EventsActions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dialogIsOpen: false
    }
  }

  handleOpenDialog = () => this.setState({dialogIsOpen: true})
  handleCloseDialog = () => this.setState({dialogIsOpen: false})

  render() {
    const {
      classes,
    } = this.props;
    const {
      dialogIsOpen
    } = this.state;
    return (
      <React.Fragment>
        <div className={classes.buttons}>
          <Button
            onClick={() => this.props.eventsRequested()}>
            Refresh
          </Button>
          <Button
            onClick={() => this.props.downloadNonRedeemedTicketsRequested()}>
            Download non redeemed Tickets
          </Button>
          <Button
            onClick={this.handleOpenDialog}>
            Create Event
          </Button>
        </div>
        <Dialog
          open={dialogIsOpen}
          onClose={this.handleCloseDialog}
        >
          <DialogTitle>
            <Typography variant={"h3"}>
              Create Event.
            </Typography>
          </DialogTitle>
          <DialogContent>
            <CreateEvent successAction={this.handleCloseDialog}/>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startLoading: () => dispatch(startLoading()),
  stopLoading: () => dispatch(stopLoading()),
  eventsRequested: () => dispatch(eventsRequested()),
  notify: payload => dispatch(pushNotification(payload)),
  downloadNonRedeemedTicketsRequested: () => dispatch(downloadNonRedeemedTicketsRequested()),
});

export default withStyles(actionStyles)(connect(null, mapDispatchToProps)(EventsActions));
