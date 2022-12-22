import { yupResolver } from "@hookform/resolvers/yup";
import { activateCandidatesShortList } from "API/Calls/jobCandidates";
import { TJobCandidates } from "API/Types/Jobs/jobCandidatesGet";
import ColorType from "Components/Enums/colorType";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import TextField from "Components/UI/atoms/TextField";
import Popover from "Components/UI/organisms/Popover";
import { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import CopyIcon from "Assets/Icons/copy.svg";
import CheckSuccessIcon from "Assets/Icons/check-success.svg";
import { CircularProgress } from "@mui/material";

interface IProps {
  isModalOpen: boolean;
  jobId: string;
  onSetOpenModal: (isOpen: boolean) => void;
  onSubmit: (jobCandidates: TJobCandidates) => void;
  popupAnchorEl?: HTMLButtonElement;
}

interface ISendShortlist {
  email: string;
}

const validationSchema = yup
  .object({
    email: yup.string().email().required(),
  })
  .required();

const formatShortlistPresentationUrl = (jobId: string) =>
  `${process.env.REACT_APP_SELFSERVICE_WEBSITE}/findtalent/presentation/shortlist/${jobId}`;

export const SendShortlistModal = ({
  isModalOpen,
  jobId,
  popupAnchorEl,
  onSetOpenModal,
  onSubmit,
}: IProps) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [isSendLoading, setIsSendLoading] = useState<boolean>(false);
  const methods = useForm<ISendShortlist>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const handleSubmit = async () => {
    try {
      setIsSendLoading(true);
      const result = await activateCandidatesShortList(jobId, "email", {
        email: methods.getValues().email,
      });
      onSubmit(result.data);
    } finally {
      setIsSendLoading(false);
    }
  };

  const handleClose = () => {
    methods.reset();
    onSetOpenModal(false);
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const handleCopy = async () => {
    const result = await activateCandidatesShortList(jobId, "link");
    const url = formatShortlistPresentationUrl(jobId);
    onSubmit(result.data);
    copyToClipboard(url);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  const isValid = () => methods.formState.isValid;

  return (
    <Popover
      open={isModalOpen}
      onClose={handleClose}
      anchorEl={popupAnchorEl}
      transformOrigin={{
        vertical: 265,
        horizontal: 0,
      }}
      showHeader
      headerLabel="Activate shortlist"
      PaperProps={{ style: { width: "500px" } }}
    >
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit}>
          <div className="pt-5 pb-2 px-6 divide-y divide-grey-lightest">
            <div className="pb-8 grid grid-cols-8 gap-4">
              <div className="col-span-5">
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
              <div className="col-span-3">
                {isSendLoading && (
                  <CircularProgress className="mt-2" size={25} />
                )}
                {!isSendLoading && (
                  <Button
                    label="Activate and send"
                    disabled={!isValid()}
                    className="mt-1"
                    onClick={handleSubmit}
                  />
                )}
              </div>
            </div>
            <div>
              {!copied && (
                <Button
                  label="Activate and copy link"
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

export default SendShortlistModal;
