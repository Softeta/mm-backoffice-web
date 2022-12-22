import { useEffect, useState, useContext } from "react";
import IconButton from "Components/UI/atoms/IconButton";
import ThumbUpIcon from "@mui/icons-material/ThumbUpOffAlt";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import { ReactComponent as SpeachBubbleIcon } from "Assets/Icons/speachBubble.svg";
import WeavyContext from "Weavy/WeavyContext";
import clsx from "clsx";
import InvitationSentIcon from "@mui/icons-material/MarkEmailReadOutlined";
import SubjectIcon from "@mui/icons-material/Subject";
import SubjectAddIcon from "@mui/icons-material/PlaylistAdd";
import ColorType from "Components/Enums/colorType";
import { getWeavyPostsCount } from "API/Calls/weavy";
import { TWeavyPostCountResponse } from "API/Types/Weavy/weavy";
import CheckboxAvatar from "./helpers/CheckboxAvatar";

export interface IInteractiveAvatar {
  spaceKey?: string;
  appKey?: string;
  className?: string;
  id: string;
  imageURL?: string;
  selected?: boolean;
  title?: string;
  isShortlisted: boolean;
  disabled?: boolean;
  isHired?: boolean;
  ranking?: number;
  hasBrief?: boolean;
  isInvited: boolean;
  hasApplied: boolean;
  onHover: (id: string, isHovered: boolean) => void;
  onSelect: (selected: boolean) => void;
  onRankingClick?: () => void;
  onBriefClick?: () => void;
}

let hoverTimeout: NodeJS.Timeout | undefined;

const InteractiveAvatar = ({
  spaceKey,
  appKey,
  className = "",
  id,
  imageURL,
  selected,
  title,
  isShortlisted,
  disabled = false,
  isHired = false,
  ranking,
  hasBrief,
  isInvited,
  hasApplied,
  onHover,
  onSelect,
  onRankingClick,
  onBriefClick,
}: IInteractiveAvatar) => {
  const [hovered, setHovered] = useState(false);
  const [postsNum, setPostsNum] = useState(0);
  const { weavy } = useContext(WeavyContext);

  const updatePostIcon = () => {
    getWeavyPostsCount(spaceKey, appKey).then(
      (response: TWeavyPostCountResponse) => {
        setPostsNum(response.data);
      }
    );
  };

  useEffect(() => {
    updatePostIcon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleHover = (isHovered: boolean) => {
    if (disabled) {
      return;
    }

    setHovered(isHovered);

    if (hoverTimeout && !isHovered) {
      clearTimeout(hoverTimeout);
    }

    if (isHovered) {
      hoverTimeout = setTimeout(() => {
        onHover(id, isHovered);
      }, 500);
    } else {
      onHover(id, isHovered);
    }
  };
  const handleSelect = (isSelected: boolean) => {
    if (!disabled) {
      onSelect(isSelected);
    }
  };

  weavy.on("message", (e: any, data: any) => {
    if (data.name === "has-post") {
      updatePostIcon();
    }
  });

  return (
    <div
      className={clsx(
        [className],
        "rounded p-1",
        (hovered || selected) && "bg-blue-middle",
        !hovered && !selected && "bg-wild-sand",
        isHired && "border-2 border-red-hover",
        isShortlisted && !isHired && "border-2 border-orange"
      )}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div className="flex items-center gap-2">
        <CheckboxAvatar
          selected={selected}
          hovered={hovered}
          imageURL={imageURL}
          title={title}
          onSelect={handleSelect}
        />
        <div className="h6">{title}</div>
        <div className="ml-auto flex gap-2 items-center">
          {hasBrief && (
            <IconButton
              variant={ButtonVariantType.Text}
              color={ColorType.Info}
              onClick={onBriefClick}
              icon={<SubjectIcon color="action" fontSize="small" />}
            />
          )}
          {!hasBrief && hovered && (
            <IconButton
              variant={ButtonVariantType.Text}
              color={ColorType.Info}
              onClick={onBriefClick}
              icon={<SubjectAddIcon color="action" fontSize="small" />}
            />
          )}
          {isInvited && <InvitationSentIcon fontSize="small" color="action" />}
          {hasApplied && <ThumbUpIcon fontSize="small" color="action" />}
          {ranking !== undefined && (
            <div
              className="rounded px-1 py-0 bg-blue-main text-xs text-white"
              onClick={onRankingClick}
              onKeyPress={onRankingClick}
              role="button"
              tabIndex={0}
            >
              {ranking}
              {postsNum > 0 && (
                <IconButton
                  className="job-cand-btn"
                  variant={ButtonVariantType.Text}
                  icon={<SpeachBubbleIcon fontSize="inherit" />}
                  aria-label="comments"
                  size="large"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveAvatar;
