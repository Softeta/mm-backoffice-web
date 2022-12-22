import { TFileCacheResponse } from "API/Types/fileCache";
import {
  addFileCache,
  deleteFileCache,
  updateFileCache,
} from "./common/fileCache";

const endpoint = "companies/logos";

export const addLogoCache = async (
  data: FormData
): Promise<TFileCacheResponse> => addFileCache(data, endpoint);

export const updateLogoCache = async (
  cacheId: string,
  data: FormData
): Promise<TFileCacheResponse> => updateFileCache(cacheId, data, endpoint);

export const deleteLogoCache = async (cacheId: string): Promise<void> =>
  deleteFileCache(cacheId, endpoint);
