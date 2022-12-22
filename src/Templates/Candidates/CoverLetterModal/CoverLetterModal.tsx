import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import Modal from "Components/UI/atoms/Modal";
import PopupHeader from "Components/UI/molecules/PopupHeader";

interface ICoverLetterModal {
  open?: boolean;
  content?: string;
  onClose: () => void;
}
const CoverLetterModal = ({ open, content, onClose }: ICoverLetterModal) => (
  <Modal
    open={!!open}
    header={<PopupHeader label="Cover letter" onClose={onClose} />}
    onClose={onClose}
  >
    <div className="w-[50vw] max-w-[500px] p-6 flex flex-col">
      <div className="min-h-[300px] max-h-[50vh] overflow-auto grow whitespace-pre-wrap">
        {content}
      </div>
      <div className="pr-3 ml-auto">
        <Button
          variant={ButtonVariantType.Outlined}
          color={ColorType.Info}
          label="Close"
          className="mt-1"
          onClick={onClose}
        />
      </div>
    </div>
  </Modal>
);

export default CoverLetterModal;
