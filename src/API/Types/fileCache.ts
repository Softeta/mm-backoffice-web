import { TFile } from "Components/UI/molecules/FileUpload/FileUpload";

export type TFileCacheRequest = {
  file?: TFile;
};

export type TFileCacheResponse = {
  data: {
    cacheId: string;
  };
};
