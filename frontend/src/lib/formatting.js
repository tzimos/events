import _ from "lodash";
import moment from "moment";

export const toUnderScore = (obj) => {
  if (obj === undefined || obj === null) {
    return;
  }
  return Object.keys(obj).reduce((o, key) =>
      Object.assign(o, {[_.snakeCase(key)]: obj[key]}),
    {}
  );
};

export const formatDate = dateString => {
  const parsedDate = moment(dateString);
  return parsedDate.format("YYYY/MM/DD HH:mm:ss")
}