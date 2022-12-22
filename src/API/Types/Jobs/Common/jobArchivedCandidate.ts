import ArchivedCandidateStages from "Enums/archivedCandidateStages";
import { TJobCandidate } from "./jobCandidate";

export type TJobArchivedCandidate = TJobCandidate & {
  stage: ArchivedCandidateStages;
};
