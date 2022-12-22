import { TConfigurations } from "API/Types/configurations";
import { createContext } from "react";

const initConfigurations: TConfigurations = {
  imageSettings: {
    supportedExtensions: [],
    maxSizeInKilobytes: 0,
    supportedTypes: {},
  },
  videoSettings: {
    supportedExtensions: [],
    maxSizeInKilobytes: 0,
    supportedTypes: {},
  },
  documentSettings: {
    supportedExtensions: [],
    maxSizeInKilobytes: 0,
    supportedTypes: {},
  },
};

const ConfigurationsContext = createContext({} as TConfigurations);

export { ConfigurationsContext, initConfigurations };
