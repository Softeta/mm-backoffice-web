import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import CheckIcon from "Assets/Icons/check.svg";
import { format } from "date-fns";
import DateFormats from "Enums/dateFormats";

interface IShortlistControls {
  shortlistActivated: boolean;
  shortListActivatedAt?: Date;
  onRanking: () => void;
  onPreview: () => void;
  onSend: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}
const ShortlistControls = ({
  shortlistActivated,
  shortListActivatedAt,
  onRanking,
  onPreview,
  onSend,
  disabled = false,
}: IShortlistControls) => (
  <div className="flex items-center gap-6">
    <div className="ml-auto">
      {shortListActivatedAt && (
        <span className="text-xs text-grey-middle">
          {"Shortlist has been activated on: "}
          {format(new Date(shortListActivatedAt), DateFormats.DateWithTime)}
        </span>
      )}
    </div>
    <Button
      label="Ranking"
      variant={ButtonVariantType.Outlined}
      color={ColorType.Info}
      onClick={onRanking}
      disabled={disabled}
    />
    <Button
      label="Preview shortlist"
      variant={ButtonVariantType.Outlined}
      color={ColorType.Info}
      onClick={onPreview}
      disabled={disabled}
    />
    <Button
      label={
        (shortlistActivated && "Shortlist activated") ||
        (shortListActivatedAt && "Shortlist active") ||
        "Activate shortlist"
      }
      variant={ButtonVariantType.Contained}
      color={shortlistActivated ? ColorType.Success : ColorType.Primary}
      startIcon={
        shortlistActivated ? <img src={CheckIcon} alt="check" /> : null
      }
      onClick={onSend}
      disabled={disabled}
    />
  </div>
);

export default ShortlistControls;
