import JobFilterInputNames, {
  TJobFilterParams,
} from "API/Types/Jobs/jobFilterParameters";
import JobStages from "Enums/JobStages";

export const activeJobStages = [
  JobStages.Calibration,
  JobStages.CandidateSelection,
  JobStages.Successful,
  JobStages.Lost,
  JobStages.OnHold,
  JobStages.ShortListed,
];

export const insertActiveJobStages = (
  filterParams: TJobFilterParams
): TJobFilterParams =>
  filterParams.JobStages && filterParams.JobStages.length > 0
    ? filterParams
    : { ...filterParams, [JobFilterInputNames.JobStages]: activeJobStages };
