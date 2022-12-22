import { TFileResponse } from "API/Types/fileResponse";
import { TPosition } from "API/Types/position";

export type TContactPerson = {
  id: string;
  firstName?: string;
  lastName?: string;
  position?: TPosition;
  email: string;
  phone?: string;
  picture?: TFileResponse;
  isMainContact?: boolean;
};
