import { TIndustry } from "API/Types/industries";
import { TTagItem } from "Components/UI/organisms/AutocompleteWithTags/types";

export const industriesToTags = (industries: TIndustry[]): TTagItem[] =>
  industries.map((industry) => ({
    id: industry.id,
    label: industry.code,
  }));

export const tagsToIndustries = (tags: TTagItem[]): TIndustry[] =>
  tags.map((tag) => ({
    id: tag.id,
    code: tag.label,
  }));
