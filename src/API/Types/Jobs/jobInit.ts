import { TJobCompanyRequest } from "./Common/jobCompanyRequest";
import { TJobFreelance } from "./Common/jobFreelance";
import { TJobPermanent } from "./Common/jobPermanent";
import { TPosition } from "../position";
import { TIndustry } from "../industries";
import { TSkill } from "../skills";
import { TLanguage } from "../languages";
import { TJobYearExperience } from "./Common/jobYearExperience";

export type TJobInitRequest = {
  company: TJobCompanyRequest;
  ownerId: string;
  position: TPosition;
  deadLineDate?: Date;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  currency?: string;
  weeklyWorkHours?: number;
  freelance?: TJobFreelance;
  permanent?: TJobPermanent;
  yearExperience?: TJobYearExperience;
  isPriority: boolean;
  isUrgent: boolean;
  workingHourTypes: string[];
  workTypes: string[];
  assignedEmployees: string[];
  skills: TSkill[];
  industries: TIndustry[];
  seniorities: string[];
  languages: TLanguage[];
  formats: string[];
  interestedCandidates: string[];
  interestedLinkedIns: string[];
};

export type TJobInitResponse = {
  jobId: string;
};
