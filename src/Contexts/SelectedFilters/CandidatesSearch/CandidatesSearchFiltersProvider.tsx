import { TCandidatesFilterParams } from "API/Types/Candidate/candidatesFilterParameters";
import { IProvider } from "Contexts/IProvider";
import CandidateStatus from "Enums/candidateStatus";
import { useMemo, useState } from "react";
import CandidatesSearchFiltersContext, {
  TCandidatesFilters,
} from "./CandidatesSearchFiltersContext";

export const defaultFilters = {
  IsFreelance: true,
  IsPermanent: true,
  Search: "",
  Statuses: [CandidateStatus.Approved],
} as TCandidatesFilterParams;

const countParametersSelected = (params: TCandidatesFilterParams): boolean =>
  !!(
    params.Name ||
    (params.Positions && params.Positions.length > 0) ||
    params.Location ||
    params.RadiusInKm ||
    params.OpenForOpportunities ||
    params.IsFreelance !== defaultFilters.IsFreelance ||
    params.IsPermanent !== defaultFilters.IsPermanent ||
    params.AvailableFrom ||
    params.MonthlyBudgetTo ||
    params.HourlyBudgetTo ||
    params.Search
  );

export const CandidatesSearchFiltersProvider = ({ children }: IProvider) => {
  const [parameters, setParameters] = useState<TCandidatesFilterParams>({
    ...defaultFilters,
  });
  const [areParametersSelected, setParametersSelected] =
    useState<boolean>(false);
  const value: TCandidatesFilters = useMemo(
    () => ({
      params: parameters,
      areParamsSelected: areParametersSelected,
      setParams: (params: TCandidatesFilterParams) => {
        setParametersSelected(countParametersSelected(params));
        setParameters(params);
      },
      clearParams: () => {
        setParametersSelected(false);
        setParameters(defaultFilters);
      },
    }),
    [parameters, areParametersSelected]
  );

  return (
    <CandidatesSearchFiltersContext.Provider value={value}>
      {children}
    </CandidatesSearchFiltersContext.Provider>
  );
};

export default CandidatesSearchFiltersProvider;
