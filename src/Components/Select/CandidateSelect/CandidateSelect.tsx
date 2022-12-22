import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";

import { ChangeEvent, useEffect, useMemo, useState, MouseEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { CandidateQueryKeys, useCandidates } from "API/Calls/candidates";
import { TCandidateBrief } from "API/Types/Candidate/candidatesBriefGet";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import AvatarWithText from "Components/UI/molecules/AvatarWithText";
import MenuItem from "Components/UI/atoms/MenuItem";
import { FormControl, Menu } from "@mui/material";
import SearchField from "Components/UI/atoms/SearchField";
import useDebounce from "Hooks/useDebounce";
import { useQueryClient } from "react-query";

interface ICandidateSelect {
  excludedCandidates?: string[];
  onCandidateSelect: (candidate: TCandidateBrief) => void;
}

type TOption = {
  id: string;
  label: string;
  pictureUri?: string;
  candidate: TCandidateBrief;
};

const candidateToOption = (candidate: TCandidateBrief): TOption => ({
  id: candidate.id,
  label: candidate.fullName || "",
  pictureUri: candidate.picture?.uri,
  candidate,
});

const CandidateSelect = ({
  excludedCandidates = [],
  onCandidateSelect,
}: ICandidateSelect) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [search, setSearch] = useState<[string, boolean]>(["", false]);

  const queryClient = useQueryClient();
  const debouncedSearchValue = useDebounce(search);
  const candidates = useCandidates(
    new URLSearchParams({ name: search[0] }),
    false
  );

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setSearch(["", false]);
    setAnchorEl(event.target as HTMLButtonElement);
  };

  const handleClose = () => {
    queryClient.invalidateQueries(CandidateQueryKeys.candidates);
    candidates.remove();
    setAnchorEl(null);
  };

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch([event?.target?.value ?? "", true]);
  };

  const handleSelect = (candidate: TCandidateBrief) => {
    onCandidateSelect(candidate);
    handleClose();
  };

  const isOpen = !!anchorEl;

  const options: TOption[] = useMemo(() => {
    const candidatesData = candidates.data?.pages[0].data.data;
    return candidatesData
      ? candidatesData
          .map(candidateToOption)
          .filter((candidate) => !excludedCandidates.includes(candidate.id))
      : [];
  }, [candidates.data, excludedCandidates]);

  useEffect(() => {
    if (debouncedSearchValue[0].length > 1 && debouncedSearchValue[1]) {
      candidates.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  return (
    <>
      <Button
        onClick={handleOpen}
        variant={ButtonVariantType.Text}
        color={ColorType.Info}
        label="Select profile"
        startIcon={<AddIcon />}
      />
      <Menu
        open={isOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onKeyDownCapture={(e) => e.stopPropagation()}
      >
        <div className="w-40 min-w-dropdown">
          <FormControl className="w-full px-4">
            <SearchField value={search[0]} onChange={handleSearch} />
          </FormControl>
          <div className="px-4 py-2 max-h-40 overflow-y-auto">
            {options.map((option, index) => (
              <MenuItem
                className={`px-0 ${
                  index > 0 ? "border-t border-solid border-alto" : ""
                }`}
                key={option.id}
                value={option.id}
                onClick={() => handleSelect(option.candidate)}
                tabIndex={0}
              >
                <AvatarWithText
                  imageURL={option.pictureUri}
                  title={option.label}
                  size={AvatarSizeType.Medium}
                  showImagePlaceholder
                />
              </MenuItem>
            ))}
          </div>
        </div>
      </Menu>
    </>
  );
};

export default CandidateSelect;
