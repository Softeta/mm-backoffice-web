import { TBackOfficeUser } from "API/Types/backOfficeUsers";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import { TOption } from "Components/UI/molecules/Autocomplete/Autocomplete";
import AvatarWithText from "Components/UI/molecules/AvatarWithText";

// eslint-disable-next-line import/prefer-default-export
export const usersToOptions = (users: TBackOfficeUser[]): TOption[] =>
  users.map((user) => ({
    id: user.id,
    label: `${user.firstName} ${user.lastName}`.trim(),
    labelNode: (
      <AvatarWithText
        size={AvatarSizeType.Small}
        title={`${user.firstName} ${user.lastName}`.trim()}
        imageURL={user.pictureUri}
      />
    ),
  }));
