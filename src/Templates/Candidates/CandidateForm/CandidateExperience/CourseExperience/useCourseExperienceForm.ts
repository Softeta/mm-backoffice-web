import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TCandidateCourseForm } from "API/Types/Candidate/Common/candidateCourse";

export enum InputNames {
  name = "name",
  issuingOrganization = "issuingOrganization",
  description = "description",
  certificateCacheId = "certificate.cacheId",
  certificateHasChanged = "certificate.hasChanged",
}

const validationSchema = yup.object({
  name: yup.string().required(),
  issuingOrganization: yup.string().required(),
  description: yup.string().max(150).nullable(),
});

export const defaultValues: Partial<TCandidateCourseForm> = {
  name: "",
  issuingOrganization: "",
  certificate: {
    hasChanged: false,
  },
};

export const useCourseExperienceForm = () =>
  useForm<TCandidateCourseForm>({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });
