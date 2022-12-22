import { backOfficeHttpClient } from "API/clients";
import {
  TJobCandidateFilterRequest,
  TJobCandidateFilterResponse,
  TJobCandidateFiltersResponse,
  TJobCandidateFilterTitleRequest,
} from "API/Types/Jobs/jobCandidateFilter";

export const getJobCandidatesFilters = async (
  jobId: string
): Promise<TJobCandidateFiltersResponse> =>
  backOfficeHttpClient.get(`api/v1/job-candidates/filters/${jobId}`);

export const saveJobCandidatesFilter = async (
  request: TJobCandidateFilterRequest,
  jobId: string
): Promise<TJobCandidateFilterResponse> =>
  backOfficeHttpClient.post(`api/v1/job-candidates/filters/${jobId}`, request);

export const deleteJobCandidatesFilter = async (
  jobId: string,
  index: number
): Promise<void> =>
  backOfficeHttpClient.delete(
    `api/v1/job-candidates/filters/${jobId}/${index}`
  );

export const updateTitleJobCandidatesFilter = async (
  jobId: string,
  index: number,
  request: TJobCandidateFilterTitleRequest
): Promise<TJobCandidateFilterResponse> =>
  backOfficeHttpClient.patch(
    `api/v1/job-candidates/filters/${jobId}/${index}`,
    request
  );
