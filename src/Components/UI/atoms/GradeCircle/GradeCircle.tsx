import clsx from "clsx";

interface IProps {
  grade: string;
  isActive: boolean;
}

export const GradeCircle = ({ grade, isActive }: IProps) => (
  <div
    className={clsx(
      "grid h-7 w-7 items-center justify-items-center rounded-full",
      !isActive && "bg-blue-secondary text-early-evening",
      isActive && "bg-blue-main text-white"
    )}
  >
    <span className="text-base font-semibold">{grade}</span>
  </div>
);
