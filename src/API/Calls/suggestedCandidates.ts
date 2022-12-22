import { backOfficeHttpClient } from "API/clients";
import { TCandidatesResponse } from "API/Types/Candidate/candidatesBriefGet";
import { TJobSuggestedCandidatesRequest } from "API/Types/Jobs/jobSuggestedCandidates";

const fetchSuggestedCandidates = async (
  request?: TJobSuggestedCandidatesRequest,
  queryParams?: URLSearchParams,
  pageParam?: string
): Promise<TCandidatesResponse> => {
  const queryString = queryParams ? `?${queryParams}` : "";
  return backOfficeHttpClient.post(
    pageParam || `/api/v1/jobs/suggested-candidates${queryString}`,
    request
  );
};

export default fetchSuggestedCandidates;
