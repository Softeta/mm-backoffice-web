import { backOfficeHttpClient } from "API/clients";
import { TClassificatorsResponse } from "API/Types/classificators";

const fetchClassificatorData = async (): Promise<TClassificatorsResponse> =>
  backOfficeHttpClient.get("/api/v1/classificators");

export default fetchClassificatorData;
