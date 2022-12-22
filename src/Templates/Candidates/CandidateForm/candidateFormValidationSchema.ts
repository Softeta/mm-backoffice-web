import * as yup from "yup";

const candidateValidationSchema = yup.object().shape(
  {
    workTypes: yup.array().min(1).required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().when("linkedInUrl", {
      is: (linkedIn: string) => !linkedIn,
      then: yup.string().email().required(),
      otherwise: yup.string().email(),
    }),
    linkedInUrl: yup.string().when("email", {
      is: (email: string) => !email,
      then: yup.string().required(),
      otherwise: yup.string(),
    }),
  },
  [["email", "linkedInUrl"]]
);

export default candidateValidationSchema;
