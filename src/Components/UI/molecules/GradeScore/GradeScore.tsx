import { GradeCircle } from "Components/UI/atoms/GradeCircle";

export type TGradeScore = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

interface IProps {
  grade?: TGradeScore;
}

const grades = Object.freeze([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

export const GradeScore = ({ grade }: IProps) => (
  <div className="flex gap-2">
    {grades.map((g) => (
      <GradeCircle key={g} grade={g.toString()} isActive={g === grade} />
    ))}
  </div>
);
