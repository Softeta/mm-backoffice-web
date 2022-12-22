type TBadge = {
  text?: string;
  className?: string;
};

export const CandidateRow = ({ text, className = "" }: TBadge) => (
  <span
    className={`bg-red px-1 py-[2px] rounded-[40px] text-2xs text-white flex items-center justify-center ${className}`}
  >
    {text}
  </span>
);

export default CandidateRow;
