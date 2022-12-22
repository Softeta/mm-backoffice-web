import { TCompaniesFilterParams } from "API/Types/Companies/companiesFilterParameters";
import { createContext } from "react";

export type TCompaniesFilters = {
  params: TCompaniesFilterParams;
  setParams: (params: TCompaniesFilterParams) => void;
};

const CompaniesFiltersContext = createContext<TCompaniesFilters>({
  params: {} as TCompaniesFilterParams,
  setParams: () => ({} as TCompaniesFilterParams),
});

export default CompaniesFiltersContext;
