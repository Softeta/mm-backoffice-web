type TFileRequest = {
  cacheId?: string;
};

export type TFileAddRequest = TFileRequest;

export type TFileUpdateRequest = TFileRequest & {
  hasChanged: boolean;
};
