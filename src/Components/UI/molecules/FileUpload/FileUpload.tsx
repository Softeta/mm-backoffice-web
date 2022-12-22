import { useCallback, useEffect, useState } from "react";
import { useDropzone, FileError } from "react-dropzone";
import UploadIcon from "Assets/Icons/upload.svg";
import ChangeIcon from "Assets/Icons/change.svg";
import BinIcon from "Assets/Icons/bin.svg";
import Button from "Components/UI/atoms/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import ColorType from "Components/Enums/colorType";
import Avatar from "Components/UI/atoms/Avatar";
import AvatarSizeType from "Components/UI/atoms/Avatar/avatarSizeType";
import CircularProgress from "@mui/material/CircularProgress";
import FileLink from "./FileLink";

export enum UploadType {
  Image = "image",
  File = "file",
}

interface IProps {
  /** Max allowed file size in bytes */
  size?: number;
  /** On file upload callback */
  onFileUploaded?: (file?: TFile) => void;
  /** On file upload error callback */
  onFileUploadError?: (error?: FileError) => void;
  /** Label displayed next to upload icon */
  label?: string;
  /** Change file label */
  changeLabel: string;
  /** Displays preview image in Avatar component */
  avatar?: boolean;
  /** Upload type */
  uploadType: UploadType;
  /** Supported extensions  */
  supportedExtensions: string[];
  /** Selected file */
  selectedFile?: TFile;
  /** No active buttons when loading */
  loading?: boolean;
  /** css class names */
  className?: string;
  /** if response failure */
  errorOccured: boolean;
}

export type TFile = File & {
  uri: ReturnType<typeof URL.createObjectURL>;
};

export const FileUpload = ({
  size,
  onFileUploaded,
  onFileUploadError,
  label,
  changeLabel,
  avatar,
  uploadType,
  selectedFile,
  supportedExtensions,
  loading,
  className,
  errorOccured,
}: IProps) => {
  const [uploadedFile, setUploadedFile] = useState<TFile | undefined>(
    selectedFile
  );
  const [error, setError] = useState<FileError[]>();

  const buildFile = (file: File) =>
    Object.assign(file, {
      uri: file.size ? URL.createObjectURL(file) : "",
    });

  useEffect(() => {
    if (selectedFile) {
      setUploadedFile(selectedFile);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (errorOccured) {
      setUploadedFile(undefined);
    }
  }, [errorOccured]);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (fileRejections.length) {
      setError(fileRejections[0].errors);
      return;
    }

    const acceptedFile = acceptedFiles[0];

    setUploadedFile(buildFile(acceptedFile));
    setError(undefined);
  }, []);

  useEffect(() => {
    onFileUploaded?.(uploadedFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadedFile]);

  useEffect(() => {
    onFileUploadError?.(error?.[0]);
    if (error?.[0]) {
      setUploadedFile(undefined);
    }
  }, [onFileUploadError, error]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "*/*": supportedExtensions,
    },
    maxSize: size,
  });

  const handleRemoveLogoClick = () => {
    setError(undefined);
    setUploadedFile(undefined);
    onFileUploadError?.();
  };

  const handleChangeLogoClick = () => {
    open();
  };

  return (
    <div className={`text-xs text-grey-light ${className}`}>
      {!uploadedFile && (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className="flex items-center cursor-pointer">
            <img src={UploadIcon} alt="" className="mr-2" />
            <p className="font-semibold mr-2">{label}</p>
            {size && size < 1e6 && <span>(Size up to {size / 1000}kB)</span>}
            {size && size >= 1e6 && <span>(Size up to {size / 1e6}mB)</span>}
          </div>
          <div>
            {supportedExtensions.map((x) => (
              <span className="pr-1">{x}</span>
            ))}
          </div>
          {error && (
            <p className="ml-4 text-red break-words">{error[0].message}</p>
          )}
        </div>
      )}
      {uploadedFile && (
        <>
          {uploadType === UploadType.File && (
            <FileLink uri={selectedFile?.uri} name={uploadedFile?.name} />
          )}
          <div className="flex items-center">
            {avatar && uploadType === UploadType.Image && (
              <Avatar
                imageURL={uploadedFile?.uri}
                size={AvatarSizeType.Large}
              />
            )}
            {!avatar && uploadType === UploadType.Image && (
              <img
                src={uploadedFile?.uri}
                alt=""
                className="max-w-[40px] mr-3"
              />
            )}
            {!loading && (
              <>
                <Button
                  label={changeLabel}
                  variant={ButtonVariantType.Text}
                  onClick={handleChangeLogoClick}
                  color={ColorType.Info}
                  className="text-xs"
                  startIcon={<img src={ChangeIcon} alt="" />}
                />
                <Button
                  label="Remove"
                  variant={ButtonVariantType.Text}
                  onClick={handleRemoveLogoClick}
                  color={ColorType.Info}
                  className="text-xs"
                  startIcon={<img src={BinIcon} alt="" />}
                />
              </>
            )}
            {loading && <CircularProgress size="1.5rem" />}
          </div>
        </>
      )}
    </div>
  );
};

export default FileUpload;
