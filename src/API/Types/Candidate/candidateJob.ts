import SelectedCandidateStages from "Enums/selectedCandidateStages";
import WorkTypes from "Enums/workType";
import { TPagedResponse } from "../pagedResponse";
import { TPosition } from "../position";

export type TCandidateJobsResponse = {
  data: TPagedResponse<TCandidateJob>;
};

export type TCandidateJob = {
  jobId: string;
  company: {
    name: string;
    logoUri: string;
  };
  position: TPosition;
  deadlineDate?: Date;
  freelance?: WorkTypes;
  permanent?: WorkTypes;
  jobStage: string;
  startDate?: Date;
  stage: SelectedCandidateStages;
  coverLetter?: string;
};
