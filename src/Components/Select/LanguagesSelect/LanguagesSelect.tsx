import { useLanguages, useRecommendedLanguages } from "API/Calls/languages";
import { TLanguage } from "API/Types/languages";
import AutocompleteWithTags from "Components/UI/organisms/AutocompleteWithTags";
import { TTagItem } from "Components/UI/organisms/AutocompleteWithTags/types";
import {
  ChangeEvent,
  forwardRef,
  Ref,
  useEffect,
  useMemo,
  useState,
} from "react";
import { languagesToTags, tagsToLanguages } from "./helpers";

interface IProps {
  className?: string;
  selected?: TLanguage[];
  onSelectedChange: (languages: TLanguage[]) => void;
  disabled?: boolean;
}

const texts = {
  label: "Language",
  searchLabel: "Search for languages",
  selectedCaption: "Added languages",
};

const LanguagesSelect = forwardRef(
  (
    { className, selected = [], onSelectedChange, disabled = false }: IProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const [search, setSearch] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<TTagItem[]>(
      languagesToTags(selected)
    );

    const languages = useLanguages(search);
    const recommendedLanguages = useRecommendedLanguages();

    const tagList = useMemo(() => {
      const languageList: TLanguage[] | undefined =
        search?.length > 0
          ? languages?.data?.data?.data
          : recommendedLanguages?.data?.data;

      if (!languageList) return [];

      const filtered = languageList.filter(
        (language) => !selectedTags.some((tag) => language.id === tag.id)
      );
      return languagesToTags(filtered);
    }, [search, languages?.data, recommendedLanguages?.data, selectedTags]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event?.target?.value ?? "");
    };

    const handleSave = () => {
      onSelectedChange(tagsToLanguages(selectedTags));
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
        onSelectedChange(tagsToLanguages(newSelectedTags));
      }
    };

    useEffect(() => {
      setSelectedTags(languagesToTags(selected));
    }, [selected]);

    return (
      <AutocompleteWithTags
        ref={ref}
        disabled={disabled}
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
      />
    );
  }
);

export default LanguagesSelect;
