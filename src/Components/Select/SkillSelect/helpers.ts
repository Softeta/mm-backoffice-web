import { TSkill } from "API/Types/skills";
import { TTagItem } from "Components/UI/organisms/AutocompleteWithTags/types";

export const skillToTag = (skill: TSkill): TTagItem => ({
  id: skill.id,
  label: skill.code,
});

export const skillsToTags = (skills: TSkill[]): TTagItem[] =>
  skills.map(skillToTag);

export const tagsToSkills = (tags: TTagItem[]): TSkill[] =>
  tags.map((tag) => ({
    id: tag.id,
    code: tag.label,
  }));
