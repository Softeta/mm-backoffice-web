import ArchivedCandidateStages from "Enums/archivedCandidateStages";

export type TArchiveCandidateStageRequest = {
  stage: ArchivedCandidateStages;
  candidateIds: string[];
};

export type TActivateCandidatesRequest = {
  candidateIds: string[];
};
