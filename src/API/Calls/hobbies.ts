import { useQuery } from "react-query";
import { backOfficeHttpClient } from "API/clients";
import { THobbiesResponse } from "API/Types/hobbies";

export enum HobbiesQueryKeys {
  hobbies = "hobbies",
}

const fetchHobbies = async (search?: string): Promise<THobbiesResponse> => {
  const searchQuery = search ? `?search=${search}` : "";
  return backOfficeHttpClient.get(`/api/v1/hobbies${searchQuery}`);
};

export const useHobbies = (search?: string) =>
  useQuery(`${HobbiesQueryKeys.hobbies}.${search}`, () => fetchHobbies(search));
