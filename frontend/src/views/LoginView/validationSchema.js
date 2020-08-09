import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required"),
  password: Yup.string()
    .min(6, "Password has to be longer than 6 characters!")
    .required("Password is required!")
});
