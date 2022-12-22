import {
  Box,
  CircularProgress,
  FormControl,
  Popover,
  TextField as MuiTextField,
} from "@mui/material";
import { ChangeEvent, forwardRef, Ref, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SearchField from "Components/UI/atoms/SearchField";
import IconButton from "Components/UI/atoms/IconButton";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ColorType from "Components/Enums/colorType";
import Divide from "Components/UI/atoms/Divide";
import SelectedTags from "./helper/SelectedTags";
import ListTags from "./helper/ListTags";
import getRefWidth from "./helper/getRefWidth";
import { TTagItem } from "./types";

export type TTexts = {
  label?: string;
  searchLabel?: string;
  altListTitle?: string;
  selectedCaption?: string;
};
export interface IAutocompleteWithTags {
  className?: string;
  /* search value */
  search?: string;
  /* list of tags according to search */
  list?: TTagItem[];
  /* alternative list of tags (recommended tags) */
  altList?: TTagItem[];
  /* codes of selected/added tags */
  selected?: TTagItem[];
  /** candidate for creating new tag */
  newTag?: TTagItem;
  /* captions and labels to render in the component, example in defaultText */
  text?: TTexts;
  /* on search value change */
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /* on Dropdown Close */
  onClose: () => void;
  onTagAdd: (tag: TTagItem) => void;
  onTagRemove: (tag?: TTagItem) => void;
  onCollapsedTagRemove: (tag?: TTagItem) => void;
  onTagCreate?: (tag: TTagItem) => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const defaultText = {
  label: "Tags",
  searchLabel: "Search for tags",
  altListTitle: "Recommended tags",
  selectedCaption: "Added tags",
  create: "Create",
};

const AutocompleteWithTags = forwardRef(
  (
    {
      className,
      search,
      list = [],
      altList = [],
      selected = [],
      text = defaultText,
      newTag,
      onSearchChange,
      onClose,
      onTagAdd,
      onTagRemove,
      onCollapsedTagRemove,
      onTagCreate,
      disabled = false,
      isLoading = false,
    }: IAutocompleteWithTags,
    ref: Ref<HTMLDivElement>
  ) => {
    const inputRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>();
    const [inputWidth, setInputWidth] = useState(0);
    const open = !!anchorEl;

    const isEmpty = selected.length === 0;
    const showDivider =
      (list.length > 0 || altList.length > 0 || newTag) && !isEmpty;

    const handleClose = () => {
      setAnchorEl(null);
      onClose();
    };

    const handleOpen = () => {
      if (!disabled) {
        setInputWidth(getRefWidth(inputRef));
        setAnchorEl(inputRef.current);
      }
    };

    const onRemove = (tag?: TTagItem) => {
      if (!disabled) {
        onCollapsedTagRemove(tag);
      }
    };

    return (
      <>
        <div ref={inputRef} className={className}>
          <FormControl className="col-span-2" fullWidth>
            <MuiTextField
              ref={ref}
              className="select-with-tags"
              label={text.label}
              disabled={disabled}
              value={selected}
              focused={open}
              type="hidden"
              onClick={isEmpty ? handleOpen : undefined}
              InputProps={{
                endAdornment: (
                  <IconButton
                    className="ml-auto"
                    tabIndex={0}
                    size="small"
                    disabled={disabled}
                    onClick={handleOpen}
                    variant={ButtonVariantType.Text}
                    color={ColorType.Info}
                    icon={
                      <KeyboardArrowDownIcon className="pointer-events-auto cursor-pointer" />
                    }
                  />
                ),
                startAdornment: !isEmpty && !open && (
                  <SelectedTags tags={selected} onRemove={onRemove} />
                ),
              }}
            />
          </FormControl>
        </div>
        <Popover
          ref={menuRef}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <Box sx={{ width: inputWidth }}>
            <div className="px-2 pb-6 pt-4 max-w-full">
              <FormControl className="w-full mb-4">
                <SearchField
                  value={search}
                  label={text.searchLabel}
                  onChange={onSearchChange}
                />
              </FormControl>
              {isLoading && <CircularProgress size={20} />}
              {list.length > 0 && <ListTags tags={list} onTagAdd={onTagAdd} />}

              {newTag && onTagCreate && (
                <>
                  <p className="mb-2 mt-4 text-2xs text-grey-middle">Create</p>
                  <ListTags tags={[newTag]} onTagAdd={onTagCreate} />
                </>
              )}

              {altList.length > 0 && (
                <>
                  <p className="mb-2 mt-4 text-2xs text-grey-middle">
                    {text.altListTitle}
                  </p>
                  <ListTags tags={altList} onTagAdd={onTagAdd} />
                </>
              )}
              {showDivider && <Divide />}
              {!isEmpty && (
                <>
                  <p className="mb-2 text-2xs text-grey-middle">
                    {text.selectedCaption}
                  </p>
                  <SelectedTags tags={selected} onRemove={onTagRemove} />
                </>
              )}
            </div>
          </Box>
        </Popover>
      </>
    );
  }
);

export default AutocompleteWithTags;
