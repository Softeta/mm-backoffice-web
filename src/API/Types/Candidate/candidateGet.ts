import CandidateStatus from "Enums/candidateStatus";
import WorkFormats from "Enums/workFormats";
import WorkingHoursType from "Enums/workingHoursType";
import WorkTypes from "Enums/workType";
import { TFileResponse } from "../fileResponse";
import { THobby } from "../hobbies";
import { TIndustry } from "../industries";
import { TLanguage } from "../languages";
import { TSkill } from "../skills";
import { TCandidateBrief } from "./candidatesBriefGet";
import { TCandidateCourseResponse } from "./Common/candidateCourse";
import { TCandidateEducationResponse } from "./Common/candidateEducation";
import { TCandidatePhone } from "./Common/candidatePhone";
import { TCandidateWorkExperience } from "./Common/candidateWorkExperience";
import { LegalInformationAgreement } from "./Common/legalInformationAgreement";

export type TCandidateResponse = {
  data: TCandidate;
};

export type TCandidate = TCandidateBrief & {
  status: CandidateStatus;
  isEmailVerified: boolean;
  phone?: TCandidatePhone;
  personalWebsiteUrl?: string;
  birthDate?: Date;
  weeklyWorkHours?: number;
  activityStatus?: string;
  formats?: WorkFormats[];
  workTypes?: WorkTypes[];
  workingHourTypes?: WorkingHoursType[];
  skills: TSkill[];
  desiredSkills?: TSkill[];
  yearsOfExperience?: number;
  industries: TIndustry[];
  languages?: TLanguage[];
  hobbies?: THobby[];
  systemLanguage?: string;
  termsAndConditions?: LegalInformationAgreement;
  marketingAcknowledgement?: LegalInformationAgreement;
  candidateCourses: TCandidateCourseResponse[];
  candidateEducations: TCandidateEducationResponse[];
  candidateWorkExperiences: TCandidateWorkExperience[];
  bio?: string;
  curriculumVitae?: TFileResponse;
  video?: TFileResponse;
};
