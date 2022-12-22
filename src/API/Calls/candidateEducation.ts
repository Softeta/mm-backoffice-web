import { backOfficeHttpClient } from "API/clients";
import { TCandidateResponse } from "API/Types/Candidate/candidateGet";
import {
  TAddCandidateEducationRequest,
  TUpdateCandidateEducationRequest,
} from "API/Types/Candidate/Common/candidateEducation";

export const createEducation = async (
  candidateId: string,
  data: TAddCandidateEducationRequest
): Promise<TCandidateResponse> =>
  backOfficeHttpClient.post(
    `/api/v1/candidates/${candidateId}/educations`,
    data
  );

export const updateEducation = async (
  candidateId: string,
  educationId: string,
  data: TUpdateCandidateEducationRequest
): Promise<TCandidateResponse> =>
  backOfficeHttpClient.put(
    `/api/v1/candidates/${candidateId}/educations/${educationId}`,
    data
  );

export const deleteEducation = async (
  candidateId: string,
  educationId: string
): Promise<TCandidateResponse> =>
  backOfficeHttpClient.delete(
    `/api/v1/candidates/${candidateId}/educations/${educationId}`
  );
