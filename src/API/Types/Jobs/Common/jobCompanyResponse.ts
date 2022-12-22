import { TAddress } from "API/Types/address";
import { TFileResponse } from "API/Types/fileResponse";
import { TJobCompanyContactPersonResponse } from "./jobCompanyContactPersonResponse";

export type TJobCompanyResponse = {
  id: string;
  name: string;
  address: TAddress;
  description?: string;
  logo?: TFileResponse;
  contactPersons: TJobCompanyContactPersonResponse[];
};
