import { useIndustries, useRecommendedIndustries } from "API/Calls/industries";
import { TIndustry } from "API/Types/industries";
import AutocompleteWithTags from "Components/UI/organisms/AutocompleteWithTags";
import { TTexts } from "Components/UI/organisms/AutocompleteWithTags/AutocompleteWithTags";
import { TTagItem } from "Components/UI/organisms/AutocompleteWithTags/types";
import {
  ChangeEvent,
  forwardRef,
  Ref,
  useEffect,
  useMemo,
  useState,
} from "react";
import { industriesToTags, tagsToIndustries } from "./helpers";

interface IProps {
  texts?: TTexts;
  className?: string;
  /* selected/added industries */
  selected?: TIndustry[];
  /* on industry selected or removed */
  onSelectedChange: (industries: TIndustry[]) => void;
  disabled?: boolean;
}

const defaultTexts: TTexts = {
  label: "Industries",
  searchLabel: "Search for industries",
  selectedCaption: "Added industries",
};

const IndustrySelect = forwardRef(
  (
    {
      className,
      selected = [],
      texts = defaultTexts,
      onSelectedChange,
      disabled = false,
    }: IProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const [search, setSearch] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<TTagItem[]>(
      industriesToTags(selected)
    );

    const industries = useIndustries(search);
    const recommendedIndustries = useRecommendedIndustries();

    const tagList = useMemo(() => {
      const industriesList: TIndustry[] | undefined =
        search?.length > 0
          ? industries?.data?.data?.data
          : recommendedIndustries?.data?.data;

      if (!industriesList) return [];

      const filtered = industriesList.filter(
        (industry) => !selectedTags.some((tag) => industry.id === tag.id)
      );
      return industriesToTags(filtered);
    }, [selectedTags, industries?.data, search, recommendedIndustries?.data]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event?.target?.value ?? "");
    };

    const handleSave = () => {
      onSelectedChange(tagsToIndustries(selectedTags));
      setSearch("");
    };

    const handleTagAdd = (tag: TTagItem) => {
      setSelectedTags((prev) => [...prev, tag]);
    };

    const handleTagRemove = (tag?: TTagItem) => {
      if (!tag) return;
      setSelectedTags((prev) => prev.filter((x) => x.id !== tag.id));
    };

    const handleCollapsedTagRemove = (tag?: TTagItem) => {
      if (tag) {
        const newSelectedTags = selectedTags.filter((x) => x.id !== tag.id);
        setSelectedTags(newSelectedTags);
        onSelectedChange(tagsToIndustries(newSelectedTags));
      }
    };

    useEffect(() => {
      setSelectedTags(industriesToTags(selected));
    }, [selected]);

    return (
      <AutocompleteWithTags
        ref={ref}
        className={className}
        search={search}
        list={tagList}
        selected={selectedTags}
        text={texts}
        onSearchChange={handleSearchChange}
        onClose={handleSave}
        onTagAdd={handleTagAdd}
        onTagRemove={handleTagRemove}
        onCollapsedTagRemove={handleCollapsedTagRemove}
        disabled={disabled}
      />
    );
  }
);

export default IndustrySelect;
