import { Button } from "@mui/material";
import ColorType from "Components/Enums/colorType";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import CloseIcon from "Assets/Icons/close.svg";

interface IProps {
  label?: string;
  onClose: () => void;
}
const PopupHeader = ({ label, onClose }: IProps) => (
  <div className="bg-blue-secondary rounded-t-2xl py-5 px-6">
    <div className="flex justify-between h-9">
      <div className="h3 self-center">{label ?? ""}</div>
      <Button
        className="min-w-0"
        variant={ButtonVariantType.Text}
        endIcon={<img src={CloseIcon} alt="" />}
        color={ColorType.Info}
        onClick={onClose}
      />
    </div>
  </div>
);

export default PopupHeader;
