import JobOrderBy from "Enums/jobOrderBy";
import WorkType from "Enums/workType";
import { TLocationCoordinates } from "../location";

enum JobFilterInputNames {
  Companies = "Companies",
  Positions = "Positions",
  DeadLineDate = "DeadLineDate",
  JobStages = "JobStages",
  Location = "Location",
  Longitude = "Longitude",
  Latitude = "Latitude",
  RadiusInKm = "RadiusInKm",
  Owner = "Owner",
  AssignedEmployees = "AssignedEmployees",
  WorkTypes = "WorkTypes",
  Search = "Search",
  OrderBy = "OrderBy",
}

export default JobFilterInputNames;

export type TJobFilterParams = {
  [JobFilterInputNames.Companies]?: string[];
  [JobFilterInputNames.Positions]?: string[];
  [JobFilterInputNames.DeadLineDate]?: Date;
  [JobFilterInputNames.WorkTypes]?: string[];
  [JobFilterInputNames.Location]?: TLocationCoordinates;
  [JobFilterInputNames.Longitude]?: number;
  [JobFilterInputNames.Latitude]?: number;
  [JobFilterInputNames.RadiusInKm]?: number;
  [JobFilterInputNames.JobStages]?: string[];
  [JobFilterInputNames.Owner]?: string;
  [JobFilterInputNames.AssignedEmployees]?: string[];
  [JobFilterInputNames.Search]?: string;
  [JobFilterInputNames.OrderBy]?: string;
};

export type TJobSelectedFilters = {
  params: TJobFilterParams;
  setParams: (params: TJobFilterParams) => void;
};

export const defaultFilters = {
  WorkTypes: [WorkType.Freelance, WorkType.Permanent],
  Search: undefined,
  OrderBy: JobOrderBy.IsPriorityDesc,
} as TJobFilterParams;
