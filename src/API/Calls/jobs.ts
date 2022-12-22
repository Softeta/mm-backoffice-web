import { backOfficeHttpClient } from "API/clients";
import { TJobStageResponse } from "API/Types/Jobs/jobPublish";
import { TJobInitRequest } from "API/Types/Jobs/jobInit";
import { useQuery, useInfiniteQuery, QueryClient } from "react-query";
import {
  TShareJobViaEmailRequest,
  TShareJobViaEmailResponse,
  TShareJobViaLinkResponse,
} from "API/Types/Jobs/jobSharing";
import { TJobsBriefResponse } from "API/Types/Jobs/jobGet";
import {
  TJobCalibrationRequest,
  TJobCalibrationResponse,
} from "API/Types/Jobs/jobCalibrate";
import {
  TJobCalibrateCompanyRequest,
  TJobCalibrateCompanyResponse,
} from "API/Types/Jobs/jobCalibrateCompany";
import { TCompanyResponse } from "API/Types/Companies/companyGet";
import { TArchiveJobRequest } from "API/Types/Jobs/jobArchive";
import { TJobActivateResponse } from "API/Types/Jobs/jobActivation";
import { URLSearchParams } from "url";
import {
  TUpdateJobAssignedEmployeesRequest,
  TUpdateJobAssignedEmployeesResponse,
} from "API/Types/Jobs/jobUpdateAssignedEmployees";

export enum JobQueryKeys {
  jobs = "jobs",
  jobCalibrated = "job-calibrated",
  jobsDashboard = "jobs-dashboard",
}

export const fetchDashboard = async (
  queryString: string,
  pageParam?: string
): Promise<TJobsBriefResponse> =>
  backOfficeHttpClient.get(pageParam || `/api/v1/dashboard?${queryString}`);

export const useDashboardJobs = (queryString: URLSearchParams) =>
  useInfiniteQuery(
    JobQueryKeys.jobsDashboard,
    ({ pageParam }) => fetchDashboard(`${queryString}`, pageParam),
    {
      getNextPageParam: (last) => last.data.nextPagePath || undefined,
    }
  );

export const fetchJobs = async (
  queryString: string,
  pageParam?: string
): Promise<TJobsBriefResponse> =>
  backOfficeHttpClient.get(pageParam || `/api/v1/jobs?${queryString}`);

export const useJobs = (queryString: URLSearchParams) =>
  useInfiniteQuery<TJobsBriefResponse, string>(
    [JobQueryKeys.jobs, `${queryString}`],
    ({ pageParam }) => fetchJobs(`${queryString}`, pageParam),
    {
      getNextPageParam: (last) => last.data.nextPagePath || undefined,
    }
  );

export const fetchJobCalibrated = async (jobId: string) =>
  backOfficeHttpClient.get(`/api/v1/jobs/${jobId}`);

export const useCalibratedJob = (jobId: string | null) =>
  useQuery<TJobCalibrationResponse, string>(
    [JobQueryKeys.jobCalibrated, jobId],
    () => fetchJobCalibrated(jobId!),
    { enabled: !!jobId }
  );

export const putJobCalibrated = async (
  data: TJobCalibrationRequest,
  jobId: string
): Promise<TJobCalibrationResponse> =>
  backOfficeHttpClient.put(`/api/v1/jobs/${jobId}`, data);

export const putJobCalibratedCompany = async (
  data: TJobCalibrateCompanyRequest,
  jobId: string
): Promise<TJobCalibrateCompanyResponse> =>
  backOfficeHttpClient.put(`/api/v1/jobs/${jobId}/company`, data);

export const putSharingViaEmail = async (
  formData: TShareJobViaEmailRequest,
  jobId: string
): Promise<TShareJobViaEmailResponse> =>
  backOfficeHttpClient.put(`/api/v1/jobs/${jobId}/shared-email`, formData);

export const putSharingViaLink = async (
  jobId: string
): Promise<TShareJobViaLinkResponse> =>
  backOfficeHttpClient.put(`/api/v1/jobs/${jobId}/shared-link`, null);

export const publishJob = async (jobId: string): Promise<void> =>
  backOfficeHttpClient.put(`/api/v1/jobs/${jobId}/published`);

export const startSearchAndSelection = async (
  jobId: string,
  queryClient: QueryClient
): Promise<TJobStageResponse> => {
  queryClient.removeQueries([JobQueryKeys.jobCalibrated, jobId]);
  return backOfficeHttpClient.put(
    `/api/v1/jobs/${jobId}/search-selection-started`
  );
};

export const createJob = async (
  formData: TJobInitRequest
): Promise<TCompanyResponse> =>
  backOfficeHttpClient.post(`/api/v1/jobs`, formData);

export const archiveJob = async (
  request: TArchiveJobRequest,
  jobId: string
): Promise<void> =>
  backOfficeHttpClient.patch(`/api/v1/jobs/${jobId}/archived`, request);

export const activateJob = async (
  jobId: string
): Promise<TJobActivateResponse> =>
  backOfficeHttpClient.patch(`/api/v1/jobs/${jobId}/activated`);

export const approveJob = async (
  jobId: string
): Promise<TJobActivateResponse> =>
  backOfficeHttpClient.patch(`/api/v1/jobs/${jobId}/approved`);

export const rejectJob = async (jobId: string): Promise<TJobActivateResponse> =>
  backOfficeHttpClient.delete(`/api/v1/jobs/${jobId}/rejected`);

export const updateJobAssignedEmployees = async (
  data: TUpdateJobAssignedEmployeesRequest,
  jobId: string
): Promise<TUpdateJobAssignedEmployeesResponse> =>
  backOfficeHttpClient.put(`/api/v1/jobs/${jobId}/assigned-employees`, data);
