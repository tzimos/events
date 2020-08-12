import React from "react";
import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight
} from "@material-ui/icons";


class TablePaginationActions extends React.PureComponent {

  handleBackButtonClick = event => {
    const {page, onChangePage} = this.props;
    onChangePage(event, page - 1, "previous");
  };

  handleNextButtonClick = event => {
    const {page, onChangePage} = this.props;
    onChangePage(event, page + 1, "next");
  };

  render() {
    const {
      count,
      rowsPerPage,
      page
    } = this.props;
    return (
      <React.Fragment>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page">
          <KeyboardArrowLeft/>
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          <KeyboardArrowRight/>
        </IconButton>
      </React.Fragment>
    );
  }
}

TablePaginationActions.propTypes = {
  page: PropTypes.number,
  onChangePage: PropTypes.func,
  count: PropTypes.number,
  rowsPerPage: PropTypes.number,
};

export default TablePaginationActions;
