import SelectedCandidateStages from "Enums/selectedCandidateStages";

export type TUpdateCandidateStageRequest = {
  stage: SelectedCandidateStages;
  candidateIds: string[];
};
