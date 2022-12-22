import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ColorType from "Components/Enums/colorType";
import BinIcon from "Assets/Icons/bin.svg";
import { useState, MouseEvent } from "react";

interface IProps {
  link?: string;
  onDelete?: () => void;
}

const buildUrl = (url?: string) => {
  if (!url) return url;

  return url?.includes("//") ? url : `//${url}`;
};

const LinkCard = ({ link, onDelete }: IProps) => {
  const [showControls, setShowControls] = useState(false);

  const handleDeleteClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onDelete?.();
  };

  return (
    <div
      className="relative w-full flex gap-2 rounded-lg p-2 mb-0.5 bg-blue-secondary"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      tabIndex={0}
      role="link"
    >
      <div className="text-xs overflow-hidden">
        <a href={buildUrl(link)} target="_blank" rel="noreferrer">
          {link}
        </a>
      </div>

      {showControls && (
        <div className="absolute top-0 right-0 p-2 h-full flex justify-end bg-blue-secondary rounded-lg">
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

export default LinkCard;
