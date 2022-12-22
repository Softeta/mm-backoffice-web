import { useQuery } from "react-query";
import { backOfficeHttpClient } from "API/clients";
import {
  TIndustriesResponse,
  TRecommendedIndustriesResponse,
} from "API/Types/industries";

export enum IndustriesQueryKeys {
  industries = "industries",
  recommendedIndustries = "recommendedIndustries",
}

const fetchIndustries = async (
  search?: string
): Promise<TIndustriesResponse> => {
  const searchQuery = search ? `?search=${search}` : "";
  return backOfficeHttpClient.get(`/api/v1/industries${searchQuery}`);
};

const fetchRecommendedIndustries =
  async (): Promise<TRecommendedIndustriesResponse> =>
    backOfficeHttpClient.get("/api/v1/industries/recommended");

export const useIndustries = (search?: string) =>
  useQuery(
    `${IndustriesQueryKeys.industries}.${search}`,
    () => fetchIndustries(search),
    { enabled: !!search }
  );

export const useRecommendedIndustries = () =>
  useQuery(IndustriesQueryKeys.recommendedIndustries, () =>
    fetchRecommendedIndustries()
  );
