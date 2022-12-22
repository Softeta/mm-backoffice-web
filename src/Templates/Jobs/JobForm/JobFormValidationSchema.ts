import * as yup from "yup";

export const jobFormValidationSchema = yup.object({
  position: yup.object().required(),
  workTypes: yup.array().min(1).required(),
  ownerId: yup.string().required(),
});

export default jobFormValidationSchema;
