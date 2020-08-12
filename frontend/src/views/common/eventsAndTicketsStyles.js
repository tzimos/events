export const styles = theme => ({
  pageWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {},
  createEventWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5em"
  },
  tableWrapper: {
    width: "90%",
    marginTop: theme.spacing(4),
  },
});

export const actionStyles = theme => ({
  buttons: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
    "& > *": {
      marginRight: theme.spacing(4)
    }
  }
});
