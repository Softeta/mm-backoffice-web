import WorkTypes from "Enums/workType";
import { TIndustry } from "../industries";
import { TPosition } from "../position";
import { TSkill } from "../skills";
import { TLanguage } from "../languages";
import { TAddress } from "../address";
import { THobby } from "../hobbies";

export type TCandidateRequest = {
  email: string;
  firstName: string;
  lastName: string;
  currentPosition?: TPosition;
  birthDate?: Date;
  openForOpportunities: boolean;
  linkedInUrl?: string;
  personalWebsiteUrl?: string;
  address?: TAddress;
  currency?: string;
  startDate?: Date;
  endDate?: Date;
  weeklyWorkHours?: number;
  freelance?: {
    hourlySalary?: number;
    monthlySalary?: number;
  };
  permanent?: {
    monthlySalary?: number;
  };
  phone?: {
    countryCode?: string;
    number?: string;
  };
  yearsOfExperience?: number;
  bio?: string;
  workingHourTypes?: string[];
  industries?: TIndustry[];
  skills?: TSkill[];
  desiredSkills?: TSkill[];
  languages?: TLanguage[];
  hobbies?: THobby[];
  formats?: string[];
  workTypes: WorkTypes[];
};
