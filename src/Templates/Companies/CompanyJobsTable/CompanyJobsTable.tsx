import AddIcon from "@mui/icons-material/Add";
import Paper from "Components/UI/atoms/Paper";
import Divide from "Components/UI/atoms/Divide";
import { TJobBriefResponse } from "API/Types/Jobs/jobGet";
import InfiniteScroll from "react-infinite-scroll-component";
import { useTranslation } from "react-i18next";
import CenteredLoader from "Components/UI/molecules/CenteredLoader";
import { JobRow, Table, JobColumns } from "Components/UI/organisms/Table";
import Button from "Components/UI/atoms/Button";

interface ICompanyJobsTable {
  count?: number;
  data?: TJobBriefResponse[];
  fetchNextPage: () => void;
  hasNextPage?: boolean;
  isError: boolean;
  isLoading: boolean;
  onRowClick: (jobId: string) => void;
  onCreateJobClick: () => void;
}

const cols = [
  JobColumns.Position,
  JobColumns.AssignedTo,
  JobColumns.Type,
  JobColumns.JobStage,
  JobColumns.Deadline,
];
const CompanyJobsTable = ({
  count = 0,
  data = [],
  fetchNextPage,
  hasNextPage,
  isError,
  isLoading,
  onRowClick,
  onCreateJobClick,
}: ICompanyJobsTable) => {
  const { t } = useTranslation();

  return (
    <Paper>
      <div className="flex items-center justify-between">
        <p className="text-xs">{count} results found</p>
        <Button
          label="Create a job"
          onClick={onCreateJobClick}
          startIcon={<AddIcon />}
        />
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
          {data?.map((job) => (
            <JobRow
              key={job.jobId}
              job={job}
              cols={cols}
              onRowClick={onRowClick}
              t={t}
            />
          ))}
        </Table>
      </InfiniteScroll>
    </Paper>
  );
};

export default CompanyJobsTable;
