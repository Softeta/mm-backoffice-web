export enum CircleSide {
  Left,
  Right,
}

interface IProps {
  text: string;
  side: CircleSide;
  className?: string;
}
const Circle = ({ text, side, className }: IProps) => (
  <div
    className={`text-2xs font-bold leading-4 w-4 h-4 text-center absolute rounded-full aspect-square ${
      side === CircleSide.Left ? " -left-2" : " -right-2"
    } -top-1 z-10 ${className ?? "bg-red-light"}`}
  >
    {text.substring(0, 1)}
  </div>
);
export default Circle;
