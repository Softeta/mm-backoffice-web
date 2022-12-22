import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "Components/UI/organisms/Header";
import PrivateRoute from "Routes/BackOffice/PrivateRoute";
import {
  AllowedCommonRoles,
  AllowedDashboardRoles,
} from "Authentication/BackOffice/allowedRoles";
import { RouteParams, routes } from "Routes/routes";
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";
import { InteractionType, PublicClientApplication } from "@azure/msal-browser";
import { loginRequest, msalConfig } from "Authentication/BackOffice/config";
import { getWeavyJwt } from "API/Calls/weavy";
import Candidates from "Pages/Candidates";
import Jobs from "Pages/Jobs";
import Dashboard from "Pages/Dashboard";
import Unauthorized from "Pages/Unauthorized";
import BackOfficeProvider from "Contexts/BackOfficeProvider";
import Weavy from "Weavy/Weavy";
import Home from "./Home";
import Companies from "./Companies";
import CompanyEditModal from "./Modals/CompanyEditModal";
import JobEditModal from "./Modals/JobEditModal";
import CandidateEditModal from "./Modals/CandidateEditModal";

export const msalInstance = new PublicClientApplication(msalConfig);
export const BackOffice = () => {
  const getJwt = async () => {
    const token = await getWeavyJwt().then((res) => res.data.accessToken);
    return token;
  };

  return (
    <BrowserRouter>
      <MsalProvider instance={msalInstance}>
        <MsalAuthenticationTemplate
          interactionType={InteractionType.Redirect}
          authenticationRequest={loginRequest}
        >
          <Weavy jwt={getJwt}>
            <BackOfficeProvider>
              <>
                <Header />

                <Routes>
                  <Route path={routes.home} element={<Home />} />
                  <Route
                    path={routes.unauthorized.url}
                    element={
                      <PrivateRoute allowedRoles={[]}>
                        <Unauthorized />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path={routes.dashboard.url}
                    element={
                      <PrivateRoute allowedRoles={AllowedDashboardRoles}>
                        <Dashboard />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path={routes.jobs.url}
                    element={
                      <PrivateRoute allowedRoles={AllowedCommonRoles}>
                        <Jobs />
                      </PrivateRoute>
                    }
                  >
                    <Route
                      path={`:${RouteParams.jobId}`}
                      element={
                        <PrivateRoute allowedRoles={AllowedCommonRoles}>
                          <JobEditModal />
                        </PrivateRoute>
                      }
                    />
                  </Route>
                  <Route
                    path={routes.candidates.url}
                    element={
                      <PrivateRoute allowedRoles={AllowedCommonRoles}>
                        <Candidates />
                      </PrivateRoute>
                    }
                  >
                    <Route
                      path={`:${RouteParams.candidateId}`}
                      element={
                        <PrivateRoute allowedRoles={AllowedCommonRoles}>
                          <CandidateEditModal />
                        </PrivateRoute>
                      }
                    />
                  </Route>
                  <Route
                    path={routes.companies.url}
                    element={
                      <PrivateRoute allowedRoles={AllowedCommonRoles}>
                        <Companies />
                      </PrivateRoute>
                    }
                  >
                    <Route
                      path={`:${RouteParams.companyId}`}
                      element={
                        <PrivateRoute allowedRoles={AllowedCommonRoles}>
                          <CompanyEditModal />
                        </PrivateRoute>
                      }
                    />
                  </Route>
                </Routes>
              </>
            </BackOfficeProvider>
          </Weavy>
        </MsalAuthenticationTemplate>
      </MsalProvider>
    </BrowserRouter>
  );
};

export default BackOffice;
