import { TCandidateTestsResponse } from "API/Types/Candidate/candidateTestsGet";
import { useQuery } from "react-query";
import { backOfficeHttpClient } from "API/clients";

export enum CandidateTestsQueryKeys {
  candidateTests = "candidate-tests",
  testsPackage = "tests-package",
}

export const fetchCandidateTests = async (
  candidateId: string
): Promise<TCandidateTestsResponse> =>
  backOfficeHttpClient.get(`/api/v1/candidate-tests/${candidateId}`);

export const forceSyncLgiTestResults = async (
  candidateId: string,
  packageInstanceId: string
): Promise<TCandidateTestsResponse> =>
  backOfficeHttpClient.post(
    `api/v1/candidate-tests/${candidateId}/logical/${packageInstanceId}/forced`
  );

export const forceSyncPapiTestResults = async (
  candidateId: string,
  packageInstanceId: string
): Promise<TCandidateTestsResponse> =>
  backOfficeHttpClient.post(
    `api/v1/candidate-tests/${candidateId}/personality/${packageInstanceId}/forced`
  );

export const deleteLgiTest = async (
  candidateId: string,
  packageInstanceId: string
): Promise<TCandidateTestsResponse> =>
  backOfficeHttpClient.delete(
    `api/v1/candidate-tests/${candidateId}/logical/${packageInstanceId}`
  );

export const deletePapiTest = async (
  candidateId: string,
  packageInstanceId: string
): Promise<TCandidateTestsResponse> =>
  backOfficeHttpClient.delete(
    `api/v1/candidate-tests/${candidateId}/personality/${packageInstanceId}`
  );

export const useCandidateTests = (
  candidateId: string,
  isQueryEnabled: boolean
) =>
  useQuery(
    [CandidateTestsQueryKeys.candidateTests, candidateId],
    () => fetchCandidateTests(candidateId),
    { enabled: isQueryEnabled }
  );
