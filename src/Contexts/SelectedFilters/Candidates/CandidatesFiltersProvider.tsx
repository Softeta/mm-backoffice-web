import { TCandidatesFilterParams } from "API/Types/Candidate/candidatesFilterParameters";
import { IProvider } from "Contexts/IProvider";
import CandidateStatus from "Enums/candidateStatus";
import { useMemo, useState } from "react";
import CandidatesFiltersContext, {
  TCandidatesFilters,
} from "./CandidatesFiltersContext";

const defaultStatuses = [CandidateStatus.Approved];

export const defaultFilters = {
  IsFreelance: true,
  IsPermanent: true,
  Statuses: defaultStatuses,
  Search: "",
} as TCandidatesFilterParams;

export const CandidatesFiltersProvider = ({ children }: IProvider) => {
  const [params, setParams] = useState<TCandidatesFilterParams>({
    ...defaultFilters,
  });

  const value: TCandidatesFilters = useMemo(
    () => ({
      params,
      setParams,
    }),
    [params]
  );

  return (
    <CandidatesFiltersContext.Provider value={value}>
      {children}
    </CandidatesFiltersContext.Provider>
  );
};

export default CandidatesFiltersContext;
