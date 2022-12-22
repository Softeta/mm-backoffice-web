import { TPosition } from "API/Types/position";
import ContactPersonRoles from "Enums/contactPersonRoles";
import ContactPersonStage from "Enums/contactPersonStage";
import { TPhone } from "../../phone";
import { TFileResponse } from "../../fileResponse";

export type TCompanyContactPerson = {
  id: string;
  email: string;
  stage: ContactPersonStage;
  isEmailVerified: boolean;
  role: ContactPersonRoles;
  firstName?: string;
  lastName?: string;
  position?: TPosition;
  phone?: TPhone;
  picture?: TFileResponse;
};
