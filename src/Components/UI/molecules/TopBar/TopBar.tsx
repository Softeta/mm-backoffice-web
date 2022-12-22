import Button from "Components/UI/atoms/Button";
import ColorType from "Components/Enums/colorType";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import CloseIcon from "Assets/Icons/close.svg";
import DivideVariantType from "Components/UI/atoms/Divide/divideVariantType";
import Divide from "Components/UI/atoms/Divide";

type TTopBar = {
  children?: React.ReactNode;
  className?: string;
  onClose?: () => void;
};

export const TopBar = ({ children, className, onClose }: TTopBar) => (
  <div
    className={`flex items-center px-6 py-4 border-b border-alto ${
      className ?? ""
    }`}
  >
    {onClose && (
      <>
        <Button
          color={ColorType.Info}
          label="Close"
          onClick={onClose}
          startIcon={<img src={CloseIcon} alt="" />}
          variant={ButtonVariantType.Text}
        />
        <Divide variant={DivideVariantType.Vertical} />
      </>
    )}
    {children}
  </div>
);

export default TopBar;
