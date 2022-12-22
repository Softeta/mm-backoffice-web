import { TFileAddRequest } from "API/Types/fileRequest";
import { TFileUpdateRequest } from "API/Types/fileRequest";
import { TFileResponse } from "API/Types/fileResponse";

export type TCandidateEducationBase = {
  schoolName: string;
  degree: string;
  fieldOfStudy: string;
  from: Date;
  to?: Date;
  studiesDescription?: string;
  isStillStudying: boolean;
};

export type TAddCandidateEducationRequest = TCandidateEducationBase & {
  id?: string;
  certificate?: TFileAddRequest;
};

export type TUpdateCandidateEducationRequest = TCandidateEducationBase & {
  id?: string;
  certificate?: TFileUpdateRequest;
};

export type TCandidateEducationResponse = TCandidateEducationBase & {
  id: string;
  certificate?: TFileResponse;
};

export type TCandidateEducationForm = TUpdateCandidateEducationRequest;
