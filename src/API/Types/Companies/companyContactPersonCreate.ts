import ContactPersonRoles from "Enums/contactPersonRoles";
import { TFileAddRequest } from "../fileRequest";

export type TCompanyContactPersonCreateRequest = {
  email: string;
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
  picture?: TFileAddRequest;
};
