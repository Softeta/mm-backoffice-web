import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import Avatar from "Components/UI/atoms/Avatar";
import { formatDistance } from "date-fns";
import { TJobBriefResponse } from "API/Types/Jobs/jobGet";

type TJobRow = {
  job: TJobBriefResponse;
  selected?: boolean;
  onSelect?: () => void;
};

export const JobRow = ({ job, selected, onSelect }: TJobRow) => {
  const { companyName, position, companyLogoUri, createdAt } = job;
  return (
    <div
      className={`w-full py-2 flex items-center gap-2 cursor-pointer rounded group ${
        selected ? "bg-blue-middle" : "hover:bg-blue-middle"
      }`}
      onClick={onSelect}
      onKeyPress={onSelect}
      role="menuitem"
      tabIndex={0}
    >
      <Avatar
        size={AvatarSizeType.Medium}
        title={companyName}
        imageURL={companyLogoUri}
      />
      <div
        className={`truncate text-xs cursor-pointer ${
          selected ? "font-semibold" : "group-hover:font-semibold"
        }`}
      >
        {`${companyName} - ${position}`}
      </div>
      <div
        className={`whitespace-nowrap ml-auto text-2xs cursor-pointer ${
          selected
            ? "text-grey-dark"
            : "text-grey-middle group-hover:text-grey-dark"
        }`}
      >
        {formatDistance(new Date(createdAt), new Date())}
      </div>
    </div>
  );
};

export default JobRow;
