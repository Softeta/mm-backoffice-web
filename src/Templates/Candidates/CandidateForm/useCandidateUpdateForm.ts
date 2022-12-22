import { TCandidate } from "API/Types/Candidate/candidateGet";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TCandidateWorkExperience } from "API/Types/Candidate/Common/candidateWorkExperience";
import { TCandidateUpdateRequest } from "API/Types/Candidate/candidateUpdate";
import { TCandidateEducationResponse } from "API/Types/Candidate/Common/candidateEducation";
import { TCandidateCourseResponse } from "API/Types/Candidate/Common/candidateCourse";
import { TFileResponse } from "API/Types/fileResponse";
import { TFileUpdateRequest } from "API/Types/fileRequest";
import candidateValidationSchema from "./candidateFormValidationSchema";
import { defaultUpdateValues } from "./candidateFormDefaultValues";

type TExperiences = {
  educations: TCandidateEducationResponse[];
  courses: TCandidateCourseResponse[];
  workExperiences: TCandidateWorkExperience[];
};

type TAttachedFile = {
  attachedVideo?: TFileResponse;
  attachedCurriculumVitae?: TFileResponse;
  attachedPicture?: TFileResponse;
};

export type TCandidateUpdateForm = TCandidateUpdateRequest &
  TExperiences &
  TAttachedFile;

const onlyDefinedProps = (
  props: TCandidateUpdateForm
): Partial<TCandidateUpdateForm> =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.fromEntries(Object.entries(props).filter(([_, v]) => v));

export const candidateToInputs = (
  candidate: TCandidate
): Partial<TCandidateUpdateForm> => ({
  ...onlyDefinedProps({
    email: candidate.email || "",
    firstName: candidate.firstName || "",
    lastName: candidate.lastName || "",
    currentPosition: candidate.currentPosition,
    birthDate: candidate.birthDate,
    openForOpportunities: candidate.openForOpportunities,
    linkedInUrl: candidate.linkedInUrl,
    personalWebsiteUrl: candidate.personalWebsiteUrl,
    hobbies: candidate.hobbies,
    address: candidate.address,
    currency: candidate.currency,
    startDate: candidate.startDate,
    endDate: candidate.endDate,
    weeklyWorkHours: candidate.weeklyWorkHours,
    freelance: candidate.freelance,
    permanent: candidate.permanent,
    phone: candidate.phone,
    yearsOfExperience: candidate.yearsOfExperience,
    workingHourTypes: candidate.workingHourTypes,
    industries: candidate.industries,
    skills: candidate.skills,
    desiredSkills: candidate.desiredSkills,
    languages: candidate.languages,
    formats: candidate.formats,
    workTypes: candidate.workTypes ?? defaultUpdateValues.workTypes,
    courses: candidate.candidateCourses,
    educations: candidate.candidateEducations,
    workExperiences: candidate.candidateWorkExperiences,
    attachedVideo: candidate.video,
    attachedCurriculumVitae: candidate.curriculumVitae,
    attachedPicture: candidate.picture,
    bio: candidate.bio,
    curriculumVitae: {
      hasChanged: false,
      cacheId: undefined,
    } as TFileUpdateRequest,
    video: {
      hasChanged: false,
      cacheId: undefined,
    } as TFileUpdateRequest,
    picture: {
      hasChanged: false,
      cacheId: undefined,
    } as TFileUpdateRequest,
  }),
});

export const useCandidateUpdateForm = () =>
  useForm({
    defaultValues: { ...defaultUpdateValues } as TCandidateUpdateForm,
    resolver: yupResolver(candidateValidationSchema),
    mode: "onChange",
  });
