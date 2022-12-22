import { TPosition } from "API/Types/position";
import { TTagItem } from "Components/UI/organisms/AutocompleteWithTags/types";

export const positionsToTags = (positions: TPosition[]): TTagItem[] =>
  positions.map((position) => ({
    id: position.id,
    label: position.code,
  }));

export const tagsToPositions = (tags: TTagItem[]): TPosition[] =>
  tags.map((tag) => ({
    id: tag.id,
    code: tag.label,
  }));
