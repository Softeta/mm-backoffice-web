import { ReactNode, useState } from "react";
import IconButton from "Components/UI/atoms/IconButton";
import ColorType from "Components/Enums/colorType";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import BinIcon from "Assets/Icons/bin.svg";
import PencilIcon from "Assets/Icons/pencil.svg";

interface IProps<T> {
  children: ReactNode;
  experience: T;
  onEdit: (experience: T) => void;
  onDelete: (experience: T) => void;
}

const controlsPaddingRight = "pr-[64px]";
const controlsWithMax = "max-w-[64px]";

const CandidateExperienceRecord = <T,>({
  children,
  experience,
  onEdit,
  onDelete,
}: IProps<T>) => {
  const [displayActionIcons, setDisplayActionIcons] = useState(false);

  return (
    <div
      className={`relative w-full text-xs bg-blue-light rounded-lg py-2 pl-3 ${controlsPaddingRight} mb-2`}
      onMouseEnter={() => setDisplayActionIcons(true)}
      onMouseLeave={() => setDisplayActionIcons(false)}
    >
      {children}
      {displayActionIcons && (
        <div
          className={`absolute top-0 right-0 h-full ${controlsWithMax} py-2 px-3 flex gap-2 items-start content-start`}
        >
          <IconButton
            variant={ButtonVariantType.Text}
            color={ColorType.Info}
            onClick={() => onEdit(experience)}
            icon={<img src={PencilIcon} alt="edit" />}
          />
          <IconButton
            variant={ButtonVariantType.Text}
            color={ColorType.Info}
            onClick={() => onDelete(experience)}
            icon={<img src={BinIcon} alt="remove" />}
          />
        </div>
      )}
    </div>
  );
};

export default CandidateExperienceRecord;
