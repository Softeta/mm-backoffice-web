import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TCandidateEducationForm } from "API/Types/Candidate/Common/candidateEducation";

export enum InputNames {
  schoolName = "schoolName",
  degree = "degree",
  from = "from",
  to = "to",
  studiesDescription = "studiesDescription",
  certificateHasChanged = "certificate.hasChanged",
  certificateCacheId = "certificate.cacheId",
  isStillStudying = "isStillStudying",
  fieldOfStudy = "fieldOfStudy",
}

const validationSchema = yup.object().shape(
  {
    schoolName: yup.string().required(),
    degree: yup.string().required(),
    from: yup.date().required(),
    fieldOfStudy: yup.string().required(),
    studiesDescription: yup.string().max(150).nullable(),
    to: yup.date().when("isStillStudying", {
      is: (isCurrentJob: boolean) => !isCurrentJob,
      then: yup.date().required(),
      otherwise: yup.date(),
    }),
    isStillStudying: yup.bool().when("to", {
      is: (to: Date) => !to,
      then: yup.bool().isTrue(),
      otherwise: yup.bool(),
    }),
  },
  [["to", "isStillStudying"]]
);

export const defaultValues: Partial<TCandidateEducationForm> = {
  isStillStudying: false,
  certificate: {
    hasChanged: false,
  },
};

export const useEducationExperienceForm = () =>
  useForm<TCandidateEducationForm>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
