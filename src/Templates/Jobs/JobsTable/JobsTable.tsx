import { ReactNode, MouseEvent, KeyboardEvent, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SectionHeading from "Components/UI/atoms/SectionHeading";
import Sidebar from "Components/Sidebar";
import Paper from "Components/UI/atoms/Paper";
import Divide from "Components/UI/atoms/Divide";
import Button from "Components/UI/atoms/Button";
import CompanySelection from "Templates/Companies/CompanySelection";
import JobInitialization from "Templates/Jobs/JobInitialization";
import { TJobBriefResponse } from "API/Types/Jobs/jobGet";
import { TJobCompanyContactPersonResponse } from "API/Types/Jobs/Common/jobCompanyContactPersonResponse";
import { TCompanyContactPerson } from "API/Types/Companies/common/companyContactPerson";
import { TCompanySearch } from "API/Types/Companies/companySearchGet";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import CenteredLoader from "Components/UI/molecules/CenteredLoader";
import { JobRow, Table, JobColumns } from "Components/UI/organisms/Table";
import ColorType from "Components/Enums/colorType";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ModalSlide from "Components/UI/molecules/ModalSlide";
import PendingJobs from "../PendingJobs";
import JobAssigneeModal from "../JobAssigneeModal";

interface IJobsTable {
  cols: JobColumns[];
  count?: number;
  data?: TJobBriefResponse[];
  fetchNextPage: () => void;
  filter?: ReactNode;
  hasNextPage?: boolean;
  isError: boolean;
  isLoading: boolean;
  onNewJobSubmit: () => void;
  onRowClick?: (jobId: string) => void;
  title: string;
  onClosePendingModal: () => void;
  onAssigneesChange?: () => void;
}

interface ISelectedJobCompany {
  company: TCompanySearch;
  contact: TJobCompanyContactPersonResponse;
}

const JobsTable = (props: IJobsTable) => {
  const {
    cols,
    count,
    data,
    fetchNextPage,
    filter,
    hasNextPage,
    isError,
    isLoading,
    onNewJobSubmit,
    onRowClick,
    title,
    onClosePendingModal,
    onAssigneesChange,
  } = props;
  const { t } = useTranslation();
  const [showCopanySelection, setShowCopanySelection] = useState(false);
  const [showJobCreationModal, setShowJobCreationModal] = useState(true);
  const [showPendingJobsModal, setShowPendingJobsModal] = useState(false);
  const [assigneeModalAnchor, setAssigneeModalAnchor] = useState<
    HTMLDivElement | undefined
  >();
  const [selectedCompany, setSelectedCompany] = useState<ISelectedJobCompany>();
  const [selectedJob, setSelectedJob] = useState<
    TJobBriefResponse | undefined
  >();
  const [key, setKey] = useState<number>(1);

  const handleModalToggle = (show: boolean) => {
    setShowCopanySelection(show);
    setKey(key + 1);
  };

  const handleAssigneeClick = (
    event: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>,
    job: TJobBriefResponse
  ) => {
    setAssigneeModalAnchor(event.currentTarget);
    event.stopPropagation();
    setSelectedJob(job);
  };

  const handleCompanySelected = (
    company: TCompanySearch,
    contact: TCompanyContactPerson
  ) => {
    setSelectedCompany({
      company,
      contact: {
        ...contact,
        isMainContact: true,
      },
    });
    handleModalToggle(false);
    setShowJobCreationModal(true);
  };

  const handleJobInitializationSubmit = () => {
    setShowJobCreationModal(false);
    onNewJobSubmit();
  };

  const handleClosePendingModal = () => {
    setShowPendingJobsModal(false);
    onClosePendingModal();
  };

  const handleCloseAssigneesModal = () => {
    setAssigneeModalAnchor(undefined);
    setSelectedJob(undefined);
  };

  const handleAssigneesChange = () => {
    onAssigneesChange?.();
  };

  return (
    <div className="grid grid-cols-[252px_1fr] gap-8">
      <Sidebar>{filter}</Sidebar>
      <div className="pr-7">
        <SectionHeading
          title={title}
          button={
            <div>
              <Button
                className="mr-5"
                label="Pending jobs"
                onClick={() => setShowPendingJobsModal(true)}
                variant={ButtonVariantType.Text}
                color={ColorType.Info}
              />

              <Button
                label="Create a job"
                onClick={() => handleModalToggle(true)}
                startIcon={<AddIcon />}
              />
            </div>
          }
        />
        <CompanySelection
          key={key}
          isModalOpen={showCopanySelection}
          onSetOpenModal={setShowCopanySelection}
          onCompanySelect={handleCompanySelected}
        />
        <Paper>
          <p className="text-xs">{count} results found</p>
          <Divide />
          <InfiniteScroll
            className="overflow-hidden"
            dataLength={data?.length || 0}
            next={() => fetchNextPage()}
            hasMore={!!hasNextPage}
            loader={<CenteredLoader />}
          >
            <Table isLoading={isLoading} isError={isError} cols={cols}>
              {data?.map((job) => (
                <JobRow
                  key={job.jobId}
                  job={job}
                  cols={cols}
                  onRowClick={onRowClick}
                  onAssigneeClick={
                    cols.includes(JobColumns.AssignedTo)
                      ? (e) => handleAssigneeClick(e, job)
                      : undefined
                  }
                  t={t}
                  selected={selectedJob?.jobId === job.jobId}
                />
              ))}
            </Table>
          </InfiniteScroll>
        </Paper>
      </div>
      {selectedCompany && (
        <JobInitialization
          key={`jobInit-${key}`}
          open={showJobCreationModal}
          onClose={() => setShowJobCreationModal(false)}
          onSubmit={handleJobInitializationSubmit}
          selectedCompany={selectedCompany}
        />
      )}
      <ModalSlide open={showPendingJobsModal}>
        <PendingJobs onClose={handleClosePendingModal} />
      </ModalSlide>
      {selectedJob && assigneeModalAnchor && (
        <JobAssigneeModal
          job={selectedJob}
          anchorEl={assigneeModalAnchor}
          open
          onClose={handleCloseAssigneesModal}
          onSubmitSuccess={handleAssigneesChange}
        />
      )}
    </div>
  );
};

export default JobsTable;
