import Button from "Components/UI/atoms/Button";
import Radio from "Components/UI/atoms/Radio";
import Popover from "Components/UI/organisms/Popover";
import JobStages from "Enums/JobStages";
import { useState } from "react";
import { archiveJob } from "API/Calls/jobs";
import { TArchiveJobRequest } from "API/Types/Jobs/jobArchive";

interface IProps {
  isModalOpen: boolean;
  onSetOpenModal: (isOpen: boolean) => void;
  onSubmit: (jobStage: JobStages) => void;
  jobId: string;
  popupAnchorEl?: HTMLButtonElement;
}

const JobSharing = ({
  isModalOpen,
  jobId,
  popupAnchorEl,
  onSetOpenModal,
  onSubmit,
}: IProps) => {
  const [stage, setStage] = useState<JobStages>();

  const handleClose = () => {
    onSetOpenModal(false);
  };

  const handleSubmit = () => {
    if (stage) {
      const request: TArchiveJobRequest = {
        stage,
      };
      archiveJob(request, jobId).then(() => {
        onSubmit(stage);
      });
    }
  };

  const isValid = () => !!stage;

  return (
    <Popover
      open={isModalOpen}
      onClose={handleClose}
      anchorEl={popupAnchorEl}
      transformOrigin={{
        vertical: 190,
        horizontal: 225,
      }}
      showHeader
      headerLabel="Identify a reason for archiving the job"
    >
      <div className="pt-5 pb-2 px-6">
        <div>
          <Radio
            className="whitespace-nowrap"
            label="On Hold"
            value={JobStages.OnHold}
            onChange={() => setStage(JobStages.OnHold)}
            checked={stage === JobStages.OnHold}
          />
          <Radio
            label="Lost"
            value={JobStages.Lost}
            onChange={() => setStage(JobStages.Lost)}
            checked={stage === JobStages.Lost}
          />

          <Button
            label="Done"
            disabled={!isValid()}
            className="mt-1"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Popover>
  );
};

export default JobSharing;
