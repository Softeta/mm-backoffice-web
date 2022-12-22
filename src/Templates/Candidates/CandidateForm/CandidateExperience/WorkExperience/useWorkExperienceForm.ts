import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TCandidateWorkExperience } from "API/Types/Candidate/Common/candidateWorkExperience";
import WorkExperienceType from "Enums/workExperienceType";

export enum InputNames {
  companyName = "companyName",
  position = "position",
  from = "from",
  to = "to",
  isCurrentJob = "isCurrentJob",
  skills = "skills",
  jobDescription = "jobDescription",
}

const validationSchema = yup.object().shape(
  {
    companyName: yup.string().required(),
    position: yup.object().required(),
    from: yup.date().required(),
    jobDescription: yup.string().nullable().max(150),
    to: yup.date().when("isCurrentJob", {
      is: (isCurrentJob: boolean) => !isCurrentJob,
      then: yup.date().required(),
      otherwise: yup.date(),
    }),
    isCurrentJob: yup.bool().when("to", {
      is: (to: Date) => !to,
      then: yup.bool().isTrue(),
      otherwise: yup.bool(),
    }),
  },
  [["to", "isCurrentJob"]]
);

export const defaultValues: Partial<TCandidateWorkExperience> = {
  type: WorkExperienceType.Job,
  companyName: "",
  skills: [],
  isCurrentJob: false,
};

export const useWorkExperienceForm = () =>
  useForm<TCandidateWorkExperience>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
