import JobFilterInputNames, {
  TJobFilterParams,
} from "API/Types/Jobs/jobFilterParameters";

const buildSearchParams = (filters: TJobFilterParams): URLSearchParams => {
  const params = new URLSearchParams();

  if (process.env.REACT_APP_PAGE_SIZE) {
    params.append("PageSize", process.env.REACT_APP_PAGE_SIZE);
  }

  filters.Companies?.forEach((x) =>
    params.append(JobFilterInputNames.Companies, x)
  );

  filters.JobStages?.forEach((x) =>
    params.append(JobFilterInputNames.JobStages, x)
  );

  if (filters.Location) {
    params.append(
      JobFilterInputNames.Latitude,
      filters.Location.latitude.toString()
    );
    params.append(
      JobFilterInputNames.Longitude,
      filters.Location.longitude.toString()
    );
    params.append(
      JobFilterInputNames.RadiusInKm,
      filters.RadiusInKm ? filters.RadiusInKm.toString() : "0"
    );
  }

  filters.Positions?.forEach((x) =>
    params.append(JobFilterInputNames.Positions, x)
  );

  filters.WorkTypes?.forEach((x) =>
    params.append(JobFilterInputNames.WorkTypes, x)
  );

  filters.AssignedEmployees?.forEach((x) =>
    params.append(JobFilterInputNames.AssignedEmployees, x)
  );

  if (filters.Owner) {
    params.append(JobFilterInputNames.Owner, filters.Owner);
  }

  if (filters.DeadLineDate) {
    params.append(
      JobFilterInputNames.DeadLineDate,
      filters.DeadLineDate.toJSON()
    );
  }

  if (filters.Search && filters.Search.length > 2) {
    params.append(JobFilterInputNames.Search, filters.Search);
  }

  if (filters.OrderBy) {
    params.append(JobFilterInputNames.OrderBy, filters.OrderBy);
  }

  return params;
};

export default buildSearchParams;
