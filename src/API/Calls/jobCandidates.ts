import { backOfficeHttpClient } from "API/clients";
import { useQuery } from "react-query";
import { TJobCandidatesResponse } from "API/Types/Jobs/jobCandidatesGet";
import { TJobSelectedCandidatesRequest } from "API/Types/Jobs/jobSelectedCandidates";
import { TUpdateCandidateStageRequest } from "API/Types/Jobs/jobUpdateCandidateStage";
import {
  TActivateCandidatesRequest,
  TArchiveCandidateStageRequest,
} from "API/Types/Jobs/jobArchiveCandidateStage";
import { TSendCandidatesShortListRequest } from "API/Types/Jobs/jobSendShortlist";
import { TUpdateCandidatesRankingRequest } from "API/Types/Jobs/jobUpdateCandidatesRanking";
import { TCandidateUpdateBriefRequest } from "API/Types/Candidate/candidateUpdateBrief";
import { TJobInviteSelectedCandidatesRequest } from "API/Types/Jobs/jobInviteSelectedCandidatesRequest";

export enum JobCandidatesQueryKeys {
  jobCandidates = "job-candidates",
}

export const fetchJobCandidates = async (jobId: string) =>
  backOfficeHttpClient.get(`/api/v1/job-candidates/${jobId}`);

export const useJobCandidates = (jobId: string | null) =>
  useQuery<TJobCandidatesResponse, string>(
    [JobCandidatesQueryKeys.jobCandidates, jobId],
    () => fetchJobCandidates(jobId!),
    { enabled: !!jobId }
  );

export const addSelectedCandidates = async (
  jobId: string,
  data: TJobSelectedCandidatesRequest
): Promise<TJobCandidatesResponse> =>
  backOfficeHttpClient.post(
    `/api/v1/job-candidates/${jobId}/selected-candidates`,
    data
  );

export const updateSelectedCandidatesStage = async (
  jobId: string,
  data: TUpdateCandidateStageRequest
): Promise<TJobCandidatesResponse> =>
  backOfficeHttpClient.put(
    `/api/v1/job-candidates/${jobId}/selected-candidates`,
    data
  );

export const updateSelectedCandidatesRanking = async (
  jobId: string,
  data: TUpdateCandidatesRankingRequest
): Promise<TJobCandidatesResponse> =>
  backOfficeHttpClient.put(
    `/api/v1/job-candidates/${jobId}/selected-candidates/ranking`,
    data
  );

export const updateCandidateBrief = async (
  jobId: string,
  candidateId: string,
  data: TCandidateUpdateBriefRequest
) =>
  backOfficeHttpClient.put(
    `/api/v1/job-candidates/${jobId}/candidates/${candidateId}/brief`,
    data
  );

export const archiveCandidates = async (
  jobId: string,
  data: TArchiveCandidateStageRequest
): Promise<TJobCandidatesResponse> =>
  backOfficeHttpClient.post(
    `/api/v1/job-candidates/${jobId}/archived-candidates`,
    data
  );

export const activateCandidates = async (
  jobId: string,
  data: TActivateCandidatesRequest
): Promise<TJobCandidatesResponse> =>
  backOfficeHttpClient.post(
    `/api/v1/job-candidates/${jobId}/archived-candidates/activated`,
    data
  );

export const activateCandidatesShortList = async (
  jobId: string,
  via: "email" | "link",
  data?: TSendCandidatesShortListRequest
): Promise<TJobCandidatesResponse> =>
  backOfficeHttpClient.patch(
    `/api/v1/job-candidates/${jobId}/activated-shortlist-${via}`,
    data
  );

export const inviteSelectedCandidates = async (
  jobId: string,
  candidateIds: TJobInviteSelectedCandidatesRequest,
  via: "email" | "link"
): Promise<TJobCandidatesResponse> =>
  backOfficeHttpClient.put(
    `/api/v1/job-candidates/${jobId}/selected-candidates/invited-${via}`,
    candidateIds
  );
