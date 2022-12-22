import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import Modal from "Components/UI/atoms/Modal";
import TextField from "Components/UI/atoms/TextField";
import PopupHeader from "Components/UI/molecules/PopupHeader";
import { ChangeEvent, useEffect, useState } from "react";

interface ICandidateBriefModal {
  open?: boolean;
  content?: string;
  onSubmit?: (text?: string) => void;
  onClose: () => void;
}
const CandidateBriefModal = ({
  open,
  content: contentProps,
  onSubmit,
  onClose,
}: ICandidateBriefModal) => {
  const [brief, setBrief] = useState<string | undefined>(contentProps);

  const reset = () => {
    setBrief(contentProps);
  };

  const handleBriefChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBrief(e?.target.value);
  };

  const handleSubmit = () => {
    if (!onSubmit) return;

    const value = brief?.trim();
    if (!value) onSubmit(undefined);
    else onSubmit(value);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  useEffect(() => {
    setBrief(contentProps);
  }, [contentProps]);

  return (
    <Modal
      open={!!open}
      header={<PopupHeader label="Candidate brief" onClose={onClose} />}
      onClose={onClose}
    >
      <div className="min-h-[300px] max-h-[50vh] w-[392px] p-4 overflow-auto grow flex flex-col">
        <form onSubmit={handleSubmit}>
          <TextField
            multiline
            fullWidth
            value={brief}
            inputProps={{
              maxLength: 3000,
            }}
            onChange={handleBriefChange}
          />
        </form>

        <div className="col-span-2 text-right flex gap-3 mt-auto">
          <Button
            variant={ButtonVariantType.Outlined}
            color={ColorType.Info}
            label="Cancel"
            className="mt-1 ml-auto"
            onClick={handleClose}
          />
          <Button label="Save" className="mt-1" onClick={handleSubmit} />
        </div>
      </div>
    </Modal>
  );
};

export default CandidateBriefModal;
