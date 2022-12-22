import { useContext, useState } from "react";
import { useCandidateJobs } from "API/Calls/candidateSelectedInJobs";
import { TCandidateJob } from "API/Types/Candidate/candidateJob";
import { useNavigate } from "react-router-dom";
import { JobModalTabSections } from "Contexts/ActiveTabs/JobModalActiveTab/JobModalTabSections";
import JobModalActiveTabContext, {
  JobModalActiveTab,
} from "Contexts/ActiveTabs/JobModalActiveTab/JobModalActiveTabContext";
import routes from "Routes/routes";
import CandidateJobsTable from "../CandidateJobsTable";
import CoverLetterModal from "../CoverLetterModal";

interface ICandidateActivity {
  candidateId: string;
}
const CandidateActivity = ({ candidateId }: ICandidateActivity) => {
  const navigate = useNavigate();
  const [coverLetterModalContent, setCoverLetterModalContent] = useState<
    string | undefined
  >();
  const { setActiveTab } = useContext<JobModalActiveTab>(
    JobModalActiveTabContext
  );
  const jobs = useCandidateJobs(candidateId);

  const jobsData: TCandidateJob[] =
    jobs.data?.pages
      .map((page) => page.data)
      .map((row) => row.data)
      .flat() || [];

  const handleRowClick = (jobId: string): void => {
    setActiveTab(JobModalTabSections.Info);
    navigate(`${routes.jobs.url}/${jobId}`);
  };

  const handleCoverLetterClick = (content?: string): void => {
    setCoverLetterModalContent(content);
  };

  const closeCoverLetter = () => {
    setCoverLetterModalContent(undefined);
  };

  return (
    <>
      <CandidateJobsTable
        count={jobs.data?.pages[0].data.count}
        data={jobsData}
        fetchNextPage={jobs.fetchNextPage}
        hasNextPage={jobs.hasNextPage}
        isError={jobs.isError}
        isLoading={jobs.isLoading}
        onRowClick={handleRowClick}
        onCoverLetterClick={handleCoverLetterClick}
      />
      <CoverLetterModal
        open={!!coverLetterModalContent}
        content={coverLetterModalContent}
        onClose={closeCoverLetter}
      />
    </>
  );
};

export default CandidateActivity;
