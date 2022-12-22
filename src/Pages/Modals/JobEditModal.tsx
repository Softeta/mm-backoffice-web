import { useJobCandidates } from "API/Calls/jobCandidates";
import { useCalibratedJob } from "API/Calls/jobs";
import Modal from "Components/UI/atoms/Modal";
import ModalLoader from "Components/UI/molecules/ModalLoader";
import CandidatesSearchFiltersProvider from "Contexts/SelectedFilters/CandidatesSearch/CandidatesSearchFiltersProvider";
import { useNavigate, useParams } from "react-router-dom";
import { RouteParams } from "Routes/routes";
import JobEdit from "Templates/Jobs/JobEdit";

const JobEditModal = () => {
  const { jobId } = useParams<RouteParams>();
  const navigate = useNavigate();
  const calibratedJob = useCalibratedJob(jobId || null);

  const jobCandidates = useJobCandidates(
    jobId && calibratedJob.data?.data.isSelectionStarted ? jobId : null
  );

  const handleClose = () => {
    navigate(-1);
  };

  const showJob =
    jobId &&
    calibratedJob.data &&
    ((calibratedJob.data.data.isSelectionStarted &&
      !jobCandidates.isLoading &&
      jobCandidates.data) ||
      !calibratedJob.data.data.isSelectionStarted);

  return showJob ? (
    <Modal disableEscapeKeyDown enableSlideAnimation open onClose={handleClose}>
      {({ onClose }: any) => (
        <div className="w-full h-100v lg:w-[85vw]">
          <CandidatesSearchFiltersProvider>
            <JobEdit
              jobData={calibratedJob?.data.data}
              jobCandidatesData={jobCandidates?.data?.data}
              jobId={jobId}
              onClose={onClose}
            />
          </CandidatesSearchFiltersProvider>
        </div>
      )}
    </Modal>
  ) : (
    <ModalLoader open />
  );
};

export default JobEditModal;
