import { TFileCacheResponse } from "API/Types/fileCache";
import { useEffect, useState } from "react";
import Utils from "Utils/utils";
import FileUpload, { TFile, UploadType } from "./FileUpload";

interface IProps {
  /** css class names */
  className?: string;
  /** Max allowed file size in bytes */
  size?: number;
  /** Supported extensions  */
  supportedExtensions: string[];
  /** Upload type */
  uploadType: UploadType;
  /** Label */
  label: string;
  /** Change label */
  changeLabel: string;
  /** Selected file */
  selectedFile?: TFile;
  /** Initial cacheId */
  defaultCacheId?: string;
  /** Callback to send updated cacheid */
  onFileCacheUpdated: (cacheId?: string, file?: TFile) => void;
  /** API call to delete file cache */
  onDeleteFileCache: (cacheId: string) => Promise<void>;
  /** API call to update file cache */
  onUpdateFileCache: (
    cacheId: string,
    file: FormData
  ) => Promise<TFileCacheResponse>;
  /** API call to add file cache */
  onAddFileCache: (file: FormData) => Promise<TFileCacheResponse>;
  /** Callback to send loading status */
  onLoading: (loading: boolean) => void;
}

export const FileCacheUpload = ({
  className,
  size,
  supportedExtensions,
  uploadType,
  selectedFile,
  label,
  changeLabel,
  defaultCacheId,
  onFileCacheUpdated,
  onDeleteFileCache,
  onUpdateFileCache,
  onAddFileCache,
  onLoading,
}: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cacheId, setCacheId] = useState(defaultCacheId);
  const [isErrorOccured, setIsErrorOccured] = useState<boolean>(false);

  useEffect(() => {
    setCacheId(defaultCacheId);
  }, [defaultCacheId]);

  const setLoaders = (loading: boolean) => {
    onLoading(loading);
    setIsLoading(loading);
  };

  const errorOccured = () => {
    setLoaders(false);
    setIsErrorOccured(true);
  };

  const assignFileCache = (id?: string, file?: TFile) => {
    setCacheId(id);
    setLoaders(false);
    onFileCacheUpdated(id, file);
  };

  const handleFileUpload = async (file?: TFile) => {
    setIsErrorOccured(false);
    if (selectedFile?.uri === file?.uri) return;
    setLoaders(true);

    if (!file && cacheId) {
      try {
        await onDeleteFileCache(cacheId);
        assignFileCache(undefined);
      } catch {
        errorOccured();
      }
    }

    if (!file) {
      assignFileCache(undefined, undefined);
      setLoaders(false);
      return;
    }

    if (cacheId) {
      try {
        const response = await onUpdateFileCache(
          cacheId,
          Utils.ObjectToFormData({ file })
        );
        assignFileCache(response.data.cacheId, file);
      } catch {
        errorOccured();
      }
    } else {
      try {
        const response = await onAddFileCache(Utils.ObjectToFormData({ file }));
        assignFileCache(response.data.cacheId, file);
      } catch {
        errorOccured();
      }
    }
  };

  return (
    <FileUpload
      className={className}
      size={size}
      label={label}
      changeLabel={changeLabel}
      avatar
      uploadType={uploadType}
      selectedFile={selectedFile}
      onFileUploaded={handleFileUpload}
      supportedExtensions={supportedExtensions}
      loading={isLoading}
      errorOccured={isErrorOccured}
    />
  );
};

export default FileCacheUpload;
