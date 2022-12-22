import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TCandidateCreateRequest } from "API/Types/Candidate/candidateCreate";
import { defaultCreateValues } from "./candidateFormDefaultValues";
import candidateValidationSchema from "./candidateFormValidationSchema";

type TAttachedFile = {
  attachedPictureUrl?: string;
};

type TCandidateCreateForm = TCandidateCreateRequest & TAttachedFile;

export const useCandidateCreateForm = () =>
  useForm({
    defaultValues: { ...defaultCreateValues } as TCandidateCreateForm,
    resolver: yupResolver(candidateValidationSchema),
    mode: "onChange",
  });
