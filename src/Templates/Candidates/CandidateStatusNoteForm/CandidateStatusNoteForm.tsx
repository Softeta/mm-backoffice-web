import TextField from "Components/UI/atoms/TextField";
import Modal from "Components/UI/atoms/Modal";
import PopupHeader from "Components/UI/molecules/PopupHeader";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ColorType from "Components/Enums/colorType";
import { ChangeEvent, useEffect, useState } from "react";
import Divide from "Components/UI/atoms/Divide";
import MenuItem from "Components/UI/atoms/MenuItem";
import { TCandidateNote } from "API/Types/Candidate/Common/candidateNote";
import DatePicker from "Components/UI/molecules/DatePicker";

interface IProps {
  open?: boolean;
  statusNote?: TCandidateNote;
  onStatusNoteChange: (note?: TCandidateNote) => void;
  onClose: () => void;
}

const predefinedStatuses = [
  "👶 Parental leave",
  "🌴 Vacation / Leave",
  "🚫 Not available currently",
];

const CandidateStatusNoteForm = ({
  open = false,
  statusNote,
  onStatusNoteChange,
  onClose,
}: IProps) => {
  const [value, setValue] = useState(statusNote?.value);
  const [endDate, setEndDate] = useState(statusNote?.endDate);
  const [isNoteFieldOnFocus, setIsNoteFieldOnFocus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<number | undefined>(
    undefined
  );

  const reset = () => {
    setValue(statusNote?.value);
    setEndDate(statusNote?.endDate);
    setSelectedStatus(undefined);
  };

  const handleSubmit = () => {
    onStatusNoteChange(
      value?.trim()
        ? {
            value: value.trim(),
            endDate,
          }
        : undefined
    );
  };

  const handleTextFieldFocus = () => {
    setIsNoteFieldOnFocus(true);
    setSelectedStatus(undefined);
  };

  const handleStatusSelect = (index: number) => {
    setSelectedStatus(index);
    setValue(predefinedStatuses[index]);
  };

  const handleStatusNoteChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e?.target.value);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    setValue(statusNote?.value);
    setEndDate(statusNote?.endDate);
  }, [statusNote]);

  return (
    <Modal
      open={open}
      header={
        <PopupHeader label="Add a new note or status" onClose={handleClose} />
      }
    >
      <div className="w-[392px] p-4">
        <form onSubmit={handleSubmit}>
          <div className="pb-3">
            <DatePicker
              label="Enter end date"
              value={endDate}
              onChange={(date) => setEndDate(date as Date)}
            />
          </div>
          <TextField
            multiline
            fullWidth
            label="Enter your note here"
            inputProps={{
              maxLength: 250,
            }}
            value={value}
            InputLabelProps={{ shrink: !!value || isNoteFieldOnFocus }}
            onChange={handleStatusNoteChange}
            onFocus={handleTextFieldFocus}
            onBlur={() => setIsNoteFieldOnFocus(false)}
          />
          <p className="text-grey-middle text-xs pt-4 pb-2">
            Or select from predefined statuses
          </p>
          {predefinedStatuses.map((status, index) => (
            <MenuItem
              // eslint-disable-next-line react/no-array-index-key
              key={`status-${index}`}
              selected={selectedStatus === index}
              value={status}
              onClick={() => handleStatusSelect(index)}
              tabIndex={0}
            >
              {status}
            </MenuItem>
          ))}
          <Divide />
          <div className="col-span-2 text-right flex">
            <div className="pr-3 ml-auto">
              <Button
                variant={ButtonVariantType.Outlined}
                color={ColorType.Info}
                label="Cancel"
                className="mt-1"
                onClick={handleClose}
              />
            </div>
            <div>
              <Button label="Save" className="mt-1" onClick={handleSubmit} />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CandidateStatusNoteForm;
