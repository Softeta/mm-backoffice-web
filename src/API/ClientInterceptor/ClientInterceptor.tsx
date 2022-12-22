import { AxiosInstance } from "axios";
import { ReactNode, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import snackbarState from "Components/UI/molecules/Snackbar/snackbarState";
import { AlertType } from "Components/UI/molecules/Snackbar";
import { t } from "i18next";
import { acquireAccessToken } from "API/clients";
import parser from "html-react-parser";
import { ErrorResponse, TagsErrorResponse } from "API/Types/error";

const translationsWithLink: Record<string, string> = {
  "Conflict.CandidateAlreadyExists": "candidates/{2}",
  "Conflict.CandidateLinkedInAlreadyExists": "candidates/{2}",
};

interface IProps {
  client: AxiosInstance;
}

const interpolateParameters = (params: string[], value: string) => {
  let replacedValue = value;
  for (let index = 0; index < params.length; index += 1) {
    replacedValue = replacedValue.replace(`{${index}}`, params[index]);
  }
  return replacedValue;
};

const translateLink = (
  key: string,
  params: string[],
  translatedValue: string
): ReactNode => {
  const href = interpolateParameters(params, translationsWithLink[key]);
  let htmlAsString = `<p>${translatedValue}</p>`;
  const regex = /{([0-9])-link}/;
  const match = htmlAsString.match(regex);
  if (match && match.length > 1) {
    htmlAsString = htmlAsString.replace(
      regex,
      `<a className="underline" href="${href}">${params[+match[1]]}</a>`
    );
  }

  return parser(htmlAsString);
};

const isTagError = (error: TagsErrorResponse | ErrorResponse): boolean =>
  !!(error as TagsErrorResponse).response.data?.code;

const getTranslatedTagErrorMessage = (error: TagsErrorResponse) => {
  const errorCode = error.response.data?.code;
  return errorCode ? t(`Error.${errorCode}`) : undefined;
};
const getTranslatedErrorMessage = (
  error: ErrorResponse
): string | ReactNode | undefined => {
  const errorCode = error.response?.data?.Code;
  const parameters = error.response?.data?.Parameters;
  const translatedValue = errorCode && t(`Error.${errorCode}`);

  if (translatedValue && !parameters) return translatedValue;

  if (translatedValue && parameters) {
    const interpolatedValue = interpolateParameters(
      parameters,
      translatedValue
    );
    const isTranslateWithLink = Object.prototype.hasOwnProperty.call(
      translationsWithLink,
      errorCode
    );

    return isTranslateWithLink
      ? translateLink(errorCode, parameters, interpolatedValue)
      : interpolatedValue;
  }

  const isServerError =
    error.response.status &&
    error.response.status >= 500 &&
    error.response.status <= 599;

  return isServerError ? t("Error.Unhandled") : undefined;
};

export const ClientInterceptor = ({ client }: IProps) => {
  const setSnackbar = useSetRecoilState(snackbarState);

  useEffect(() => {
    client.interceptors.request.use(async (config) => {
      /* eslint-disable no-param-reassign */
      const token = await acquireAccessToken();
      config.headers!.Authorization = `Bearer ${token}`;
      return config;
    });

    client.interceptors.response.use(
      (response) => response,
      (error) => {
        const message = isTagError(error)
          ? getTranslatedTagErrorMessage(error)
          : getTranslatedErrorMessage(error);
        if (message) {
          setSnackbar({
            open: true,
            message,
            severity: AlertType.error,
          });
        }
        return Promise.reject(error);
      }
    );
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [client]);

  return null;
};
