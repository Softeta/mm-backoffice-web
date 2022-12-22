import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import Avatar from "Components/UI/atoms/Avatar";

interface IAvatarWithText {
  imageURL?: string;
  size: AvatarSizeType;
  title?: string;
  className?: string;
  showImagePlaceholder?: boolean;
}

const gap = {
  [AvatarSizeType.Small]: "gap-1",
  [AvatarSizeType.Medium]: "gap-2",
  [AvatarSizeType.Large]: "gap-3",
};

const AvatarWithText = ({
  imageURL,
  size,
  title,
  className,
  showImagePlaceholder,
}: IAvatarWithText) => (
  <div className={`flex items-center ${gap[size]} ${className ?? ""}`}>
    {(imageURL || showImagePlaceholder) && (
      <Avatar imageURL={imageURL} title={title} size={size} />
    )}
    <div className="self-center">{title}</div>
  </div>
);
export default AvatarWithText;
