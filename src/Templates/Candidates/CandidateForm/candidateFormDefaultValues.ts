import { TCandidateCreateRequest } from "API/Types/Candidate/candidateCreate";
import { TCandidateUpdateRequest } from "API/Types/Candidate/candidateUpdate";
import { setDefaultAttachment } from "Helpers/setDefaultAttachment";

export const defaultCreateValues: TCandidateCreateRequest = {
  email: "",
  firstName: "",
  lastName: "",
  linkedInUrl: "",
  openForOpportunities: false,
  skills: [],
  desiredSkills: [],
  industries: [],
  languages: [],
  currency: "DKK" as string,
  workingHourTypes: [],
  formats: [],
  workTypes: [],
  workExperiences: [],
  educations: [],
  courses: [],
};

export const defaultUpdateValues: TCandidateUpdateRequest = {
  email: "",
  firstName: "",
  lastName: "",
  linkedInUrl: "",
  openForOpportunities: false,
  skills: [],
  desiredSkills: [],
  industries: [],
  languages: [],
  currency: "DKK" as string,
  workingHourTypes: [],
  formats: [],
  workTypes: [],
  curriculumVitae: setDefaultAttachment(),
  video: setDefaultAttachment(),
  picture: setDefaultAttachment(),
};
