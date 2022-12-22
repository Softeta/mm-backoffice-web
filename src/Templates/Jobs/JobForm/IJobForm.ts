import { TIndustry } from "API/Types/industries";
import { TPosition } from "API/Types/position";
import { TJobFreelance } from "API/Types/Jobs/Common/jobFreelance";
import { TJobPermanent } from "API/Types/Jobs/Common/jobPermanent";
import { TSkill } from "API/Types/skills";
import { TJobEmployee } from "API/Types/Jobs/Common/jobEmployee";
import { TBackOfficeUser } from "API/Types/backOfficeUsers";
import { TLanguage } from "API/Types/languages";
import { TJobYearExperience } from "API/Types/Jobs/Common/jobYearExperience";
import { TJobInterestedCandidate } from "API/Types/Jobs/Common/jobInterestedCandidate";

export default interface IJobForm {
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
  isUrgent: boolean;
  workingHourTypes: string[];
  workTypes: string[];
  assignedEmployees: TJobEmployee[] | TBackOfficeUser[];
  skills: TSkill[];
  industries: TIndustry[];
  seniorities: string[];
  languages: TLanguage[];
  formats: string[];
  interestedCandidates: TJobInterestedCandidate[];
  interestedLinkedIns: string[];
  isPriority: boolean;
}
