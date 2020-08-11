import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  numOfTickets: Yup.number().test("positive", "You must provide a positice number ", val => val > 0)
});

