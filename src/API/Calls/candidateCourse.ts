import { backOfficeHttpClient } from "API/clients";
import { TCandidateResponse } from "API/Types/Candidate/candidateGet";
import {
  TAddCandidateCourseRequest,
  TUpdateCandidateCourseRequest,
} from "API/Types/Candidate/Common/candidateCourse";

export const createCourse = async (
  candidateId: string,
  data: TAddCandidateCourseRequest
): Promise<TCandidateResponse> =>
  backOfficeHttpClient.post(`/api/v1/candidates/${candidateId}/courses`, data);

export const updateCourse = async (
  candidateId: string,
  courseId: string,
  data: TUpdateCandidateCourseRequest
): Promise<TCandidateResponse> =>
  backOfficeHttpClient.put(
    `/api/v1/candidates/${candidateId}/courses/${courseId}`,
    data
  );

export const deleteCourse = async (
  candidateId: string,
  courseId: string
): Promise<TCandidateResponse> =>
  backOfficeHttpClient.delete(
    `/api/v1/candidates/${candidateId}/courses/${courseId}`
  );
