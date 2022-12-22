import { useMsal } from "@azure/msal-react";
import { hasUserAccess } from "Authentication//BackOffice/authorization";
import { AllowedDashboardRoles } from "Authentication/BackOffice/allowedRoles";
import { Navigate } from "react-router-dom";
import { routes } from "Routes/routes";

const Home = () => {
  const { accounts } = useMsal();

  const canAccessDashboard = hasUserAccess(accounts, AllowedDashboardRoles);

  if (canAccessDashboard) {
    return <Navigate to={routes.dashboard.url} />;
  }

  return <Navigate to={routes.jobs.url} />;
};

export default Home;
