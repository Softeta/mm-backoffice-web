import Avatar from "Components/UI/atoms/Avatar";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import { TJobInterestedCandidate } from "API/Types/Jobs/Common/jobInterestedCandidate";
import routes from "Routes/routes";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ColorType from "Components/Enums/colorType";
import BinIcon from "Assets/Icons/bin.svg";
import { useState, MouseEvent } from "react";
import { TFileResponse } from "API/Types/fileResponse";

export type TCandidateLink = {
  id: string;
  firstName?: string;
  lastName?: string;
  position?: string;
  picture?: TFileResponse;
};

interface IProps {
  className?: string;
  candidate: TJobInterestedCandidate;
  onDelete?: (id: string) => void;
}

const CandidateLink = ({ className, candidate, onDelete }: IProps) => {
  const { id, firstName, lastName, position, picture } = candidate;
  const fullName = `${firstName} ${lastName}`.trim();

  const [showControls, setShowControls] = useState(false);

  const handleClick = () => {
    window.open(`${routes.candidates.url}/${id}`);
  };

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onDelete?.(id);
  };

  return (
    <div
      className={`relative w-full flex gap-2 rounded-lg p-2 mb-0.5 bg-blue-secondary ${
        className ?? ""
      }`}
      key={candidate.id}
      onClick={handleClick}
      onKeyPress={handleClick}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      tabIndex={0}
      role="link"
    >
      <Avatar
        imageURL={picture?.uri}
        title={fullName}
        size={AvatarSizeType.Large}
      />

      <div className="text-xs self-center">
        <div className="font-semibold text-grey-dark mb-1">{fullName}</div>
        <div className="text-grey-middle">{position}</div>
      </div>

      {showControls && (
        <div className="absolute top-0 right-0 p-3.5 w-full h-full flex justify-end">
          {onDelete && (
            <Button
              className="min-w-0 h-min p-0"
              variant={ButtonVariantType.Text}
              color={ColorType.Info}
              onClick={handleDeleteClick}
              startIcon={
                <img className="relative left-1" src={BinIcon} alt="" />
              }
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CandidateLink;
