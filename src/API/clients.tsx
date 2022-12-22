import axios from "axios";
import { msalInstance } from "Pages/index";
import { loginRequest } from "Authentication/BackOffice/config";

export const acquireAccessToken = async () => {
  const activeAccount = msalInstance.getActiveAccount();
  const accounts = msalInstance.getAllAccounts();
  const request = {
    ...loginRequest,
    account: activeAccount || accounts[0],
  };
  const authResult = await msalInstance.acquireTokenSilent(request);
  return authResult.accessToken;
};

export const backOfficeHttpClient = axios.create({
  baseURL: process.env.REACT_APP_BACKOFFICE_API,
  headers: {
    "Content-type": "application/json",
  },
});

export const autocompleteGeocoderHttpClient = axios.create({
  baseURL: process.env.REACT_APP_AUTOCOMPLETE_GEOCODER_API,
  headers: {
    "Content-type": "application/json",
  },
});

autocompleteGeocoderHttpClient.interceptors.request.use(async (config) => ({
  ...config,
  params: {
    ...config.params,
    language: "en",
    apiKey: process.env.REACT_APP_GEOCODER_API_KEY,
  },
}));

export const weavyClient = axios.create({
  baseURL: process.env.REACT_APP_WEAVY_API,
  headers: {
    "Content-type": "application/json",
  },
});
