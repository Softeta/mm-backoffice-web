import { backOfficeHttpClient } from "API/clients";
import { TConfigurationsResponse } from "API/Types/configurations";

const fetchConfigurationsData = async (): Promise<TConfigurationsResponse> =>
  backOfficeHttpClient.get("/api/v1/configurations");

export default fetchConfigurationsData;
