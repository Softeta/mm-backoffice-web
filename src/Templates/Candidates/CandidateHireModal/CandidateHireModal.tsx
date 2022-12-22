import Modal from "Components/UI/atoms/Modal";
import PopupHeader from "Components/UI/molecules/PopupHeader";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ColorType from "Components/Enums/colorType";
import { TCandidateInteractive } from "../CandidatesGrid/types";

interface IProps {
  candidate: TCandidateInteractive;
  open: boolean;
  onHire: () => void;
  onClose: () => void;
}

const CandidateHireModal = ({ candidate, open, onHire, onClose }: IProps) => (
  <Modal
    open={open}
    header={
      <PopupHeader
        label={`${candidate?.firstName} ${candidate?.lastName} should be marked as hired?`}
        onClose={onClose}
      />
    }
  >
    <div className="px-6 py-5 flex flex-col">
      After this candidate will be marked as hired, the job will be placed in
      archive with status Hired.
    </div>
    <div className="flex p-4">
      <Button
        className="ml-auto"
        variant={ButtonVariantType.Contained}
        color={ColorType.Primary}
        label="Yes"
        onClick={onHire}
      />
    </div>
  </Modal>
);

export default CandidateHireModal;
