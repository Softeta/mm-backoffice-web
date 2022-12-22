import { Accept } from "react-dropzone";

export type TConfigurationsResponse = {
  data: {
    imageSettings: TFileSettingsResponse;
    videoSettings: TFileSettingsResponse;
    documentSettings: TFileSettingsResponse;
  };
};

type TFileSettingsResponse = {
  supportedTypes: string[];
  maxSizeInKilobytes: number;
  supportedExtensions: string[];
};

type TFileSettings = {
  supportedTypes: Accept;
  maxSizeInKilobytes: number;
  supportedExtensions: string[];
};

export type TConfigurations = {
  imageSettings: TFileSettings;
  videoSettings: TFileSettings;
  documentSettings: TFileSettings;
};
