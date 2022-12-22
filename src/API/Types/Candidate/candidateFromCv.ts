import { TAddress } from "../address";
import { TLanguage } from "../languages";
import { TPosition } from "../position";
import { TSkill } from "../skills";
import { TCandidateCourseResponse } from "./Common/candidateCourse";
import { TCandidateEducationResponse } from "./Common/candidateEducation";
import { TCandidateWorkExperience } from "./Common/candidateWorkExperience";

export type TCandidateCvResponse = {
  data: TCvCandidate;
};

export type TCvCandidate = {
  fullName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  linkedInUrl?: string;
  currentPosition?: TPosition;
  address?: TAddress;
  phoneNumber?: string;
  skills: TSkill[];
  languages?: TLanguage[];
  candidateCourses: TCandidateCourseResponse[];
  candidateEducations: TCandidateEducationResponse[];
  candidateWorkExperiences: TCandidateWorkExperience[];
};
