import MuiAvatar from "@mui/material/Avatar";
import Avatar from "Components/UI/atoms/Avatar";
import CheckIcon from "Assets/Icons/check.svg";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import { colors } from "Theme/theme";

interface ICheckboxAvatar {
  selected?: boolean;
  hovered?: boolean;
  imageURL?: string;
  title?: string;
  onSelect: (check: boolean) => void;
}
const CheckboxAvatar = ({
  selected,
  hovered,
  imageURL,
  title,
  onSelect,
}: ICheckboxAvatar) => {
  const handleSelect = () => {
    onSelect(!selected);
  };

  if (hovered && !selected)
    return (
      <MuiAvatar
        onClick={handleSelect}
        sx={{ width: 24, height: 24, fontSize: 16 }}
      >
        <div className="border-2 border-blue-main bg-white w-full h-full rounded-full cursor-pointer" />
      </MuiAvatar>
    );

  if (selected)
    return (
      <div onClick={handleSelect} aria-hidden="true">
        <MuiAvatar
          sx={{
            width: 24,
            height: 24,
            fontSize: 16,
            background: colors["blue-main"],
            cursor: "pointer",
          }}
        >
          <img src={CheckIcon} alt="check" />
        </MuiAvatar>
      </div>
    );

  return (
    <Avatar
      onClick={handleSelect}
      imageURL={imageURL}
      title={title}
      size={AvatarSizeType.Medium}
    />
  );
};

export default CheckboxAvatar;
