import { THobby } from "API/Types/hobbies";
import { TTagItem } from "Components/UI/organisms/AutocompleteWithTags/types";

export const hobbiesToTags = (hobbies: THobby[]): TTagItem[] =>
  hobbies.map((hobby) => ({
    id: hobby.id,
    label: hobby.code,
  }));

export const tagsToHobbies = (tags: TTagItem[]): THobby[] =>
  tags.map((tag) => ({
    id: tag.id,
    code: tag.label,
  }));
