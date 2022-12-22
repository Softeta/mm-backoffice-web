import MuiAvatar, { AvatarProps } from "@mui/material/Avatar";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import { colors } from "Theme/theme";
import getInitials from "./helper";

interface IAvatar extends AvatarProps {
  imageURL?: string;
  title?: string;
  size?: AvatarSizeType;
}

const parameters = {
  [AvatarSizeType.Small]: { width: 16, height: 16, fontSize: 10 },
  [AvatarSizeType.Medium]: { width: 24, height: 24, fontSize: 16 },
  [AvatarSizeType.Large]: { width: 40, height: 40, fontSize: 24 },
};

const Avatar = ({
  imageURL,
  title = "",
  size = AvatarSizeType.Small,
  ...rest
}: IAvatar) => (
  <MuiAvatar
    src={imageURL}
    sx={{
      ...parameters[size],
      bgcolor: imageURL || colors["grey-lightest"],
    }}
    {...rest}
  >
    {getInitials(title)}
  </MuiAvatar>
);
export default Avatar;
