import { useHobbies } from "API/Calls/hobbies";
import { THobby } from "API/Types/hobbies";
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
import { hobbiesToTags, tagsToHobbies } from "./helpers";

interface IProps {
  texts?: TTexts;
  className?: string;
  /* selected/added hobbies */
  selected?: THobby[];
  /* on hobby selected or removed */
  onSelectedChange: (hobbies: THobby[]) => void;
  disabled?: boolean;
}

const defaultTexts: TTexts = {
  label: "Hobbies",
  searchLabel: "Search for hobbies",
  selectedCaption: "Added hobbies",
};

const HobbySelect = forwardRef(
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
      hobbiesToTags(selected)
    );

    const hobbies = useHobbies(search);

    const tagList = useMemo(() => {
      if (!hobbies.data?.data?.data) return [];

      const filtered = hobbies.data.data.data.filter(
        (hobby) => !selectedTags.some((tag) => hobby.id === tag.id)
      );
      return hobbiesToTags(filtered);
    }, [selectedTags, hobbies?.data]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event?.target?.value ?? "");
    };

    const handleSave = () => {
      onSelectedChange(tagsToHobbies(selectedTags));
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
        onSelectedChange(tagsToHobbies(newSelectedTags));
      }
    };

    useEffect(() => {
      setSelectedTags(hobbiesToTags(selected));
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

export default HobbySelect;
