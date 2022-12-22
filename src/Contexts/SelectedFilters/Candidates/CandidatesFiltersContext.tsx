import { TCandidatesFilterParams } from "API/Types/Candidate/candidatesFilterParameters";
import { createContext } from "react";

export type TCandidatesFilters = {
  params: TCandidatesFilterParams;
  setParams: (params: TCandidatesFilterParams) => void;
};

const CandidatesFiltersContext = createContext<TCandidatesFilters>({
  params: {} as TCandidatesFilterParams,
  setParams: () => ({} as TCandidatesFilterParams),
});

export default CandidatesFiltersContext;
