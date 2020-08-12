import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  Button,
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@material-ui/core";
import {actionStyles} from "../common/eventsAndTicketsStyles";
import {
  downloadTicketsRequested,
  eventsRequested,
} from "../../state/actions";
import CreateEvent from "./CreateEvent";


class EventsActions extends React.PureComponent {
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
      eventsRequested,
      downloadTicketsRequested,
    } = this.props;
    const {
      dialogIsOpen
    } = this.state;
    return (
      <React.Fragment>
        <div className={classes.buttons}>
          <Button
            onClick={() => eventsRequested()}>
            Refresh
          </Button>
          <Button
            onClick={() => downloadTicketsRequested({status: "O"})}>
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
    );
  }
}

EventsActions.propTypes = {
  classes: PropTypes.object,
  eventsRequested: PropTypes.func,
  downloadTicketsRequested: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  eventsRequested: () => dispatch(eventsRequested()),
  downloadTicketsRequested: filters => dispatch(downloadTicketsRequested(filters)),
});

export default withStyles(actionStyles)(connect(null, mapDispatchToProps)(EventsActions));
