import { TJobFilterParams } from "API/Types/Jobs/jobFilterParameters";
import { createContext } from "react";

export type TFilters = {
  params: TJobFilterParams;
  setParams: (params: TJobFilterParams) => void;
};

const DashboardFiltersContext = createContext<TFilters>({
  params: {} as TJobFilterParams,
  setParams: () => {},
});

export default DashboardFiltersContext;
