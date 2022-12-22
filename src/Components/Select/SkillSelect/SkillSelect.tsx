import { createSkill, useRecommendedSkills, useSkills } from "API/Calls/skills";
import { TSkill } from "API/Types/skills";
import AutocompleteWithTags from "Components/UI/organisms/AutocompleteWithTags";
import { TTexts } from "Components/UI/organisms/AutocompleteWithTags/AutocompleteWithTags";
import { TTagItem } from "Components/UI/organisms/AutocompleteWithTags/types";
import getComponentItemsPageSize from "Helpers/getComponentItemsPageSize";
import useDebounce from "Hooks/useDebounce";
import {
  ChangeEvent,
  forwardRef,
  Ref,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TPosition } from "API/Types/position";
import { skillsToTags, skillToTag, tagsToSkills } from "./helpers";

interface IProps {
  texts?: TTexts;
  className?: string;
  /* selected/added skills */
  selected?: TSkill[];
  jobPosition?: TPosition;
  /* on skill selected or removed */
  onSelectedChange: (skills: TSkill[]) => void;
  disabled?: boolean;
}

const skillsItemsSize = getComponentItemsPageSize();

const defaultTexts: TTexts = {
  label: "Skills",
  searchLabel: "Search for skills",
  altListTitle: "Recommended skills",
  selectedCaption: "Added skills",
};

const SkillSelect = forwardRef(
  (
    {
      className,
      selected = [],
      texts = {},
      jobPosition,
      onSelectedChange,
      disabled = false,
    }: IProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<TTagItem[]>(
      skillsToTags(selected)
    );

    const {
      data: skills,
      refetch: skillsRefetch,
      hasNextPage: skillsHasNextPage,
      fetchNextPage: skillsFetchNextPage,
    } = useSkills(search);
    const recommendedSkills = useRecommendedSkills(jobPosition?.code);
    const debouncedSearchValue = useDebounce(search);

    const tagList = useMemo(() => {
      if (!search) return [];
      if (!skills?.pages) return [];

      const grouped = skills.pages.map((group) => group.data?.data).flat();
      const filtered = grouped
        .filter((skill) => !selectedTags.some((tag) => skill.id === tag.id))
        .slice(0, skillsItemsSize);

      return skillsToTags(filtered);
    }, [selectedTags, skills?.pages, search]);

    const recommendedTagList = useMemo(() => {
      if (!recommendedSkills?.data?.data.data) return [];

      const filtered = recommendedSkills.data.data.data.filter(
        (skill) => !selectedTags.some((tag) => skill.id === tag.id)
      );
      return skillsToTags(filtered);
    }, [recommendedSkills?.data, selectedTags]);

    const newTag: TTagItem | undefined = useMemo(
      () =>
        search.length > 0 && tagList.length === 0
          ? { id: search, label: search }
          : undefined,
      [search, tagList.length]
    );

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event?.target?.value ?? "");
    };

    const handleSave = () => {
      onSelectedChange(tagsToSkills(selectedTags));
      setSearch("");
    };

    const handleTagAdd = (tag: TTagItem) => {
      setSelectedTags((prev) => [...prev, tag]);
    };

    const handleTagRemove = (tag?: TTagItem) => {
      if (tag) {
        setSelectedTags((prev) => prev.filter((x) => x.id !== tag.id));
      }
    };

    const handleCollapsedTagRemove = (tag?: TTagItem) => {
      if (tag) {
        const newSelectedTags = selectedTags.filter((x) => x.id !== tag.id);
        setSelectedTags(newSelectedTags);
        onSelectedChange(tagsToSkills(newSelectedTags));
      }
    };

    const handleTagCreate = (tag: TTagItem) => {
      setIsLoading(true);
      setSearch("");
      createSkill({ code: tag.label })
        .then((res) => handleTagAdd(skillToTag(res.data)))
        .finally(() => {
          setIsLoading(false);
        });
    };

    useEffect(() => {
      setSelectedTags(skillsToTags(selected));
    }, [selected]);

    useEffect(() => {
      if (skillsHasNextPage && tagList.length < skillsItemsSize) {
        skillsFetchNextPage();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skills, tagList.length]);

    useEffect(() => {
      if (debouncedSearchValue.length > 1 && debouncedSearchValue) {
        skillsRefetch();
      }
    }, [debouncedSearchValue, skillsRefetch]);

    return (
      <AutocompleteWithTags
        ref={ref}
        disabled={disabled}
        isLoading={isLoading}
        className={className}
        search={search}
        list={tagList}
        altList={recommendedTagList}
        selected={selectedTags}
        newTag={newTag}
        text={{ ...defaultTexts, ...texts }}
        onSearchChange={handleSearchChange}
        onClose={handleSave}
        onTagAdd={handleTagAdd}
        onTagRemove={handleTagRemove}
        onCollapsedTagRemove={handleCollapsedTagRemove}
        onTagCreate={handleTagCreate}
      />
    );
  }
);

export default SkillSelect;
