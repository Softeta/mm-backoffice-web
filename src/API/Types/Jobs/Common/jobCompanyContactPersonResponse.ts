import { TFileResponse } from "API/Types/fileResponse";
import { TPosition } from "API/Types/position";

export type TJobCompanyContactPersonResponse = {
  id: string;
  isMainContact: boolean;
  firstName?: string;
  lastName?: string;
  position?: TPosition;
  phoneNumber?: string;
  email: string;
  picture?: TFileResponse;
};
