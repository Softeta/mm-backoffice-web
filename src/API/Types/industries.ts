import { TPagedResponse } from "./pagedResponse";

export type TIndustriesResponse = {
  data: TPagedResponse<TIndustry>;
};

export type TRecommendedIndustriesResponse = {
  data: TIndustry[];
};

export type TIndustry = {
  id: string;
  code: string;
};
