import { TPagedResponse } from "./pagedResponse";

export type TPositionResponse = {
  data: TPagedResponse<TPosition>;
};

export type TPositionCreateRequest = {
  code: string;
  baseWeight?: number;
};

export type TPositionCreateResponse = {
  data: TPosition;
};

export type TPosition = {
  id: string;
  code: string;
};
