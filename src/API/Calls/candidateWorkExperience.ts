import { backOfficeHttpClient } from "API/clients";
import { TCandidateResponse } from "API/Types/Candidate/candidateGet";
import { TCandidateWorkExperience } from "API/Types/Candidate/Common/candidateWorkExperience";

export const createWorkExperience = async (
  candidateId: string,
  data: TCandidateWorkExperience
): Promise<TCandidateResponse> =>
  backOfficeHttpClient.post(
    `/api/v1/candidates/${candidateId}/work-experiences`,
    data
  );

export const updateWorkExperience = async (
  candidateId: string,
  workExperienceId: string,
  data: TCandidateWorkExperience
): Promise<TCandidateResponse> =>
  backOfficeHttpClient.put(
    `/api/v1/candidates/${candidateId}/work-experiences/${workExperienceId}`,
    data
  );

export const deleteWorkExperience = async (
  candidateId: string,
  workExperienceId: string
): Promise<TCandidateResponse> =>
  backOfficeHttpClient.delete(
    `/api/v1/candidates/${candidateId}/work-experiences/${workExperienceId}`
  );
