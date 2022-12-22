import { TFileResponse } from "API/Types/fileResponse";

export type TJobCandidate = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  picture?: TFileResponse;
  brief?: string;
  isInvited: boolean;
  hasApplied: boolean;
};
