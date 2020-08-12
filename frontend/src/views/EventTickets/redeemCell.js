import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Icon from "@material-ui/core/Icon";
import DoneIcon from "@material-ui/icons/Done";
import {
  eventTicketRedeemingRequested
} from "../../state/actions";

class RedeemCell extends React.PureComponent {
  onIconCLick = () => {
    const {row, eventTicketRedeemingRequested} = this.props;
    eventTicketRedeemingRequested(row.id);
  }

  render() {
    const {
      row,
    } = this.props;
    return (
      <React.Fragment>
        {row.status === "OK"
          ? <Icon onClick={this.onIconCLick}>add_circle</Icon>
          : <DoneIcon/>
        }
      </React.Fragment>
    );
  }
}


RedeemCell.propTypes = {
  row: PropTypes.object.isRequired,
  eventTicketRedeemingRequested: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  eventTicketRedeemingRequested: ticketId => dispatch(eventTicketRedeemingRequested(ticketId)),
});

export default connect(null, mapDispatchToProps)(RedeemCell);
