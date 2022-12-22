import { backOfficeHttpClient } from "API/clients";
import { TBackOfficeUsersResponse } from "API/Types/backOfficeUsers";

const fetchBackOfficeUsers = async (): Promise<TBackOfficeUsersResponse> =>
  backOfficeHttpClient.get("/api/v1/users");
export default fetchBackOfficeUsers;
