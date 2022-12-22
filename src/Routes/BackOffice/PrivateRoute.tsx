import { useMsal } from "@azure/msal-react";
import { hasUserAccess } from "Authentication//BackOffice/authorization";
import { Navigate } from "react-router-dom";
import { routes } from "Routes/routes";

const PrivateRoute = ({
  children,
  allowedRoles,
}: {
  children: JSX.Element;
  allowedRoles: string[];
}) => {
  const { accounts } = useMsal();

  const hasAccess = hasUserAccess(accounts, allowedRoles);

  if (hasAccess) {
    return children;
  }

  return <Navigate to={routes.unauthorized.url} />;
};

export default PrivateRoute;
