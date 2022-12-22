import { backOfficeHttpClient } from "API/clients";
import { TFileCacheResponse } from "API/Types/fileCache";

export const addFileCache = async (
  data: FormData,
  endpoint: string
): Promise<TFileCacheResponse> =>
  backOfficeHttpClient.post(`/api/v1/${endpoint}`, data);

export const updateFileCache = async (
  cacheId: string,
  data: FormData,
  endpoint: string
): Promise<TFileCacheResponse> =>
  backOfficeHttpClient.put(`/api/v1/${endpoint}/${cacheId}`, data);

export const deleteFileCache = async (
  cacheId: string,
  endpoint: string
): Promise<void> =>
  backOfficeHttpClient.delete(`/api/v1/${endpoint}/${cacheId}`);
