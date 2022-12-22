import { TLocationCoordinates } from "../location";

enum CandidatesInputNames {
  Name = "Name",
  Positions = "Positions",
  Location = "Location",
  Longitude = "Longitude",
  Latitude = "Latitude",
  RadiusInKm = "RadiusInKm",
  Address = "Address",
  OpenForOpportunities = "OpenForOpportunities",
  IsFreelance = "IsFreelance",
  IsPermanent = "IsPermanent",
  Currency = "Currency",
  AvailableFrom = "AvailableFrom",
  HourlyBudgetTo = "HourlyBudgetTo",
  MonthlyBudgetTo = "MonthlyBudgetTo",
  JobId = "JobId",
  Statuses = "Statuses",
  Search = "Search",
}

export default CandidatesInputNames;

export type TCandidatesFilterParams = {
  [CandidatesInputNames.Name]?: string;
  [CandidatesInputNames.Positions]?: string[];
  [CandidatesInputNames.Location]?: TLocationCoordinates;
  [CandidatesInputNames.Longitude]?: number;
  [CandidatesInputNames.Latitude]?: number;
  [CandidatesInputNames.RadiusInKm]?: number;
  [CandidatesInputNames.OpenForOpportunities]?: boolean;
  [CandidatesInputNames.IsFreelance]?: boolean;
  [CandidatesInputNames.IsPermanent]?: boolean;
  [CandidatesInputNames.AvailableFrom]?: Date;
  [CandidatesInputNames.MonthlyBudgetTo]?: number;
  [CandidatesInputNames.HourlyBudgetTo]?: number;
  [CandidatesInputNames.Currency]?: string;
  [CandidatesInputNames.JobId]?: string;
  [CandidatesInputNames.Statuses]?: string[];
  [CandidatesInputNames.Search]?: string;
};

export type TSelectedCandidatesFilters = {
  params: TCandidatesFilterParams;
  setParams: (params: TCandidatesFilterParams) => void;
};

export type TSelectedCandidatesSearchFilters = {
  params: TCandidatesFilterParams;
  areParamsSelected: boolean;
  setParams: (params: TCandidatesFilterParams) => void;
  clearParams: () => void;
};

export type TSavedCandidatesFilters = {
  params: TCandidatesFilterParams;
  title: string;
  index: number;
};
