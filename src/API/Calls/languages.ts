import { backOfficeHttpClient } from "API/clients";
import {
  TLanguagesResponse,
  TRecommendedLanguagesResponse,
} from "API/Types/languages";
import { useQuery } from "react-query";

export enum LanguagesQueryKeys {
  languages = "languages",
  recommendedLanguages = "recommended-languages",
}

const fetchLanguages = async (search?: string): Promise<TLanguagesResponse> => {
  const searchQuery = search ? `?search=${search}` : "";
  return backOfficeHttpClient.get(`/api/v1/languages${searchQuery}`);
};

const fetchRecommendedLanguages =
  async (): Promise<TRecommendedLanguagesResponse> =>
    backOfficeHttpClient.get(`/api/v1/languages/recommended`);

export const useLanguages = (search?: string) =>
  useQuery(
    `${LanguagesQueryKeys.languages}.${search}`,
    () => fetchLanguages(search),
    { enabled: !!search }
  );

export const useRecommendedLanguages = () =>
  useQuery(LanguagesQueryKeys.recommendedLanguages, () =>
    fetchRecommendedLanguages()
  );
