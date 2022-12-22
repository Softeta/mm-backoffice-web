import { useContext, useEffect, useState } from "react";
import { TCandidate } from "API/Types/Candidate/candidateGet";
import { usePendingCandidates } from "API/Calls/pendingCandidates";
import CandidateModalActiveTabContext, {
  CandidateModalActiveTab,
} from "Contexts/ActiveTabs/CandidateModalActiveTab/CandidateModalActiveTabContext";
import { CandidateModalTabSections } from "Contexts/ActiveTabs/CandidateModalActiveTab/CandidateModalTabSections";
import CandidatesList from "./CandidatesList";
import { CandidatePendingUpdate } from "./CandidatePendingUpdate";

type TPendingCandidates = {
  onClose: () => void;
};

const PendingCandidates = ({ onClose }: TPendingCandidates) => {
  const candidates = usePendingCandidates();

  const [selectedCandidateId, setSelectedCandidateId] = useState<
    string | undefined
  >();
  const { setActiveTab } = useContext<CandidateModalActiveTab>(
    CandidateModalActiveTabContext
  );

  const data = candidates?.data?.pages
    .map((page) => page.data)
    .map((row) => row.data)
    .flat();

  const findNextCandidateId = (currentId?: string) => {
    const index = data?.findIndex((candidate) => candidate.id === currentId);
    return (index || index === 0) && data && index + 1 < data.length
      ? data[index + 1].id
      : undefined;
  };

  const handleListRefetch = (updatedCandidate: TCandidate) => {
    const candidate = data?.find((item) => item.id === updatedCandidate.id);
    const nameWasChanged =
      candidate?.firstName !== updatedCandidate.firstName ||
      candidate?.lastName !== updatedCandidate.lastName;
    if (nameWasChanged) {
      candidates.refetch();
    }
  };

  const handleCandidateUpdate = (candidate?: TCandidate) => {
    if (!candidate) return;
    handleListRefetch(candidate);
  };

  const handleListChange = () => {
    setSelectedCandidateId((prevId) => findNextCandidateId(prevId));
    candidates.refetch();
  };

  useEffect(() => {
    setActiveTab(CandidateModalTabSections.Info);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCandidateId]);

  useEffect(() => {
    if (!selectedCandidateId && data && data.length > 0) {
      setSelectedCandidateId(data[0].id);
    }
    if (!data || data.length === 0) {
      setSelectedCandidateId(undefined);
    }
  }, [data, selectedCandidateId]);

  const handleCandidateSelect = (id: string) => {
    if (id !== selectedCandidateId) {
      setSelectedCandidateId(id);
    }
  };

  return (
    <div className="w-full h-100v lg:w-[85vw] flex">
      <CandidatesList
        isLoading={candidates.isLoading}
        data={data}
        fetchNextPage={candidates.fetchNextPage}
        hasNextPage={!!candidates.hasNextPage}
        onCandidateSelect={handleCandidateSelect}
        selectedCandidateId={selectedCandidateId}
        onClose={onClose}
      />
      {selectedCandidateId && (
        <CandidatePendingUpdate
          key={selectedCandidateId}
          candidateId={selectedCandidateId}
          onCandidateUpdate={handleCandidateUpdate}
          onPendingCandidatesChange={handleListChange}
        />
      )}
    </div>
  );
};

export default PendingCandidates;
