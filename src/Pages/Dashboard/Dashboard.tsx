import { useDashboardJobs } from "API/Calls/jobs";
import JobsTable from "Templates/Jobs/JobsTable";
import { useContext, useEffect, useState } from "react";
import DashboardFiltersContext from "Contexts/SelectedFilters/Dashboard/DashboardFiltersContext";
import { JobColumns } from "Components/UI/organisms/Table";
import JobFilterInputNames, {
  defaultFilters,
  TJobSelectedFilters,
} from "API/Types/Jobs/jobFilterParameters";
import JobsFilter from "Templates/Jobs/JobsFilter";
import { insertActiveJobStages } from "Templates/Jobs/JobsFilter/insertActiveJobStages";
import buildSearchParams from "Templates/Jobs/JobsFilter/queryParamsBuilder";
import { useNavigate } from "react-router-dom";
import routes from "Routes/routes";
import JobModalActiveTabContext, {
  JobModalActiveTab,
} from "Contexts/ActiveTabs/JobModalActiveTab/JobModalActiveTabContext";
import { JobModalTabSections } from "Contexts/ActiveTabs/JobModalActiveTab/JobModalTabSections";

const fields = [
  JobFilterInputNames.Companies,
  JobFilterInputNames.Positions,
  JobFilterInputNames.DeadLineDate,
  JobFilterInputNames.WorkTypes,
  JobFilterInputNames.JobStages,
  JobFilterInputNames.Location,
  JobFilterInputNames.Owner,
];

const cols = [
  JobColumns.Company,
  JobColumns.Position,
  JobColumns.Type,
  JobColumns.JobStage,
  JobColumns.Deadline,
];

const Dashboard = () => {
  const { params, setParams } = useContext<TJobSelectedFilters>(
    DashboardFiltersContext
  );
  const { setActiveTab } = useContext<JobModalActiveTab>(
    JobModalActiveTabContext
  );
  const navigate = useNavigate();
  const [queryString, setQueryString] = useState<URLSearchParams>(
    buildSearchParams(insertActiveJobStages(params))
  );

  const {
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    data: response,
    refetch,
  } = useDashboardJobs(queryString);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  const handleRowClick = (jobId: string): void => {
    setActiveTab(JobModalTabSections.Info);
    navigate(`${routes.jobs.url}/${jobId}`);
  };

  const handleApplyFilters = () => {
    setQueryString(buildSearchParams(insertActiveJobStages(params)));
  };

  const handleClearFilters = () => {
    setQueryString(buildSearchParams(insertActiveJobStages(defaultFilters)));
  };

  const handleClosePendingModal = () => {
    refetch();
  };

  const data = response?.pages
    .map((page) => page.data)
    .map((row) => row.data)
    .flat();

  return (
    <JobsTable
      isLoading={isLoading}
      isError={isError}
      data={data}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      count={response?.pages[0].data.count}
      filter={
        <JobsFilter
          params={params}
          fields={fields}
          setParams={setParams}
          onApplyFilters={handleApplyFilters}
          onClearFilter={handleClearFilters}
          activeStages
        />
      }
      cols={cols}
      onRowClick={handleRowClick}
      onNewJobSubmit={refetch}
      title="Dashboard"
      onClosePendingModal={handleClosePendingModal}
    />
  );
};

export default Dashboard;
