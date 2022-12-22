import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import PersonIcon from "@mui/icons-material/Person";
import { MouseEventHandler } from "react";
import { TCandidateInteractive } from "../types";

interface ISelectControls {
  selectedItems?: TCandidateInteractive[];
  onActivateClick: MouseEventHandler<HTMLButtonElement>;
  onCancel: () => void;
}
const ArchiveSelectControls = ({
  selectedItems = [],
  onActivateClick,
  onCancel,
}: ISelectControls) => (
  <div className="flex items-center gap-6">
    <p className="subtitle2">{selectedItems.length} candidates selected</p>
    <Button
      label="Activate"
      variant={ButtonVariantType.Contained}
      color={ColorType.Primary}
      startIcon={<PersonIcon />}
      onClick={onActivateClick}
    />
    <Button
      label="Cancel"
      variant={ButtonVariantType.Text}
      color={ColorType.Info}
      onClick={onCancel}
    />
  </div>
);

export default ArchiveSelectControls;
