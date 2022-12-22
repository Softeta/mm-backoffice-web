import Paper from "Components/UI/atoms/Paper";
import Divide from "Components/UI/atoms/Divide";
import InfiniteScroll from "react-infinite-scroll-component";
import CenteredLoader from "Components/UI/molecules/CenteredLoader";
import { JobRow, Table, JobColumns } from "Components/UI/organisms/Table";
import { TCandidateJob } from "API/Types/Candidate/candidateJob";
import { TTableJob } from "Components/UI/organisms/Table/Jobs/TableJobType";
import { useTranslation } from "react-i18next";

interface ICandidateJobsTable {
  count?: number;
  data?: TCandidateJob[];
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isError: boolean;
  isLoading: boolean;
  onRowClick: (jobId: string) => void;
  onCoverLetterClick?: (content?: string) => void;
}

const cols = [
  JobColumns.Company,
  JobColumns.Position,
  JobColumns.Type,
  JobColumns.JobStage,
  JobColumns.Deadline,
  JobColumns.CandidateStage,
  JobColumns.StartDate,
  JobColumns.CoverLetter,
];

const candidateJobToTableJob = (job: TCandidateJob): TTableJob => ({
  jobId: job.jobId,
  companyName: job.company.name,
  companyLogoUri: job.company.logoUri,
  position: job.position.code,
  freelance: job.freelance,
  permanent: job.permanent,
  jobStage: job.jobStage,
  deadlineDate: job.deadlineDate,
  isPriority: false,
  startDate: job.startDate,
  candidateStage: job.stage,
  coverLetter: job.coverLetter,
});
const CandidateJobsTable = ({
  count = 0,
  data = [],
  fetchNextPage,
  hasNextPage,
  isError,
  isLoading,
  onRowClick,
  onCoverLetterClick,
}: ICandidateJobsTable) => {
  const { t } = useTranslation();

  return (
    <Paper>
      <h3 className="font-semibold pb-4">Jobs</h3>
      <div className="flex items-center justify-between">
        <p className="text-xs">{count} results found</p>
      </div>

      <Divide />
      <InfiniteScroll
        className="overflow-hidden"
        dataLength={data?.length || 0}
        next={() => fetchNextPage()}
        hasMore={!!hasNextPage}
        loader={<CenteredLoader />}
      >
        <Table isLoading={isLoading} isError={isError} cols={cols}>
          {data?.map((job: TCandidateJob) => (
            <JobRow
              key={job.jobId}
              job={candidateJobToTableJob(job)}
              cols={cols}
              onRowClick={onRowClick}
              onCoverLetterClick={onCoverLetterClick}
              t={t}
            />
          ))}
        </Table>
      </InfiniteScroll>
    </Paper>
  );
};

export default CandidateJobsTable;
