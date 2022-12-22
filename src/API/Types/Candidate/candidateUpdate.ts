import { TCandidate } from "./candidateGet";
import { TFileUpdateRequest } from "../fileRequest";
import { TCandidateRequest } from "./candidateBase";

export type TCandidateUpdateRequest = TCandidateRequest & {
  activityStatus?: string;
  curriculumVitae: TFileUpdateRequest;
  video: TFileUpdateRequest;
  picture: TFileUpdateRequest;
};

export type TCandidateCreated = TCandidate;
