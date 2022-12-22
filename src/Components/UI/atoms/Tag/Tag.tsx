import AddIcon from "Assets/Icons/add.svg";
import CloseRoundedIcon from "Assets/Icons/closeRounded.svg";
import IconButton from "Components/UI/atoms/IconButton";
import ColorType from "Components/Enums/colorType";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import TagColor from "./TagColorVariant";

interface IProps {
  text: String;
  className?: string;
  color?: TagColor;
  nowrap?: boolean;
  onRemove?: () => void;
  onAdd?: () => void;
}

const Tag = ({
  text,
  className,
  color = TagColor.Blue,
  nowrap,
  onRemove,
  onAdd,
}: IProps) => {
  if (onRemove)
    return (
      <span
        className={`text-tags px-1 inline-flex gap-1 items-center border border-transparent focus-within:border-blue-main ${color} ${
          nowrap ? "whitespace-nowrap" : ""
        } ${className ?? ""}`}
      >
        {text}
        <IconButton
          className="shrink-0"
          variant={ButtonVariantType.Text}
          icon={
            <span className="w-[10px]">
              <img src={CloseRoundedIcon} alt="close" />
            </span>
          }
          color={ColorType.Info}
          onClick={onRemove}
        />
      </span>
    );

  if (onAdd)
    return (
      <button
        type="button"
        className={`text-tags px-1 inline-flex gap-1 items-center border border-transparent focus-within:border-blue-main ${color} ${
          nowrap ? "whitespace-nowrap" : ""
        } ${className ?? ""}`}
        onClick={onAdd}
      >
        <span className="min-w-[8px] h-[8px] w-[8px]">
          <img src={AddIcon} alt="add" />
        </span>
        {text}
      </button>
    );

  return (
    <span
      className={`px-1 text-tags ${color} ${
        nowrap ? "whitespace-nowrap" : ""
      } ${className ?? ""}`}
    >
      {text}
    </span>
  );
};

export default Tag;
