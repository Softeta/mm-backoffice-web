import { TCandidateBrief } from "API/Types/Candidate/candidatesBriefGet";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import Avatar from "Components/UI/atoms/Avatar";
import { formatDistance } from "date-fns";

type TCandidateRow = {
  candidate: TCandidateBrief;
  selected?: boolean;
  onSelect?: () => void;
  onBlur?: () => void;
};

export const CandidateRow = ({
  candidate,
  selected,
  onSelect,
  onBlur,
}: TCandidateRow) => {
  const { firstName = "", lastName = "", picture, createdAt } = candidate;
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div
      className={`w-full py-2 flex items-center gap-2 cursor-pointer rounded group ${
        selected ? "bg-blue-middle" : "hover:bg-blue-middle"
      }`}
      onClick={onSelect}
      onKeyPress={onSelect}
      onBlur={onBlur}
      role="menuitem"
      tabIndex={0}
    >
      <Avatar
        size={AvatarSizeType.Medium}
        title={fullName}
        imageURL={picture?.uri}
      />
      <div
        className={`truncate text-xs cursor-pointer ${
          selected ? "font-semibold" : "group-hover:font-semibold"
        }`}
      >
        {fullName}
      </div>
      <div
        className={`whitespace-nowrap ml-auto text-2xs cursor-pointer ${
          selected
            ? "text-grey-dark"
            : "text-grey-middle group-hover:text-grey-dark"
        }`}
      >
        {createdAt && formatDistance(new Date(createdAt), new Date())}
      </div>
    </div>
  );
};

export default CandidateRow;
