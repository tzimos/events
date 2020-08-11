import React from "react";
import {
  Field,
  Form
} from "formik";
import {
  TextField
} from "formik-material-ui";
import {KeyboardDateTimePicker} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import {withStyles} from "@material-ui/core";
import {formStyles} from "./styles";


class CreateEventForm extends React.PureComponent {

  handleDateTimeChange = value => {
    const {
      setFieldValue,
      setFieldTouched
    } = this.props;
    setFieldTouched("date", true);
    setFieldValue("date", value);
  }

  render() {
    const {
      classes,
      values,
      touched,
      errors,
      handleChange,
      handleSubmit,
      isValid,
    } = this.props;
    return (
      <React.Fragment>
        <Form
          onSubmit={handleSubmit}>
          <Field
            key={"name"}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type={"text"}
            id={"name"}
            label={"name"}
            name={"name"}
            error={errors["name"] && touched["name"]}
            autoFocus
            value={values["name"]}
            onChange={handleChange}
            component={TextField}
          />
          <br/>
          <Field
            key={"initialTickets"}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type={"number"}
            id={"initialTickets"}
            label={"initial Tickets"}
            name={"initialTickets"}
            error={errors["initialTickets"] && touched["initialTickets"]}
            autoFocus
            value={values["initialTickets"]}
            onChange={handleChange}
            component={TextField}
          />
          <br/>
          <KeyboardDateTimePicker
            id="date-picker-dialog"
            label="date"
            inputVariant="outlined"
            format="yyyy-MM-dd hh:mm:ss"
            clearable
            required
            helperText={errors["date"]}
            validationError={errors["date"]}
            error={errors["date"] && touched["date"]}
            name={"date"}
            inputValue={values.date}
            onChange={(e, value) => this.handleDateTimeChange(value)}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
          <div className={classes.buttons}>
            <Button
              disabled={!isValid}
              type={"submit"}>
              Submit
            </Button>
          </div>
        </Form>
      </React.Fragment>
    )
  }
}

export default withStyles(formStyles)(CreateEventForm);
