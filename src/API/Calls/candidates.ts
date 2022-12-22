import { useInfiniteQuery, useQuery } from "react-query";
import { backOfficeHttpClient } from "API/clients";
import { TCandidatesResponse } from "API/Types/Candidate/candidatesBriefGet";
import {
  TCandidate,
  TCandidateResponse,
} from "API/Types/Candidate/candidateGet";
import { TCandidateUpdateOpenForOpportunitiesRequest } from "API/Types/Candidate/candidateUpdateOpenForOpportunities";
import { TCandidateCreateRequest } from "API/Types/Candidate/candidateCreate";
import { TCandidateUpdateRequest } from "API/Types/Candidate/candidateUpdate";
import { TJobSuggestedCandidatesRequest } from "API/Types/Jobs/jobSuggestedCandidates";
import { TCandidateUpdateNoteRequest } from "API/Types/Candidate/candidateUpdateNote";
import { TCandidateParseCvRequest } from "API/Types/Candidate/candidateParseCv";
import { TCandidateCvResponse } from "API/Types/Candidate/candidateFromCv";
import fetchSuggestedCandidates from "./suggestedCandidates";

export enum CandidateQueryKeys {
  candidates = "candidates",
  candidate = "candidate",
  candidateUpdate = "candidateUpdate",
  suggestedCandidates = "suggestedCandidates",
  manualCandidates = "manualCandidates",
}

export const fetchCandidates = async (
  queryParams?: URLSearchParams,
  pageParam?: string
): Promise<TCandidatesResponse> => {
  const queryString = queryParams ? `?${queryParams}` : "";
  return backOfficeHttpClient.get(
    pageParam || `/api/v1/candidates${queryString}`
  );
};

export const useCandidates = (
  queryParams = new URLSearchParams(),
  enabled = true
) =>
  useInfiniteQuery(
    [CandidateQueryKeys.candidates, queryParams.get("statuses")],
    ({ pageParam }) => fetchCandidates(queryParams, pageParam),
    {
      getNextPageParam: (last) => last.data.nextPagePath || undefined,
      enabled,
    }
  );

export const createCandidate = async (
  data: TCandidateCreateRequest
): Promise<TCandidate> => backOfficeHttpClient.post("/api/v1/candidates", data);

export const fetchCandidate = async (
  candidateId: string
): Promise<TCandidateResponse> =>
  backOfficeHttpClient.get(`/api/v1/candidates/${candidateId}`);

export const useCandidate = (candidateId: string) =>
  useQuery(
    [CandidateQueryKeys.candidate, candidateId],
    () => fetchCandidate(candidateId),
    { enabled: !!candidateId }
  );

export const putCandidate = async (
  data: TCandidateUpdateRequest,
  candidateId: string
): Promise<TCandidateResponse> =>
  backOfficeHttpClient.put(`/api/v1/candidates/${candidateId}`, data);

export const updateCandidateOpenForOpportunities = async (
  data: TCandidateUpdateOpenForOpportunitiesRequest,
  candidateId: string
) =>
  backOfficeHttpClient.put(
    `/api/v1/candidates/${candidateId}/open-for-opportunities`,
    data
  );

export const updateCandidateNote = async (
  data: TCandidateUpdateNoteRequest,
  candidateId: string
) => backOfficeHttpClient.put(`/api/v1/candidates/${candidateId}/notes`, data);

export const useManualCandidates = (queryParams = new URLSearchParams()) =>
  useInfiniteQuery(
    [CandidateQueryKeys.manualCandidates, queryParams.toString()],
    ({ pageParam }) => fetchCandidates(queryParams, pageParam),
    {
      getNextPageParam: (last) => last.data.nextPagePath || undefined,
    }
  );

export const useSuggestedCandidates = (
  request?: TJobSuggestedCandidatesRequest,
  enabled = true,
  queryParams = new URLSearchParams()
) =>
  useInfiniteQuery(
    // TODO: find other solution instead of json.strigify(req) for performance
    [CandidateQueryKeys.suggestedCandidates, JSON.stringify(request)],
    ({ pageParam }) =>
      fetchSuggestedCandidates(request, queryParams, pageParam),
    {
      getNextPageParam: (last) => last.data.nextPagePath || undefined,
      enabled,
    }
  );

export const parseCurriculumVitae = async (
  data: TCandidateParseCvRequest
): Promise<TCandidateCvResponse> =>
  backOfficeHttpClient.post(`/api/v1/candidates/parsed-cv`, data);
