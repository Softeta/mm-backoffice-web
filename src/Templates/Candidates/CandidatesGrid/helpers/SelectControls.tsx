import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import Link from "Components/UI/atoms/Link";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import { ReactComponent as SpeachBubbleIcon } from "Assets/Icons/speachBubble.svg";
import { ReactComponent as CallIcon } from "Assets/Icons/call.svg";
import { ReactComponent as BinIcon } from "Assets/Icons/bin.svg";
import StatusSelect from "Components/UI/molecules/StatusSelect";
import SelectedCandidateStages from "Enums/selectedCandidateStages";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { TCandidateInteractive } from "../types";

interface ISelectControls {
  selectedItems?: TCandidateInteractive[];
  allowedToInvite: boolean;
  onCancel: () => void;
  onInviteClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onRemoveClick: () => void;
  onChangeStatusClick: (stage: SelectedCandidateStages) => void;
}
const SelectControls = ({
  selectedItems = [],
  allowedToInvite,
  onCancel,
  onInviteClick,
  onRemoveClick,
  onChangeStatusClick,
}: ISelectControls) => {
  const isSingle = selectedItems.length === 1;
  const phoneNumber = isSingle ? selectedItems[0].phoneNumber : undefined;
  const email = isSingle ? selectedItems[0].email : undefined;

  return (
    <div className="flex items-center gap-6">
      <p className="subtitle2">{selectedItems.length} candidates selected</p>
      <StatusSelect
        selectedCandidatesCount={selectedItems.length}
        onSelect={onChangeStatusClick}
      />
      {allowedToInvite && (
        <Button
          label="Invite"
          variant={ButtonVariantType.Contained}
          color={ColorType.Primary}
          startIcon={<SpeachBubbleIcon />}
          onClick={onInviteClick}
        />
      )}
      {isSingle && (
        <>
          <Button
            label={!phoneNumber ? "Not provided" : phoneNumber}
            disabled={!phoneNumber}
            variant={ButtonVariantType.Contained}
            color={ColorType.Primary}
            startIcon={<CallIcon />}
          />
          <Link
            className="no-underline"
            href={`mailto:${email}`}
            target="_blank"
            rel="noreferrer"
            disabled={!email}
          >
            <Button
              label={!email ? "Not provided" : "Send email"}
              disabled={!email}
              variant={ButtonVariantType.Contained}
              color={ColorType.Primary}
              startIcon={<MailOutlineIcon />}
            />
          </Link>
        </>
      )}
      <Button
        label="Remove"
        variant={ButtonVariantType.Contained}
        color={ColorType.Error}
        startIcon={<BinIcon />}
        onClick={onRemoveClick}
      />
      <Button
        label="Cancel"
        variant={ButtonVariantType.Text}
        color={ColorType.Info}
        onClick={onCancel}
      />
    </div>
  );
};

export default SelectControls;
