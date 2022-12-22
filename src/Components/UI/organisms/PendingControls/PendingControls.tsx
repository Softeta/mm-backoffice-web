import Link from "@mui/material/Link";
import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";
import CheckIcon from "@mui/icons-material/Check";

interface IPendingControls {
  className?: string;
  email?: string;
  onReject?: () => void;
  onApprove?: () => void;
}
const PendingControls = ({
  className = "",
  email,
  onReject,
  onApprove,
}: IPendingControls) => (
  <div className={`flex items-center gap-6 ${className}`}>
    <Link
      className="no-underline"
      href={`mailto:${email}`}
      target="_blank"
      rel="noreferrer"
    >
      <Button
        label="Send email"
        variant={ButtonVariantType.Outlined}
        color={ColorType.Info}
        startIcon={<MailOutlineIcon />}
      />
    </Link>
    <Button
      label="Reject"
      variant={ButtonVariantType.Contained}
      color={ColorType.Error}
      startIcon={<DoNotDisturbIcon />}
      onClick={onReject}
    />
    <Button
      label="Approve"
      variant={ButtonVariantType.Contained}
      color={ColorType.Success}
      startIcon={<CheckIcon />}
      onClick={onApprove}
    />
  </div>
);

export default PendingControls;
