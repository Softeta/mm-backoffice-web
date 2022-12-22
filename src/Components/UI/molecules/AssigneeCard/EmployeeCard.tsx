import Avatar from "Components/UI/atoms/Avatar";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ColorType from "Components/Enums/colorType";
import CloseIcon from "Assets/Icons/close.svg";
import { useState } from "react";
import { TJobEmployee } from "API/Types/Jobs/Common/jobEmployee";

interface IProps {
  className?: string;
  employee: TJobEmployee;
  onDelete?: (id: string) => void;
}

const EmployeeCard = ({ className, employee, onDelete }: IProps) => {
  const { id, firstName, lastName, pictureUri } = employee;
  const fullName = `${firstName} ${lastName}`.trim();

  const [showControls, setShowControls] = useState(false);

  return (
    <div
      className={`relative flex gap-2 rounded-lg p-2 pr-6 mb-0.5 bg-blue-secondary ${
        className ?? ""
      }`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <Avatar
        imageURL={pictureUri}
        title={fullName}
        size={AvatarSizeType.Medium}
      />

      <div className="text-xs self-center">
        <div className="font-semibold text-grey-dark mb-1">{fullName}</div>
      </div>

      {showControls && (
        <div className="absolute top-0 right-0 p-3.5 w-full h-full flex justify-end">
          {onDelete && (
            <Button
              className="min-w-0 h-min p-0"
              variant={ButtonVariantType.Text}
              color={ColorType.Info}
              onClick={() => onDelete(id)}
              endIcon={
                <img className="relative left-1" src={CloseIcon} alt="" />
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;
