import { TPagedResponse } from "./pagedResponse";

export type THobbiesResponse = {
  data: TPagedResponse<THobby>;
};

export type THobby = {
  id: string;
  code: string;
};
