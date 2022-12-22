import ColorType from "Components/Enums/colorType";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import IconButton from "Components/UI/atoms/IconButton";
import { useState } from "react";
import BinIcon from "Assets/Icons/bin.svg";
import PencilIcon from "Assets/Icons/pencil.svg";
import { TCandidateNote } from "API/Types/Candidate/Common/candidateNote";
import { format } from "date-fns";
import DateFormats from "Enums/dateFormats";
import Tag from "Components/UI/atoms/Tag";

interface IStatusNote {
  note?: TCandidateNote;
  className?: string;
  fullWidth?: boolean;
  readonly?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const minWidth = "min-w-[100px]";

const StatusNote = ({
  note,
  className = "",
  fullWidth,
  readonly,
  onEdit,
  onDelete,
}: IStatusNote) => {
  const [displayActionIcons, setDisplayActionIcons] = useState(false);
  return (
    <div
      className={className}
      onMouseEnter={!readonly ? () => setDisplayActionIcons(true) : undefined}
      onMouseLeave={!readonly ? () => setDisplayActionIcons(false) : undefined}
    >
      <div
        className={
          `relative flex flex-col items-start ${className} ` +
          `bg-blue-light rounded-lg px-3 py-2 ` +
          `text-xs text-grey-dark overflow-hidden ` +
          `${fullWidth && "h-full"}`
        }
      >
        {note?.endDate && (
          <Tag text={format(new Date(note.endDate), DateFormats.Date)} nowrap />
        )}
        {note?.value && (
          <div className="max-h-[32px] overflow-hidden">{note.value}</div>
        )}
        {displayActionIcons && (
          <div
            className={
              `absolute top-0 right-0 ` +
              `${minWidth} h-full py-2 px-3 flex gap-2  items-start justify-end ` +
              `bg-gradient-to-r from-transparent via-blue-light to-blue-light `
            }
          >
            <IconButton
              variant={ButtonVariantType.Text}
              color={ColorType.Info}
              onClick={onEdit}
              icon={<img src={PencilIcon} alt="edit" />}
            />
            <IconButton
              variant={ButtonVariantType.Text}
              color={ColorType.Info}
              onClick={onDelete}
              icon={<img src={BinIcon} alt="remove" />}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusNote;
