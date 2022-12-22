import { TIndustry } from "../industries";
import { TLocationCoordinates } from "../location";
import { TCompanyBrief } from "./companyBriefGet";

enum CompaniesInputNames {
  Companies = "Companies",
  Industries = "Industries",
  Location = "Location",
  Longitude = "Longitude",
  Latitude = "Latitude",
  RadiusInKm = "RadiusInKm",
  Statuses = "Statuses",
}

export default CompaniesInputNames;

export type TCompaniesFilterParams = {
  [CompaniesInputNames.Companies]?: TCompanyBrief[];
  [CompaniesInputNames.Industries]?: TIndustry[];
  [CompaniesInputNames.Location]?: TLocationCoordinates;
  [CompaniesInputNames.Longitude]?: number;
  [CompaniesInputNames.Latitude]?: number;
  [CompaniesInputNames.RadiusInKm]?: number;
  [CompaniesInputNames.Statuses]?: string[];
};

export type TSelectedCompaniesFilters = {
  params: TCompaniesFilterParams;
  setParams: (params: TCompaniesFilterParams) => void;
};
