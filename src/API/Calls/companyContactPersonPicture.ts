import { TFileCacheResponse } from "API/Types/fileCache";
import {
  addFileCache,
  deleteFileCache,
  updateFileCache,
} from "./common/fileCache";

const endpoint = "companies/contact-persons/pictures";

export const addContactPersonPictureCache = async (
  data: FormData
): Promise<TFileCacheResponse> => addFileCache(data, endpoint);

export const updateContactPersonPictureCache = async (
  cacheId: string,
  data: FormData
): Promise<TFileCacheResponse> => updateFileCache(cacheId, data, endpoint);

export const deleteContactPersonPictureCache = async (
  cacheId: string
): Promise<void> => deleteFileCache(cacheId, endpoint);
