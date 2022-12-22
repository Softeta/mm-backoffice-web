import Popover from "Components/UI/organisms/Popover";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ColorType from "Components/Enums/colorType";
import TextField from "Components/UI/atoms/TextField";
import CopyIcon from "Assets/Icons/copy.svg";
import CheckSuccessIcon from "Assets/Icons/check-success.svg";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { putSharingViaEmail, putSharingViaLink } from "API/Calls/jobs";
import {
  TShareJobViaEmailRequest,
  TShareJobViaEmailResponse,
  TShareJobViaLinkResponse,
} from "API/Types/Jobs/jobSharing";

interface IProps {
  isModalOpen: boolean;
  onSetOpenModal: (isOpen: boolean) => void;
  onSubmitSharing: (date: Date) => void;
  jobId: string;
  popupAnchorEl?: HTMLButtonElement;
}

interface ISharingInformation {
  email: string;
}

const validationSchema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const formatSharingUrl = (key: string, jobId: string) =>
  `${process.env.REACT_APP_PUBLIC_WEBSITE}/jobs/${jobId}/public/${key}`;

const copyToClipboard = (url: string) => {
  navigator.clipboard.writeText(url);
};

const JobSharing = ({
  isModalOpen,
  jobId,
  popupAnchorEl,
  onSetOpenModal,
  onSubmitSharing,
}: IProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const methods = useForm<ISharingInformation>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const handleSubmit = () => {
    const request: TShareJobViaEmailRequest = {
      receiverEmail: methods.getValues("email"),
    };
    putSharingViaEmail(request, jobId).then(
      (res: TShareJobViaEmailResponse) => {
        onSubmitSharing(res.data.date);
      }
    );
  };

  const handleClose = () => {
    methods.reset();
    onSetOpenModal(false);
  };

  const handleCopy = () => {
    putSharingViaLink(jobId).then((res: TShareJobViaLinkResponse) => {
      const url = formatSharingUrl(res.data.key, jobId);
      copyToClipboard(url);
      onSubmitSharing(res.data.date);

      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    });
  };

  const isValid = () => methods.formState.isValid;

  return (
    <Popover
      open={isModalOpen}
      onClose={handleClose}
      anchorEl={popupAnchorEl}
      transformOrigin={{
        vertical: 265,
        horizontal: 225,
      }}
      showHeader
      headerLabel="Share information"
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <div className="pt-5 pb-2 px-6 divide-y divide-grey-lightest">
            <div className="pb-8 grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <Controller
                  name="email"
                  control={methods.control}
                  render={({ field: { onChange } }) => (
                    <TextField
                      label="Email"
                      value={methods.getValues("email")}
                      onChange={onChange}
                    />
                  )}
                />
              </div>
              <div>
                <Button
                  label="Share"
                  disabled={!isValid()}
                  className="mt-1"
                  onClick={handleSubmit}
                />
              </div>
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
        </form>
      </FormProvider>
    </Popover>
  );
};

export default JobSharing;
