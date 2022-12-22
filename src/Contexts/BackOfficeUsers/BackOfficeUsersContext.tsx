import { TBackOfficeUser } from "API/Types/backOfficeUsers";
import { createContext } from "react";

const BackOfficeUsersContext = createContext([] as TBackOfficeUser[]);

export default BackOfficeUsersContext;
