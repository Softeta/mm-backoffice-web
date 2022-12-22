import CandidatesInputNames, {
  TCandidatesFilterParams,
} from "API/Types/Candidate/candidatesFilterParameters";
import { format } from "date-fns";
import DateFormats from "Enums/dateFormats";

const queryParamsBuilder = (
  filters: TCandidatesFilterParams
): URLSearchParams => {
  const params = new URLSearchParams();
  const allWorkTypesSelected = filters.IsFreelance && filters.IsPermanent;

  if (process.env.REACT_APP_PAGE_SIZE) {
    params.append("PageSize", process.env.REACT_APP_PAGE_SIZE);
  }

  if (filters.Name) {
    params.append(CandidatesInputNames.Name, filters.Name);
  }

  filters.Positions?.forEach((x) =>
    params.append(CandidatesInputNames.Positions, x)
  );

  if (filters.Location) {
    params.append(
      CandidatesInputNames.Latitude,
      filters.Location.latitude.toString()
    );
    params.append(
      CandidatesInputNames.Longitude,
      filters.Location.longitude.toString()
    );
    params.append(
      CandidatesInputNames.RadiusInKm,
      filters.RadiusInKm ? filters.RadiusInKm.toString() : "0"
    );
  }

  if (filters.OpenForOpportunities) {
    params.append(
      CandidatesInputNames.OpenForOpportunities,
      filters.OpenForOpportunities.toString()
    );
  }

  if (!allWorkTypesSelected) {
    if (filters.IsFreelance) {
      params.append(
        CandidatesInputNames.IsFreelance,
        filters.IsFreelance.toString()
      );
    }
    if (filters.IsPermanent) {
      params.append(
        CandidatesInputNames.IsPermanent,
        filters.IsPermanent.toString()
      );
    }
  }

  if (filters.AvailableFrom) {
    params.append(
      CandidatesInputNames.AvailableFrom,
      format(filters.AvailableFrom, DateFormats.TechnicalDateTime.toString())
    );
  }

  if (filters.HourlyBudgetTo) {
    params.append(
      CandidatesInputNames.HourlyBudgetTo,
      filters.HourlyBudgetTo.toString()
    );
  }

  if (filters.MonthlyBudgetTo) {
    params.append(
      CandidatesInputNames.MonthlyBudgetTo,
      filters.MonthlyBudgetTo.toString()
    );
  }

  if (filters.Currency) {
    params.append(CandidatesInputNames.Currency, filters.Currency);
  }

  if (filters.JobId) {
    params.append(CandidatesInputNames.JobId, filters.JobId);
  }

  filters.Statuses?.forEach((x) =>
    params.append(CandidatesInputNames.Statuses, x)
  );

  if (filters.Search && filters.Search.length > 2) {
    params.append(CandidatesInputNames.Search, filters.Search);
  }

  return params;
};

export default queryParamsBuilder;
