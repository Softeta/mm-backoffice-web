import { useContext, useEffect, useState } from "react";
import Button from "Components/UI/atoms/Button";
import SectionHeading from "Components/UI/atoms/SectionHeading";
import Sidebar from "Components/Sidebar";
import AddIcon from "@mui/icons-material/Add";
import { CandidateQueryKeys, useCandidates } from "API/Calls/candidates";
import CandidatesTable from "Templates/Candidates/CandidatesTable";
import Modal from "Components/UI/atoms/Modal";
import CandidatesFilter from "Templates/Candidates/CandidatesFilter";
import queryParamsBuilder from "Templates/Candidates/CandidatesFilter/queryParamsBuilder";
import CandidatesFiltersContext, {
  defaultFilters,
} from "Contexts/SelectedFilters/Candidates/CandidatesFiltersProvider";
import { TSelectedCandidatesFilters } from "API/Types/Candidate/candidatesFilterParameters";
import CandidateCreate from "Templates/Candidates/CandidateCreate";
import { useQueryClient } from "react-query";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ColorType from "Components/Enums/colorType";
import PendingCandidates from "Templates/Candidates/PendingCandidates/PendingCandidates";
import { Outlet, useNavigate } from "react-router-dom";
import routes from "Routes/routes";
import CandidateModalActiveTabContext, {
  CandidateModalActiveTab,
} from "Contexts/ActiveTabs/CandidateModalActiveTab/CandidateModalActiveTabContext";
import { CandidateModalTabSections } from "Contexts/ActiveTabs/CandidateModalActiveTab/CandidateModalTabSections";

enum ModalEnum {
  Create,
  Update,
  Pending,
}

const Candidates = () => {
  const { params, setParams } = useContext<TSelectedCandidatesFilters>(
    CandidatesFiltersContext
  );
  const { setActiveTab } = useContext<CandidateModalActiveTab>(
    CandidateModalActiveTabContext
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [modal, setModal] = useState<ModalEnum | undefined>();
  const [updatedCandidateId, setUpdatedCandidateId] = useState<string>();
  const [queryString, setQueryString] = useState<URLSearchParams>(
    queryParamsBuilder(params)
  );

  const candidates = useCandidates(queryString);

  const showCreateModal = modal === ModalEnum.Create;
  const showPendingModal = modal === ModalEnum.Pending;

  useEffect(() => {
    candidates.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  const handleApplyFilters = () => {
    setQueryString(queryParamsBuilder(params));
  };

  const handleClearFilters = () => {
    setQueryString(queryParamsBuilder(defaultFilters));
  };

  const handleRowClick = (candidateId: string) => {
    setActiveTab(CandidateModalTabSections.Info);
    navigate(`${routes.candidates.url}/${candidateId}`);
  };

  const handleCandidateRefetch = () => {
    if (!updatedCandidateId) return;
    queryClient.removeQueries([
      CandidateQueryKeys.candidate,
      updatedCandidateId,
    ]);
    setUpdatedCandidateId(undefined);
  };

  const handleCloseModal = () => {
    setModal(undefined);
    handleCandidateRefetch();
    candidates.refetch();
  };

  const data = candidates?.data?.pages
    .map((page) => page.data)
    .map((row) => row.data)
    .flat();

  return (
    <>
      <Outlet />
      <div className="grid grid-cols-[252px_1fr] gap-8">
        <Sidebar>
          <CandidatesFilter
            params={params}
            setParams={setParams}
            clearParams={() => setParams(defaultFilters)}
            onApplyFilters={handleApplyFilters}
            onClearFilter={handleClearFilters}
          />
        </Sidebar>
        <div className="pr-7">
          <SectionHeading
            title="Candidates"
            button={
              <div>
                <Button
                  className="mr-5"
                  label="Pending candidates"
                  onClick={() => setModal(ModalEnum.Pending)}
                  variant={ButtonVariantType.Text}
                  color={ColorType.Info}
                />
                <Button
                  label="Create a candidate"
                  onClick={() => setModal(ModalEnum.Create)}
                  startIcon={<AddIcon />}
                />
              </div>
            }
          />
          <CandidatesTable
            isLoading={candidates.isLoading}
            isError={candidates.isError}
            data={data}
            fetchNextPage={candidates.fetchNextPage}
            hasNextPage={candidates.hasNextPage}
            count={candidates.data?.pages[0].data.count}
            onRowClick={handleRowClick}
          />
        </div>
        <Modal
          open={modal !== undefined}
          disableEscapeKeyDown
          enableSlideAnimation
          onClose={handleCloseModal}
        >
          {(props: { onClose: () => void }) => {
            if (showCreateModal) {
              return <CandidateCreate onClose={props.onClose} />;
            }
            if (showPendingModal) {
              return <PendingCandidates onClose={props.onClose} />;
            }
            return null;
          }}
        </Modal>
      </div>
    </>
  );
};

export default Candidates;
