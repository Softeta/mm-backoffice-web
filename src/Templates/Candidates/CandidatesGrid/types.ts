import { TJobArchivedCandidate } from "API/Types/Jobs/Common/jobArchivedCandidate";
import { TJobSelectedCandidate } from "API/Types/Jobs/Common/jobSelectedCandidate";

export type TGridElement = {
  selected: boolean;
};
export type TCandidateInteractive = (
  | TJobSelectedCandidate
  | TJobArchivedCandidate
) &
  TGridElement;
