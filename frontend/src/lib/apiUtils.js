import {hasProperty} from "./checkProperty";
import {strings} from "../strings";

export const handleApiErrors = (notify, data, setErrors, fieldNames) => {
  if (hasProperty(data, "detail")) {
    notify({
      status: "error",
      message: data.detail
    });
  }
  if (hasProperty(data, "nonFieldErrors")) {
    notify({
      status: "error",
      message: data.nonFieldErrors[0]
    });
  }
  let errors = {};
  if (fieldNames) {
    fieldNames.forEach(field => {
      if (hasProperty(data, field)) {
        errors[field] = data[field][0];
      }
    });
  }
  if (Object.keys(errors).length > 0 && setErrors) {
    setErrors(errors);
  }
};

export const handleUnexpectedError = (notify) => {
  notify({
    status: "error",
    message: strings.unexpectedError
  });
}