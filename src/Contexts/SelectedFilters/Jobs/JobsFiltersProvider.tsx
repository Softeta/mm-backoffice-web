import {
  defaultFilters,
  TJobFilterParams,
} from "API/Types/Jobs/jobFilterParameters";
import { IProvider } from "Contexts/IProvider";
import { useMemo, useState } from "react";
import JobsFiltersContext, { TFilters } from "./JobsFiltersContext";

export const JobsFiltersProvider = ({ children }: IProvider) => {
  const [params, setParams] = useState<TJobFilterParams>({ ...defaultFilters });

  const value: TFilters = useMemo(
    () => ({
      params,
      setParams,
    }),
    [params]
  );

  return (
    <JobsFiltersContext.Provider value={value}>
      {children}
    </JobsFiltersContext.Provider>
  );
};

export default JobsFiltersProvider;
