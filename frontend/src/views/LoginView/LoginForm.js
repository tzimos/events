import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Button,
  withStyles,
} from "@material-ui/core";
import {
  Field,
  Form
} from "formik";
import {
  TextField
} from "formik-material-ui";
import {
  VpnKeyOutlined
} from "@material-ui/icons";
import ShowPasswordIcon from "../../components/ShowPasswordIcon";
import {formStyles} from "./styles";

class LoginForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false
    };
  }

  toggleShowPassword = () => this.setState({showPassword: !this.state.showPassword});


  render() {
    const {
      values,
      touched,
      errors,
      dirty,
      isSubmitting,
      isValid,
      handleChange,
      handleSubmit,
      classes,
      initialValues
    } = this.props;
    const fieldNames = Object.keys(initialValues);
    const {showPassword} = this.state;
    return (
      <React.Fragment>
        <Avatar className={classes.avatar}>
          <VpnKeyOutlined/>
        </Avatar>
        <Form
          onSubmit={handleSubmit}>
          {fieldNames.map(field =>
            <React.Fragment key={field}>
              <Field
                key={field}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type={((field === "password") && !showPassword) ? "password" : "text"}
                id={field}
                label={field}
                name={field}
                autoComplete={field}
                error={errors[field] && touched[field]}
                autoFocus={field === "username"}
                value={values[field]}
                onChange={handleChange}
                component={TextField}
              />
              {field === "password" &&
              <ShowPasswordIcon
                toggleShowPassword={this.toggleShowPassword}
                showPassword={showPassword}/>}
            </React.Fragment>
          )}
          <Button
            fullWidth
            type={"submit"}
            variant="contained"
            color="secondary"
            disabled={!dirty || isSubmitting || !isValid}
          >
            {"login"}
          </Button>
          <ul>
          </ul>
        </Form>
      </React.Fragment>
    )
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object,
  values: PropTypes.object,
  errors: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  touched: PropTypes.object,
  dirty: PropTypes.bool,
  isValid: PropTypes.bool,
  isSubmitting: PropTypes.bool,
};

export default withStyles(formStyles)(LoginForm);