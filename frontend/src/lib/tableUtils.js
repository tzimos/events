import React from "react";
import {formatDate} from "./formatting";

export const getTableCell = (row, cell, props) => {
  if (typeof cell == "string") {
    let parts = cell.split(".");
    if (parts.length === 1) {
      if (cell === "date") {
        return formatDate(row[cell]);
      }
      return row[cell];
    } else {
      return row[parts[0]][parts[1]];
    }
  }
  return React.createElement(cell, props, null);
};
