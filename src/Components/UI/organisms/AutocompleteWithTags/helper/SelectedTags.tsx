import Tag from "Components/UI/atoms/Tag";
import { TTagItem } from "../types";

interface IProps {
  className?: string;
  tags?: TTagItem[];
  onRemove: (tag?: TTagItem) => void;
}
const SelectedTags = ({ className, tags = [], onRemove }: IProps) => (
  <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
    {tags.map((tag) => (
      <Tag
        key={tag.id}
        text={tag.label}
        nowrap
        onRemove={() => onRemove(tag)}
      />
    ))}
  </div>
);

export default SelectedTags;
