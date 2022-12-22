import { CandidateQueryKeys, useCandidate } from "API/Calls/candidates";
import { TCandidate } from "API/Types/Candidate/candidateGet";
import { useQueryClient } from "react-query";
import CandidateUpdate from "../CandidateUpdate/CandidateUpdate";

type TCandidatePendingUodate = {
  candidateId: string;
  onCandidateUpdate: (data: TCandidate) => void;
  onPendingCandidatesChange?: () => void;
};

export const CandidatePendingUpdate = ({
  candidateId,
  onCandidateUpdate,
  onPendingCandidatesChange,
}: TCandidatePendingUodate) => {
  const queryClient = useQueryClient();
  const { data: candidate, isLoading } = useCandidate(candidateId);

  const handleCandidateUpdate = (data: TCandidate) => {
    queryClient.removeQueries([CandidateQueryKeys.candidate, candidateId]);
    onCandidateUpdate(data);
  };

  return (
    <CandidateUpdate
      key={candidateId}
      candidateId={candidateId}
      candidate={candidate}
      isLoading={isLoading}
      onCandidateUpdate={handleCandidateUpdate}
      onPendingCandidatesChange={onPendingCandidatesChange}
      pending
    />
  );
};
