import React from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableRow,
  TableHead,
  TablePagination,
} from "@material-ui/core";
import TablePaginationActions from "./tablePaginationActions";
import {getTableCell} from "../../lib/tableUtils";

const rowsPerPageOptions = [10, 20, 30]

class BaseTable extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      rowsPerPage: rowsPerPageOptions[0],
    }
  }

  handleChangeRowsPerPage = e => this.setState({rowsPerPage: e.target.value})
  handleChangePage = (e, newPage, action) => {
    const {
      getDatasource,
      messages
    } = this.props;
    const paginationUrl = action === "previous" ? messages.previous : messages.next;
    getDatasource(paginationUrl);
    this.setState(state => {
      return {...state, currentPage: newPage}
    });
  }

  handleClick = (e, rowId) => {
    const {
      onRowClick,
      disableRowClick
    } = this.props;
    if (disableRowClick) {
      return;
    }
    if (typeof onRowClick === "function") {
      onRowClick(rowId)
    }
  }

  render() {
    const {
      messages,
      columns,
      cellMapping,
      rowId,
      attachActions,
    } = this.props;
    const {
      results,
      count,
    } = messages;
    const {
      currentPage,
      rowsPerPage,
    } = this.state;
    return (
      <React.Fragment>
        <TableContainer component={Paper}>
          <Table
            size={"small"}>
            <TableHead>
              <TableRow>
                {columns.map(columnName => (
                  <TableCell key={columnName}>{columnName}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((row, rowIndex) => (
                <TableRow
                  hover
                  onClick={(event) => this.handleClick(event, row[rowId])}
                  key={row[rowId]}>
                  {cellMapping.map((cell, index) => (
                    <TableCell
                      key={index}
                      scope="row">
                      {getTableCell(row, cell, {...this.props, row})}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={1}
                  rowsPerPageOptions={rowsPerPageOptions}
                  count={count}
                  rowsPerPage={rowsPerPage}
                  page={currentPage}
                  SelectProps={{
                    inputProps: {"aria-label": "rows per page"},
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}/>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
        <div>
          {attachActions && attachActions({...this.props, ...this.state})}
        </div>
      </React.Fragment>
    )
  }
}

BaseTable.propTypes = {
  messages: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  cellMapping: PropTypes.array.isRequired,
  rowId: PropTypes.string.isRequired,
  attachActions: PropTypes.func,
};

export default BaseTable;