import JobOrderBy from "Enums/jobOrderBy";
import JobStages from "Enums/JobStages";
import { useJobs } from "./jobs";

export const usePendingJobs = () => {
  const queryParams = new URLSearchParams({
    jobStages: JobStages.Pending,
    OrderBy: JobOrderBy.CreatedAtDesc,
  });

  return useJobs(queryParams);
};
