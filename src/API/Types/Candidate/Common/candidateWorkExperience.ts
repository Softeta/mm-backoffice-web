import { TPosition } from "API/Types/position";
import { TSkill } from "API/Types/skills";
import WorkExperienceType from "Enums/workExperienceType";

export type TCandidateWorkExperience = {
  id?: string;
  type: WorkExperienceType;
  companyName?: string;
  position?: TPosition;
  from: Date;
  to?: Date;
  jobDescription?: string;
  isCurrentJob: boolean;
  skills: TSkill[];
};
