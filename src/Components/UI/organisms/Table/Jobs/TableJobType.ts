import { TJobBriefResponse } from "API/Types/Jobs/jobGet";
import SelectedCandidateStages from "Enums/selectedCandidateStages";

export type TTableJob = Omit<TJobBriefResponse, "createdAt"> & {
  startDate?: Date;
  candidateStage?: SelectedCandidateStages;
  coverLetter?: string;
};
