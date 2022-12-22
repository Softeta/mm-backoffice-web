import { CandidateQueryKeys, useCandidate } from "API/Calls/candidates";
import Modal from "Components/UI/atoms/Modal";
import ModalLoader from "Components/UI/molecules/ModalLoader";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { RouteParams } from "Routes/routes";
import CandidateUpdate from "Templates/Candidates/CandidateUpdate/CandidateUpdate";

const CandidateEditModal = () => {
  const queryClient = useQueryClient();
  const { candidateId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const { data: candidate, isLoading } = useCandidate(candidateId!);
  const [needToRemoveCandidateQuery, setNeedToRemoveCandidateQuery] =
    useState(false);

  const handleClose = () => {
    navigate(-1);
    if (needToRemoveCandidateQuery) {
      queryClient.removeQueries([CandidateQueryKeys.candidate, candidateId]);
      queryClient.removeQueries(CandidateQueryKeys.candidates);
    }
  };

  return !isLoading && candidate?.data ? (
    <Modal disableEscapeKeyDown enableSlideAnimation open onClose={handleClose}>
      {({ onClose }: any) => (
        <div className="w-full h-100v lg:w-[85vw]">
          <CandidateUpdate
            candidateId={candidateId!}
            onClose={onClose}
            candidate={candidate}
            onCandidateUpdate={() => setNeedToRemoveCandidateQuery(true)}
          />
        </div>
      )}
    </Modal>
  ) : (
    <ModalLoader open />
  );
};

export default CandidateEditModal;
