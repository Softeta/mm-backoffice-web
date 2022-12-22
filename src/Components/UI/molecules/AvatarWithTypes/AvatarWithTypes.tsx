import Avatar from "Components/UI/atoms/Avatar";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import Circle from "Components/UI/atoms/Circle";
import { CircleSide } from "Components/UI/atoms/Circle/Circle";

interface IAvatarWithTypes {
  imageURL?: string;
  title: string;
  className?: string;
  leftTop?: string;
  rightTop?: string;
}

const AvatarWithTypes = ({
  imageURL,
  title,
  className,
  leftTop,
  rightTop,
}: IAvatarWithTypes) => (
  <div className={`flex relative ${className}`}>
    {leftTop && <Circle text={leftTop} side={CircleSide.Left} />}

    <Avatar imageURL={imageURL} title={title} size={AvatarSizeType.Large} />

    {rightTop && (
      <Circle
        text={rightTop}
        side={CircleSide.Right}
        className="bg-blue-secondary"
      />
    )}
  </div>
);
export default AvatarWithTypes;
