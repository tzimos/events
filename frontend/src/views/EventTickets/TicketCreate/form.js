import React from "react";
import {
  Field,
  Form
} from "formik";
import {TextField} from "formik-material-ui";
import {splitAndCapitalize} from "../../../lib/formatting";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core";
import {styles} from "./styles";

class TicketCreateForm extends React.PureComponent {
  render() {
    const {
      classes,
      values,
      touched,
      errors,
      handleChange,
      handleSubmit,
      isValid,
      initialValues,
    } = this.props;
    const fieldNames = Object.keys(initialValues);
    return (
      <React.Fragment>
        <Form onSubmit={handleSubmit}>
          {fieldNames.map(field =>
            <Field
              key={field}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              type={field === "numOfTickets" ? "number" : "hidden"}
              id={field}
              label={field === "numOfTickets" && splitAndCapitalize(field)}
              name={field}
              helperText={errors[field]}
              validationError={errors[field]}
              error={errors[field] && touched[field]}
              autoFocus
              value={values[field]}
              onChange={handleChange}
              component={TextField}
            />)}
          <div className={classes.buttons}>
            <Button
              disabled={!isValid}
              type={"submit"}>
              Submit
            </Button>
          </div>
        </Form>
      </React.Fragment>
    );
  }

}

export default withStyles(styles)(TicketCreateForm);
