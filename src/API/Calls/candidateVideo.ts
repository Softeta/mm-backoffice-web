import { TFileCacheResponse } from "API/Types/fileCache";
import {
  addFileCache,
  deleteFileCache,
  updateFileCache,
} from "./common/fileCache";

const endpoint = "candidates/videos";

export const addVideoCache = async (
  data: FormData
): Promise<TFileCacheResponse> => addFileCache(data, endpoint);

export const updateVideoCache = async (
  cacheId: string,
  data: FormData
): Promise<TFileCacheResponse> => updateFileCache(cacheId, data, endpoint);

export const deleteVideoCache = async (cacheId: string): Promise<void> =>
  deleteFileCache(cacheId, endpoint);
