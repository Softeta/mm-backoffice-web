import { JobQueryKeys, useCalibratedJob } from "API/Calls/jobs";
import { usePendingJobs } from "API/Calls/pendingJobs";
import CenteredLoader from "Components/UI/molecules/CenteredLoader";
import JobModalActiveTabContext, {
  JobModalActiveTab,
} from "Contexts/ActiveTabs/JobModalActiveTab/JobModalActiveTabContext";
import { JobModalTabSections } from "Contexts/ActiveTabs/JobModalActiveTab/JobModalTabSections";
import { useContext, useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import JobEdit from "../JobEdit";
import JobsList from "./JobsList";

type TPendingJobs = {
  onClose: () => void;
};

const PendingJobs = ({ onClose }: TPendingJobs) => {
  const queryClient = useQueryClient();
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const { setActiveTab } = useContext<JobModalActiveTab>(
    JobModalActiveTabContext
  );
  const jobs = usePendingJobs();
  const job = useCalibratedJob(selectedJobId);

  const data = jobs?.data?.pages
    .map((page) => page.data)
    .map((row) => row.data)
    .flat();

  const findNextJobId = (currentId?: string) => {
    const index = data?.findIndex((j) => j.jobId === currentId);
    return (index || index === 0) && data && index + 1 < data.length
      ? data[index + 1].jobId
      : null;
  };

  const handleJobSelect = (id: string) => {
    if (id !== selectedJobId) {
      setSelectedJobId(id);
    }
  };

  const handleListChange = () => {
    if (selectedJobId) {
      setSelectedJobId((prevId) => findNextJobId(prevId ?? undefined));
    }
    jobs.refetch();
  };

  const handleClose = () => {
    queryClient.removeQueries(JobQueryKeys.jobs);
    onClose();
  };

  useEffect(() => {
    setActiveTab(JobModalTabSections.Info);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedJobId]);

  useEffect(() => {
    if (!selectedJobId && data && data.length > 0) {
      setSelectedJobId(data[0].jobId);
    }
    if ((!data || data.length === 0) && selectedJobId) {
      setSelectedJobId(null);
    }
  }, [data, selectedJobId]);

  return (
    <div className="flex h-full">
      <JobsList
        isLoading={jobs.isLoading}
        data={data}
        fetchNextPage={jobs.fetchNextPage}
        hasNextPage={!!jobs.hasNextPage}
        onJobSelect={handleJobSelect}
        selectedJobId={selectedJobId}
        onClose={handleClose}
      />
      <div className="w-full">
        {!job.isFetching && job.data?.data && selectedJobId && (
          <JobEdit
            jobData={job.data.data}
            jobId={selectedJobId}
            onPendingJobsChange={handleListChange}
            hideClose
          />
        )}
        {job.isFetching && !job?.data?.data && <CenteredLoader delay={500} />}
      </div>
    </div>
  );
};

export default PendingJobs;
