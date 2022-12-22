import { useJobPositions } from "API/Calls/jobPositions";
import { TPosition } from "API/Types/position";
import AutocompleteWithTags from "Components/UI/organisms/AutocompleteWithTags";
import { TTagItem } from "Components/UI/organisms/AutocompleteWithTags/types";
import useDebounce from "Hooks/useDebounce";
import {
  ChangeEvent,
  forwardRef,
  Ref,
  useEffect,
  useMemo,
  useState,
} from "react";
import { positionsToTags, tagsToPositions } from "./helpers";

interface IProps {
  className?: string;
  /* selected/added positions */
  selected?: TPosition[];
  /* on skill selected or removed */
  onSelectedChange: (positions: TPosition[]) => void;
}

const texts = {
  label: "Position",
  searchLabel: "Search for positions",
  selectedCaption: "Added positions",
};

const PositionMultiSelect = forwardRef(
  (
    { className, selected = [], onSelectedChange }: IProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const [search, setSearch] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<TTagItem[]>(
      positionsToTags(selected)
    );

    const { data: positions, refetch } = useJobPositions(search);
    const debouncedSearchValue = useDebounce(search);

    const tagList = useMemo(() => {
      if (!positions?.data?.data) return [];

      const filtered = positions.data.data.filter(
        (position) => !selectedTags.some((tag) => position.id === tag.id)
      );
      return positionsToTags(filtered);
    }, [selectedTags, positions?.data]);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event?.target?.value ?? "");
    };

    const handleSave = () => {
      onSelectedChange(tagsToPositions(selectedTags));
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
        onSelectedChange(tagsToPositions(newSelectedTags));
      }
    };

    useEffect(() => {
      setSelectedTags(positionsToTags(selected));
    }, [selected]);

    useEffect(() => {
      if (debouncedSearchValue.length > 1) {
        refetch();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debouncedSearchValue]);

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
      />
    );
  }
);

export default PositionMultiSelect;
