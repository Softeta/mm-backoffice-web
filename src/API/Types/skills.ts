import { TPagedResponse } from "./pagedResponse";

export type TSkillsResponse = {
  data: TPagedResponse<TSkill>;
};

export type TSkillCreateRequest = {
  code: string;
  baseWeight?: number;
};

export type TSkillCreateResponse = {
  data: TSkill;
};

export type TSkill = {
  id: string;
  code: string;
};
