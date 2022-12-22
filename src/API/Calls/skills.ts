import { useInfiniteQuery, useQuery } from "react-query";
import { backOfficeHttpClient } from "API/clients";
import {
  TSkillCreateRequest,
  TSkillCreateResponse,
  TSkillsResponse,
} from "API/Types/skills";
import getComponentItemsPageSize from "Helpers/getComponentItemsPageSize";

export enum SkillsQueryKeys {
  skills = "skills",
  recommendedSkills = "recommended-skills",
}

const skillsBuffer = 10;
const skillsItemsSize = getComponentItemsPageSize();

const buildQueryString = (searchValue: string | undefined): string => {
  const params = new URLSearchParams();

  if (searchValue) {
    params.append("search", searchValue);
  }
  if (skillsItemsSize) {
    params.append("pageSize", (skillsItemsSize + skillsBuffer).toString());
  }

  return params.toString();
};

export const fetchSkills = async (
  search?: string,
  pageParam?: string
): Promise<TSkillsResponse> => {
  const searchQuery = search ? `?${search}` : "";
  return backOfficeHttpClient.get(pageParam || `/api/v1/skills${searchQuery}`);
};

export const createSkill = async (
  data: TSkillCreateRequest
): Promise<TSkillCreateResponse> =>
  backOfficeHttpClient.post("/api/v1/skills/", data);

export const useSkills = (search?: string) =>
  useInfiniteQuery(
    `${SkillsQueryKeys.skills}.${search}`,
    ({ pageParam }) => fetchSkills(buildQueryString(search), pageParam),
    {
      getNextPageParam: (last) => last.data.nextPagePath || undefined,
      keepPreviousData: true,
      enabled: false,
    }
  );

const fetchRecommendedSkills = async (
  jobPosition: string
): Promise<TSkillsResponse> =>
  backOfficeHttpClient.get(
    `/api/v1/skills/recommended?jobPosition=${jobPosition}`
  );

export const useRecommendedSkills = (jobPosition?: string) =>
  useQuery(
    [SkillsQueryKeys.recommendedSkills, jobPosition],
    () => fetchRecommendedSkills(jobPosition!),
    { enabled: !!jobPosition }
  );
