import Tag from "Components/UI/atoms/Tag";
import { TTagItem } from "../types";

interface IProps {
  className?: string;
  tags?: TTagItem[];
  onTagAdd: (tag: TTagItem) => void;
}
const ListTags = ({ className, tags = [], onTagAdd }: IProps) => (
  <div className={`flex flex-wrap gap-2 ${className ?? ""}`}>
    {tags.map((tag) => (
      <Tag key={tag.id} text={tag.label} nowrap onAdd={() => onTagAdd(tag)} />
    ))}
  </div>
);

export default ListTags;
