import { TJobSelectedCandidate } from "./Common/jobSelectedCandidate";
import { TJobArchivedCandidate } from "./Common/jobArchivedCandidate";
import JobStages from "Enums/JobStages";

export type TJobCandidatesResponse = {
  data: TJobCandidates;
};

export type TJobCandidates = {
  stage: JobStages;
  shortListActivatedAt?: Date;
  selectedCandidates: TJobSelectedCandidate[];
  archivedCandidates: TJobArchivedCandidate[];
};
