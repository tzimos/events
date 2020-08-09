import React from "react";
import PropTypes from "prop-types";

function SnackBarMessage(props) {
  return (
    <h1>{props.message}</h1>
  );
}

SnackBarMessage.propTypes = {
  message: PropTypes.string
};

export default SnackBarMessage;
