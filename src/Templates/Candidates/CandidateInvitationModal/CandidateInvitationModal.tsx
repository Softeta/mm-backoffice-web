import Popover from "Components/UI/organisms/Popover";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ColorType from "Components/Enums/colorType";
import CopyIcon from "Assets/Icons/copy.svg";
import EmailIcon from "Assets/Icons/email.svg";
import CheckSuccessIcon from "Assets/Icons/check-success.svg";
import { useState } from "react";
import { inviteSelectedCandidates } from "API/Calls/jobCandidates";
import { TJobCandidates } from "API/Types/Jobs/jobCandidatesGet";

interface IProps {
  isModalOpen: boolean;
  onSetOpenModal: (isOpen: boolean) => void;
  onSubmit: (date: TJobCandidates) => void;
  jobId: string;
  candidateIds: string[];
  popupAnchorEl?: HTMLButtonElement;
}

const formatInvitationUrl = () =>
  `${process.env.REACT_APP_SELFSERVICE_WEBSITE}/myprofile`;

const copyToClipboard = (url: string) => {
  navigator.clipboard.writeText(url);
};

const CandidateInvitationModal = ({
  isModalOpen,
  jobId,
  candidateIds,
  popupAnchorEl,
  onSetOpenModal,
  onSubmit,
}: IProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [sent, setSent] = useState<boolean>(false);

  const handleSendEmail = async () => {
    const result = await inviteSelectedCandidates(
      jobId,
      { candidateIds },
      "email"
    );
    onSubmit(result.data);
    setSent(true);
    setTimeout(() => {
      setSent(false);
    }, 3000);
  };

  const handleCopy = async () => {
    const result = await inviteSelectedCandidates(
      jobId,
      { candidateIds },
      "link"
    );
    const url = formatInvitationUrl();
    onSubmit(result.data);
    copyToClipboard(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Popover
      open={isModalOpen}
      onClose={() => onSetOpenModal(false)}
      anchorEl={popupAnchorEl}
      transformOrigin={{
        vertical: 210,
        horizontal: 150,
      }}
      showHeader
      headerLabel="Invite"
      PaperProps={{ style: { width: "250px" } }}
    >
      <div className="px-6 divide-y divide-grey-lightest">
        <div>
          {!sent && (
            <Button
              label="Send email"
              startIcon={<img src={EmailIcon} alt="email" />}
              variant={ButtonVariantType.Text}
              color={ColorType.Info}
              className="mt-1 w-full"
              onClick={handleSendEmail}
            />
          )}
          {sent && (
            <Button
              label="Email sent"
              startIcon={<img src={CheckSuccessIcon} alt="check" />}
              variant={ButtonVariantType.Text}
              color={ColorType.Success}
              className="mt-1 w-full cursor-default"
            />
          )}
        </div>
        <div>
          {!copied && (
            <Button
              label="Copy link"
              startIcon={<img src={CopyIcon} alt="copy" />}
              variant={ButtonVariantType.Text}
              color={ColorType.Info}
              className="mt-1 w-full"
              onClick={handleCopy}
            />
          )}
          {copied && (
            <Button
              label="Copied to clipboard"
              startIcon={<img src={CheckSuccessIcon} alt="check" />}
              variant={ButtonVariantType.Text}
              color={ColorType.Success}
              className="mt-1 w-full cursor-default"
            />
          )}
        </div>
      </div>
    </Popover>
  );
};

export default CandidateInvitationModal;
