import WorkTypes from "Enums/workType";
import { TPagedResponse } from "../pagedResponse";
import { TJobEmployee } from "./Common/jobEmployee";

export type TJobsBriefResponse = {
  data: TPagedResponse<TJobBriefResponse>;
};

export type TJobBriefResponse = {
  jobId: string;
  companyName: string;
  companyLogoUri?: string;
  position: string;
  freelance?: WorkTypes;
  permanent?: WorkTypes;
  jobStage: string;
  deadlineDate?: Date;
  assignedTo?: TJobEmployee[];
  isPriority: boolean;
  createdAt: Date;
};
