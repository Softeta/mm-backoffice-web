import React from "react";
import ReactDOM from "react-dom";
import "Theme/index.css";
import reportWebVitals from "reportWebVitals";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import BackOffice from "Pages";
import { ThemeProvider } from "@emotion/react";
import Theme from "Theme";
import { worker } from "mocks/browser";
import { I18nextProvider } from "react-i18next";
import i18next from "i18n/config";
import { backOfficeHttpClient } from "API/clients";
import { RecoilRoot } from "recoil";
import Snackbar from "Components/UI/molecules/Snackbar";
import { ClientInterceptor } from "API/ClientInterceptor/ClientInterceptor";

worker.start({ onUnhandledRequest: "bypass" });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={Theme}>
      <RecoilRoot>
        <Snackbar />
        <ClientInterceptor client={backOfficeHttpClient} />
        <QueryClientProvider client={queryClient}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <I18nextProvider i18n={i18next}>
              <BackOffice />
            </I18nextProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </LocalizationProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
