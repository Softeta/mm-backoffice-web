import { TLanguage } from "API/Types/languages";
import { TTagItem } from "Components/UI/organisms/AutocompleteWithTags/types";

export const languagesToTags = (languages: TLanguage[]): TTagItem[] =>
  languages.map((language) => ({
    id: language.id,
    label: language.name,
    data: { code: language.code },
  }));

export const tagsToLanguages = (tags: TTagItem[]): TLanguage[] =>
  tags.map((tag) => ({
    id: tag.id,
    name: tag.label,
    code: tag.data?.code,
  }));
