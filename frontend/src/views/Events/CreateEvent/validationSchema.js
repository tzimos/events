import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .test("len", "Must be less or equal than 100 characters", val => val && val.length <= 100)
    .required("Username is required"),
  date: Yup.string(),
  initialTickets: Yup.number().test("positive", "You must provide a positice number ", val => val > 0)
});

