import { backOfficeHttpClient } from "API/clients";
import {
  TPositionCreateRequest,
  TPositionCreateResponse,
  TPositionResponse,
} from "API/Types/position";
import { useQuery } from "react-query";

export enum JobPositionQueryKeys {
  jobPositions = "jobPositions",
}

const fetchJobPositions = async (
  search?: string
): Promise<TPositionResponse> => {
  const searchQuery = search ? `?search=${search}` : "";
  return backOfficeHttpClient.get(`/api/v1/job-positions${searchQuery}`);
};

export const createJobPosition = async (
  data: TPositionCreateRequest
): Promise<TPositionCreateResponse> =>
  backOfficeHttpClient.post("/api/v1/job-positions/", data);

export const useJobPositions = (search?: string) =>
  useQuery(
    `${JobPositionQueryKeys.jobPositions}.${search}`,
    () => fetchJobPositions(search),
    {
      refetchOnWindowFocus: false,
      enabled: false,
    }
  );
