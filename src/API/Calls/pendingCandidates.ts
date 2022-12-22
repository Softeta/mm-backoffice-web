import { backOfficeHttpClient } from "API/clients";
import CandidateStatus from "Enums/candidateStatus";
import { useCandidates } from "./candidates";

export const usePendingCandidates = () =>
  useCandidates(new URLSearchParams({ statuses: CandidateStatus.Pending }));

export const approveCandidate = async (candidateId: string) =>
  backOfficeHttpClient.put(`/api/v1/candidates/${candidateId}/approved`);

export const rejectCandidate = async (candidateId: string) =>
  backOfficeHttpClient.put(`/api/v1/candidates/${candidateId}/rejected`);
