import { AccountInfo } from "@azure/msal-browser";

export const hasUserAccess = (
  account: AccountInfo[],
  allowedRoles: string[]
) => {
  if (!allowedRoles.length) {
    return true;
  }

  const claims = account[0].idTokenClaims as any;
  const roles: string[] = claims.roles ?? [];

  return roles.some((userRole) => allowedRoles.includes(userRole));
};

export default hasUserAccess;
