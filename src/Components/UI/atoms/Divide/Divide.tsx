import DivideVariantType from "./divideVariantType";

interface IProps {
  className?: string;
  variant?: DivideVariantType;
  size?: number | string;
}

const Divide = ({
  className,
  variant = DivideVariantType.Horizontal,
  size = 4,
}: IProps) =>
  variant === DivideVariantType.Vertical ? (
    <div
      className={`w-px self-stretch bg-alto ${`ml-${size} mr-${size}`} ${
        className ?? ""
      }`}
    />
  ) : (
    <div
      className={`h-px w-full bg-alto ${`mt-${size} mb-${size}`} ${
        className ?? ""
      }`}
    />
  );

export default Divide;
