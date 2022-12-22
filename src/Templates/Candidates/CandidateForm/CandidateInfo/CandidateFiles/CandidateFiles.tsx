import CircularProgress from "@mui/material/CircularProgress";
import {
  addCurriculumVitaeCache,
  deleteCurriculumVitaeCache,
  updateCurriculumVitaeCache,
} from "API/Calls/candidateCurriculumVitae";
import { parseCurriculumVitae } from "API/Calls/candidates";
import {
  addVideoCache,
  deleteVideoCache,
  updateVideoCache,
} from "API/Calls/candidateVideo";
import { TCvCandidate } from "API/Types/Candidate/candidateFromCv";
import { TConfigurations } from "API/Types/configurations";
import Button from "Components/UI/atoms/Button/Button";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import Divide from "Components/UI/atoms/Divide";
import DivideVariantType from "Components/UI/atoms/Divide/divideVariantType";
import FileCacheUpload from "Components/UI/molecules/FileUpload/FileCacheUpload";
import {
  TFile,
  UploadType,
} from "Components/UI/molecules/FileUpload/FileUpload";
import { ConfigurationsContext } from "Contexts/Configurations/ConfigurationsContext";
import { useContext, useEffect, useState } from "react";

export enum InputNames {
  cv = "cv",
  video = "video",
}

interface IProps {
  defaultCurriculumVitaeCacheId?: string;
  defaultVideoCacheId?: string;
  selectedCurriculumVitae?: TFile;
  selectedVideo?: TFile;
  onVideoUpload: (cacheId?: string) => void;
  onCurriculumVitaeUpload: (cacheId?: string) => void;
  onVideoLoading: (loading: boolean) => void;
  onCurriculumVitaeLoading: (loading: boolean) => void;
  onCandidateCvParsed: (data: TCvCandidate) => void;
}
const CandidateFiles = ({
  defaultCurriculumVitaeCacheId,
  defaultVideoCacheId,
  selectedCurriculumVitae,
  selectedVideo,
  onVideoUpload,
  onCurriculumVitaeUpload,
  onVideoLoading,
  onCurriculumVitaeLoading,
  onCandidateCvParsed,
}: IProps) => {
  const { documentSettings, videoSettings } = useContext<TConfigurations>(
    ConfigurationsContext
  );

  const cvParseAllowedExtension = ".pdf";

  const [isParsing, setIsParsing] = useState(false);
  const [showCvParser, setShowCvParser] = useState(false);
  const [selectedCvFile, setSelectedCvFile] = useState(selectedCurriculumVitae);

  const handleCurriculumVitaeLoading = (loading: boolean): void => {
    onCurriculumVitaeLoading(loading);
    if (loading) {
      setShowCvParser(false);
      setIsParsing(false);
    }
  };

  const handleCurriculumVitaeParse = () => {
    setIsParsing(true);
    parseCurriculumVitae({
      fileUri: selectedCurriculumVitae?.uri,
      fileCacheId: defaultCurriculumVitaeCacheId,
    })
      .then((res) => {
        setIsParsing(false);
        onCandidateCvParsed(res.data);
      })
      .catch(() => {
        setIsParsing(false);
      });
  };

  const isCvParsingAllowed = (file?: TFile) =>
    !!file?.name?.endsWith(cvParseAllowedExtension);

  const handleCurriculumVitaeUpload = (
    cacheId?: string,
    file?: TFile
  ): void => {
    setShowCvParser(isCvParsingAllowed(file));
    setIsParsing(false);
    onCurriculumVitaeUpload(cacheId);
    setSelectedCvFile(file);
  };

  useEffect(() => {
    setShowCvParser(isCvParsingAllowed(selectedCurriculumVitae));
  }, [selectedCurriculumVitae]);

  return (
    <>
      <p className="h4 font-semibold col-span-2 mb-4">Curriculum Vitae</p>
      {!isParsing && (
        <FileCacheUpload
          size={documentSettings.maxSizeInKilobytes}
          label="Upload CV"
          changeLabel="Change CV"
          uploadType={UploadType.File}
          supportedExtensions={documentSettings.supportedExtensions}
          defaultCacheId={defaultCurriculumVitaeCacheId}
          selectedFile={selectedCvFile}
          onDeleteFileCache={deleteCurriculumVitaeCache}
          onUpdateFileCache={updateCurriculumVitaeCache}
          onAddFileCache={addCurriculumVitaeCache}
          onFileCacheUpdated={handleCurriculumVitaeUpload}
          onLoading={handleCurriculumVitaeLoading}
        />
      )}
      {!isParsing && showCvParser && (
        <Button
          label="Parse CV"
          variant={ButtonVariantType.Text}
          onClick={handleCurriculumVitaeParse}
        />
      )}
      {isParsing && <CircularProgress size="1.5rem" />}
      <Divide
        variant={DivideVariantType.Horizontal}
        size={6}
        className="col-span-2"
      />
      <p className="h4 font-semibold col-span-2 mb-4">Video</p>
      <FileCacheUpload
        label="Upload video"
        changeLabel="Change video"
        uploadType={UploadType.File}
        size={videoSettings.maxSizeInKilobytes}
        supportedExtensions={videoSettings.supportedExtensions}
        defaultCacheId={defaultVideoCacheId}
        selectedFile={selectedVideo}
        onDeleteFileCache={deleteVideoCache}
        onUpdateFileCache={updateVideoCache}
        onAddFileCache={addVideoCache}
        onFileCacheUpdated={onVideoUpload}
        onLoading={onVideoLoading}
      />
    </>
  );
};

export default CandidateFiles;
