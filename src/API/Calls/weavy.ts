import { backOfficeHttpClient, weavyClient } from "API/clients";
import {
  TWeavyBadgeCountResponse,
  TWeavyJwtResponse,
  TWeavyPostCountResponse,
} from "API/Types/Weavy/weavy";
import { AxiosRequestConfig } from "axios";

export const getWeavyJwt = async (): Promise<TWeavyJwtResponse> => {
  const result = await backOfficeHttpClient.post("/api/v1/weavy-jwt");
  return result;
};

export const getWeavyPostsCount = async (
  spaceKey: string | undefined,
  appKey: string | undefined
): Promise<TWeavyPostCountResponse> => {
  const token = await getWeavyJwt().then((res) => res.data);

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await weavyClient.get(
    `/api/posts/${spaceKey}/${appKey}/count`,
    config
  );

  return result;
};

export const getWeavyBadges = async (): Promise<TWeavyBadgeCountResponse> => {
  const token = await getWeavyJwt().then((res) => res.data);

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const result = await weavyClient.get("/api/users/badges", config);
  return result;
};
