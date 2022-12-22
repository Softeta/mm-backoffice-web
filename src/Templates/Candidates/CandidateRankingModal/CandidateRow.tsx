import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import Avatar from "Components/UI/atoms/Avatar";
import { TJobSelectedCandidate } from "API/Types/Jobs/Common/jobSelectedCandidate";
import NumberSelect from "Components/UI/molecules/NumberSelect";

type TCandidateRow = {
  candidate: TJobSelectedCandidate;
  selected?: boolean;
  options: number[];
  onSelect?: () => void;
  onRankingChange?: (ranking?: number) => void;
  onBlur?: () => void;
};

export const CandidateRow = ({
  candidate,
  selected,
  options,
  onSelect,
  onRankingChange,
  onBlur,
}: TCandidateRow) => {
  const { firstName = "", lastName = "", picture } = candidate;
  const fullName = `${firstName} ${lastName}`.trim();

  return (
    <div
      className={`w-full py-1 flex items-center gap-2 cursor-pointer rounded group ${
        selected ? "bg-selago" : "hover:bg-blue-middle"
      }`}
      onClick={onSelect}
      onKeyPress={onSelect}
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
      <div className="min-h-[40px] flex items-center ml-auto">
        {selected ? (
          <NumberSelect
            className="min-w-[80px]"
            value={candidate.ranking}
            options={options}
            onChange={onRankingChange}
            onEnter={onBlur}
            onBlur={onBlur}
            autoFocus={selected}
          />
        ) : (
          <div className="rounded px-1 py-0 bg-blue-main text-xs text-white">
            {candidate.ranking}
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateRow;
