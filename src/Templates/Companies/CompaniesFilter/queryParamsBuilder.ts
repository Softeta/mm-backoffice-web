import CompaniesInputNames, {
  TCompaniesFilterParams,
} from "API/Types/Companies/companiesFilterParameters";

const queryParamsBuilder = (
  filters: TCompaniesFilterParams
): URLSearchParams => {
  const params = new URLSearchParams();

  if (process.env.REACT_APP_PAGE_SIZE) {
    params.append("PageSize", process.env.REACT_APP_PAGE_SIZE);
  }

  filters.Industries?.forEach((x) =>
    params.append(CompaniesInputNames.Industries, x.id)
  );

  if (filters.Location) {
    params.append(
      CompaniesInputNames.Latitude,
      filters.Location.latitude.toString()
    );
    params.append(
      CompaniesInputNames.Longitude,
      filters.Location.longitude.toString()
    );
    params.append(
      CompaniesInputNames.RadiusInKm,
      filters.RadiusInKm ? filters.RadiusInKm.toString() : "0"
    );
  }

  filters.Companies?.forEach((x) =>
    params.append(CompaniesInputNames.Companies, x.id)
  );

  filters.Statuses?.forEach((x) =>
    params.append(CompaniesInputNames.Statuses, x)
  );

  return params;
};

export default queryParamsBuilder;
