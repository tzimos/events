export const toUnderScore = (obj) => {
  if (obj === undefined || obj === null) {
    return;
  }
  return Object.keys(obj).reduce((o, key) =>
      Object.assign(o, {[_.snakeCase(key)]: obj[key]}),
    {}
  );
};
