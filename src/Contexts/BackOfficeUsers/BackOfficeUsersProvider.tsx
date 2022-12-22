import { CircularProgress } from "@mui/material";
import fetchBackOfficeUsers from "API/Calls/backOfficeUsers";
import { TBackOfficeUser } from "API/Types/backOfficeUsers";
import { IProvider } from "Contexts/IProvider";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import BackOfficeUsersContext from "./BackOfficeUsersContext";

export const BackOfficeUsersProvider = ({ children }: IProvider) => {
  const [backOfficeUsers, setBackOfficeUsers] = useState<TBackOfficeUser[]>([]);

  const { isLoading, isError, data } = useQuery("backOfficeUsers", () =>
    fetchBackOfficeUsers()
  );

  useEffect(() => {
    if (data?.data?.users) {
      setBackOfficeUsers(data.data.users);
    }
  }, [data]);

  if (isLoading) return <CircularProgress />;
  if (isError) return <p>Error</p>;

  return (
    <BackOfficeUsersContext.Provider value={backOfficeUsers}>
      {children}
    </BackOfficeUsersContext.Provider>
  );
};

export default BackOfficeUsersProvider;
