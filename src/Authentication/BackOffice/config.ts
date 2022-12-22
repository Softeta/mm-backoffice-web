import { Configuration, RedirectRequest } from "@azure/msal-browser";
import routes from "Routes/routes";

export const msalConfig: Configuration = {
  auth: {
    clientId: process.env.REACT_APP_BACKOFFICE_APP_ID || "",
    authority: `https://login.microsoftonline.com/${process.env.REACT_APP_BACKOFFICE_TENANT_ID}`,
    redirectUri: routes.home,
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

const protectedResources = {
  scopes: [process.env.REACT_APP_BACKOFFICE_SCOPE || ""],
};

export const loginRequest: RedirectRequest = {
  scopes: protectedResources.scopes,
};
