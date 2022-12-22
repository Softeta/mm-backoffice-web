import { TFileResponse } from "API/Types/fileResponse";
import { TFileAddRequest } from "API/Types/fileRequest";
import { TFileUpdateRequest } from "API/Types/fileRequest";

type TCandidateCourseBase = {
  name: string;
  issuingOrganization: string;
  description?: string;
};

export type TAddCandidateCourseRequest = TCandidateCourseBase & {
  id?: string;
  certificate?: TFileAddRequest;
};

export type TUpdateCandidateCourseRequest = TCandidateCourseBase & {
  id?: string;
  certificate?: TFileUpdateRequest;
};

export type TCandidateCourseResponse = TCandidateCourseBase & {
  id: string;
  certificate?: TFileResponse;
};

export type TCandidateCourseForm = TUpdateCandidateCourseRequest;
