import { backOfficeHttpClient } from "API/clients";
import { TLocationResponse } from "API/Types/location";

export const fetchLocation = async (
  search?: string
): Promise<TLocationResponse> => {
  const searchQuery = search ? `?address=${search}` : "";
  return backOfficeHttpClient.get(`/api/v1/locations${searchQuery}`);
};
