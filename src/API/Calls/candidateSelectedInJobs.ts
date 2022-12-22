import { backOfficeHttpClient } from "API/clients";
import { TCandidateJobsResponse } from "API/Types/Candidate/candidateJob";
import { useInfiniteQuery } from "react-query";

export enum CandidateJobsQueryKeys {
  candidateJobs = "candidateJobs",
}
export const fetchCandidateJobs = async (
  candidateId: string,
  pageParam?: string
): Promise<TCandidateJobsResponse> =>
  backOfficeHttpClient.get(
    pageParam || `/api/v1/candidates/${candidateId}/selected-jobs`
  );

export const useCandidateJobs = (candidateId?: string) =>
  useInfiniteQuery<TCandidateJobsResponse>(
    [CandidateJobsQueryKeys.candidateJobs, candidateId],
    ({ pageParam }) => fetchCandidateJobs(candidateId!, pageParam),
    { enabled: !!candidateId }
  );
