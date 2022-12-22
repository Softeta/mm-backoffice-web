import { useJobs } from "API/Calls/jobs";
import JobsTable from "Templates/Jobs/JobsTable";
import { useContext, useEffect, useState } from "react";
import JobsFiltersContext from "Contexts/SelectedFilters/Jobs/JobsFiltersContext";
import { JobColumns } from "Components/UI/organisms/Table";
import JobsFilter from "Templates/Jobs/JobsFilter";
import JobFilterInputNames, {
  defaultFilters,
  TJobSelectedFilters,
} from "API/Types/Jobs/jobFilterParameters";
import { insertActiveJobStages } from "Templates/Jobs/JobsFilter/insertActiveJobStages";
import buildSearchParams from "Templates/Jobs/JobsFilter/queryParamsBuilder";
import { Outlet, useNavigate } from "react-router-dom";
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
  JobFilterInputNames.AssignedEmployees,
];

const cols = [
  JobColumns.Company,
  JobColumns.Position,
  JobColumns.AssignedTo,
  JobColumns.Type,
  JobColumns.JobStage,
  JobColumns.Deadline,
];

const Jobs = () => {
  const { params, setParams } =
    useContext<TJobSelectedFilters>(JobsFiltersContext);
  const { setActiveTab } = useContext<JobModalActiveTab>(
    JobModalActiveTabContext
  );
  const navigate = useNavigate();
  const [queryString, setQueryString] = useState<URLSearchParams>(
    buildSearchParams(insertActiveJobStages(params))
  );

  const jobs = useJobs(queryString);

  useEffect(() => {
    jobs.refetch();
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
    jobs.refetch();
  };

  const data = jobs?.data?.pages
    .map((page) => page.data)
    .map((row) => row.data)
    .flat();

  return (
    <>
      <Outlet />
      <JobsTable
        isLoading={jobs.isLoading}
        isError={jobs.isError}
        data={data}
        fetchNextPage={jobs.fetchNextPage}
        hasNextPage={jobs.hasNextPage}
        count={jobs.data?.pages[0].data.count}
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
        onNewJobSubmit={jobs.refetch}
        title="Jobs"
        onClosePendingModal={handleClosePendingModal}
        onAssigneesChange={jobs.refetch}
      />
    </>
  );
};

export default Jobs;
