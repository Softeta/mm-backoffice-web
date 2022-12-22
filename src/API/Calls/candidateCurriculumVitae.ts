import { TFileCacheResponse } from "API/Types/fileCache";
import {
  addFileCache,
  deleteFileCache,
  updateFileCache,
} from "./common/fileCache";

const endpoint = "candidates/curriculum-vitaes";

export const addCurriculumVitaeCache = async (
  data: FormData
): Promise<TFileCacheResponse> => addFileCache(data, endpoint);

export const updateCurriculumVitaeCache = async (
  cacheId: string,
  data: FormData
): Promise<TFileCacheResponse> => updateFileCache(cacheId, data, endpoint);

export const deleteCurriculumVitaeCache = async (
  cacheId: string
): Promise<void> => deleteFileCache(cacheId, endpoint);
