import { CircularProgress } from "@mui/material";
import fetchClassificatorData from "API/Calls/classificators";
import { TClassificators } from "API/Types/classificators";
import { IProvider } from "Contexts/IProvider";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  ClassificatorsContext,
  initClassificators,
} from "./ClassificatorsContext";

export const ClassificatorsProvider = ({ children }: IProvider) => {
  const [classificators, setClassificators] =
    useState<TClassificators>(initClassificators);

  const { isLoading, isError, data } = useQuery("classificatorData", () =>
    fetchClassificatorData()
  );

  useEffect(() => {
    if (data?.data) {
      setClassificators(data.data);
    }
  }, [data]);

  if (isLoading) return <CircularProgress />;
  if (isError) return <p>Error</p>;

  return (
    <ClassificatorsContext.Provider value={classificators}>
      {children}
    </ClassificatorsContext.Provider>
  );
};

export default ClassificatorsProvider;
