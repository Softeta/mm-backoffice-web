import { TJobFilterParams } from "API/Types/Jobs/jobFilterParameters";
import { createContext } from "react";

export type TFilters = {
  params: TJobFilterParams;
  setParams: (params: TJobFilterParams) => void;
};

const JobsFiltersContext = createContext<TFilters>({
  params: {} as TJobFilterParams,
  setParams: () => {},
});

export default JobsFiltersContext;
