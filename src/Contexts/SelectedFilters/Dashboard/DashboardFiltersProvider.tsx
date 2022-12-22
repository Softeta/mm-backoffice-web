import {
  defaultFilters,
  TJobFilterParams,
} from "API/Types/Jobs/jobFilterParameters";
import { IProvider } from "Contexts/IProvider";
import { useMemo, useState } from "react";
import DashboardFiltersContext, { TFilters } from "./DashboardFiltersContext";

export const DashboardFiltersProvider = ({ children }: IProvider) => {
  const [params, setParams] = useState<TJobFilterParams>({ ...defaultFilters });

  const value: TFilters = useMemo(
    () => ({
      params,
      setParams,
    }),
    [params]
  );

  return (
    <DashboardFiltersContext.Provider value={value}>
      {children}
    </DashboardFiltersContext.Provider>
  );
};

export default DashboardFiltersProvider;
