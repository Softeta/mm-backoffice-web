import { TPagedResponse } from "./pagedResponse";

export type TLanguagesResponse = {
  data: TPagedResponse<TLanguage>;
};

export type TRecommendedLanguagesResponse = {
  data: TLanguage[];
};

export type TLanguage = {
  id: string;
  code: string;
  name: string;
};
