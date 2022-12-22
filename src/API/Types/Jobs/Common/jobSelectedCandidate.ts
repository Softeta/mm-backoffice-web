import SelectedCandidateStages from "Enums/selectedCandidateStages";
import { TJobCandidate } from "./jobCandidate";

export type TJobSelectedCandidate = TJobCandidate & {
  stage: SelectedCandidateStages;
  ranking: number;
  isShortListed: boolean;
  isShortListedInOtherJob: boolean;
  isHired: boolean;
  isHiredInOtherJob: boolean;
};
