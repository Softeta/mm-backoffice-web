import { CircularProgress } from "@mui/material";
import fetchConfigurationsData from "API/Calls/configurations";
import { TConfigurations } from "API/Types/configurations";
import { IProvider } from "Contexts/IProvider";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  ConfigurationsContext,
  initConfigurations,
} from "./ConfigurationsContext";

export const ConfigurationsProvider = ({ children }: IProvider) => {
  const [configurations, setConfigurations] =
    useState<TConfigurations>(initConfigurations);
  const { isLoading, isError, data } = useQuery("configurationsData", () =>
    fetchConfigurationsData()
  );

  useEffect(() => {
    if (data?.data) {
      const configs: TConfigurations = {
        imageSettings: {
          supportedExtensions: data.data.imageSettings.supportedExtensions,
          maxSizeInKilobytes: data.data.imageSettings.maxSizeInKilobytes * 1e3,
          supportedTypes: data.data.imageSettings.supportedTypes.reduce(
            (a, v) => ({ ...a, [v]: [] }),
            {}
          ),
        },
        videoSettings: {
          supportedExtensions: data.data.videoSettings.supportedExtensions,
          maxSizeInKilobytes: data.data.videoSettings.maxSizeInKilobytes * 1e3,
          supportedTypes: data.data.videoSettings.supportedTypes.reduce(
            (a, v) => ({ ...a, [v]: [] }),
            {}
          ),
        },
        documentSettings: {
          supportedExtensions: data.data.documentSettings.supportedExtensions,
          maxSizeInKilobytes:
            data.data.documentSettings.maxSizeInKilobytes * 1e3,
          supportedTypes: data.data.documentSettings.supportedTypes.reduce(
            (a, v) => ({ ...a, [v]: [] }),
            {}
          ),
        },
      };
      setConfigurations(configs);
    }
  }, [data]);

  if (isLoading) return <CircularProgress />;
  if (isError) return <p>Error</p>;

  return (
    <ConfigurationsContext.Provider value={configurations}>
      {children}
    </ConfigurationsContext.Provider>
  );
};

export default ConfigurationsProvider;
