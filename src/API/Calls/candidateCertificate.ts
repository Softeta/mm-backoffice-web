import { TFileCacheResponse } from "API/Types/fileCache";
import {
  addFileCache,
  deleteFileCache,
  updateFileCache,
} from "./common/fileCache";

const endpoint = "candidates/certificates";

export const addCertificateCache = async (
  data: FormData
): Promise<TFileCacheResponse> => addFileCache(data, endpoint);

export const updateCertificateCache = async (
  cacheId: string,
  data: FormData
): Promise<TFileCacheResponse> => updateFileCache(cacheId, data, endpoint);

export const deleteCertificateCache = async (cacheId: string): Promise<void> =>
  deleteFileCache(cacheId, endpoint);
