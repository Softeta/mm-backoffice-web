import ContactPersonRoles from "Enums/contactPersonRoles";
import { TFileUpdateRequest } from "../fileRequest";

export type TCompanyContactPersonUpdateRequest = {
  role: ContactPersonRoles;
  firstName: string;
  lastName: string;
  position?: {
    id: string;
    code: string;
  };
  phone?: {
    countryCode?: string;
    number?: string;
  };
  picture?: TFileUpdateRequest;
};
