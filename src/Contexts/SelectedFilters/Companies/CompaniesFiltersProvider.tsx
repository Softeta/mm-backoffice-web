import { TCompaniesFilterParams } from "API/Types/Companies/companiesFilterParameters";
import { IProvider } from "Contexts/IProvider";
import CompanyStatus from "Enums/companyStatus";
import { useMemo, useState } from "react";
import CompaniesFiltersContext, {
  TCompaniesFilters,
} from "./CompaniesFiltersContext";

const defaultStatuses = [CompanyStatus.Approved];

export const defaultFilters = {
  Statuses: defaultStatuses,
} as TCompaniesFilterParams;

export const CompaniesFiltersProvider = ({ children }: IProvider) => {
  const [params, setParams] = useState<TCompaniesFilterParams>({
    ...defaultFilters,
  });

  const value: TCompaniesFilters = useMemo(
    () => ({
      params,
      setParams,
    }),
    [params]
  );

  return (
    <CompaniesFiltersContext.Provider value={value}>
      {children}
    </CompaniesFiltersContext.Provider>
  );
};

export default CompaniesFiltersContext;
