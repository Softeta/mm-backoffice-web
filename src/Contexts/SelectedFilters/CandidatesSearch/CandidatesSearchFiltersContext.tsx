import { TCandidatesFilterParams } from "API/Types/Candidate/candidatesFilterParameters";
import { createContext } from "react";

export type TCandidatesFilters = {
  params: TCandidatesFilterParams;
  areParamsSelected: boolean;
  setParams: (params: TCandidatesFilterParams) => void;
  clearParams: () => void;
};

const CandidatesSearchFiltersContext = createContext<TCandidatesFilters>({
  params: {} as TCandidatesFilterParams,
  areParamsSelected: false,
  setParams: () => ({} as TCandidatesFilterParams),
  clearParams: () => ({}),
});

export default CandidatesSearchFiltersContext;
