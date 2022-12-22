import { NavLink } from "react-router-dom";
import { routes } from "Routes/routes";
import { useMsal } from "@azure/msal-react";

import MMLogo from "Assets/Images/mm-logo.svg";
import { hasUserAccess } from "Authentication/BackOffice/authorization";
import {
  AllowedDashboardRoles,
  AllowedCommonRoles,
} from "Authentication/BackOffice/allowedRoles";
import { useState, useEffect, useContext } from "react";
import Popover from "Components/UI/organisms/Popover";
import IconButton from "Components/UI/atoms/IconButton";
import ButtonVariantType from "Components/UI/atoms/Button/buttonVariantType";
import { ReactComponent as BellIcon } from "Assets/Icons/bell.svg";
import WeavyApp from "Weavy/WeavyApp";
import WeavyContext from "Weavy/WeavyContext";
import { getWeavyBadges } from "API/Calls/weavy";
import {
  TWeavyBadgeCountResponse,
  TWeavyBadgeCounts,
} from "API/Types/Weavy/weavy";

const Header = () => {
  const { accounts } = useMsal();

  const shouldShowDashboard = hasUserAccess(accounts, AllowedDashboardRoles);
  const shouldShowCommonMenu = hasUserAccess(accounts, AllowedCommonRoles);

  const menuItems = [];

  if (shouldShowDashboard) {
    menuItems.push(["Dashboard", routes.dashboard.url]);
  }

  if (shouldShowCommonMenu) {
    menuItems.push(["Jobs", routes.jobs.url]);
    menuItems.push(["Candidates", routes.candidates.url]);
    menuItems.push(["Companies", routes.companies.url]);
  }

  const [showBadge, setShowBadge] = useState("hidden");
  const [openNotifs, setOpenNotifs] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const { weavy } = useContext(WeavyContext);

  useEffect(() => {
    getWeavyBadges().then((res: TWeavyBadgeCountResponse) => {
      if (res.data.notifications > 0) {
        setShowBadge("inline-block");
      } else {
        setShowBadge("hidden");
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  weavy.on("badge", (data: TWeavyBadgeCounts) => {
    if (data.notifications > 0) {
      setShowBadge("inline-block");
    } else {
      setShowBadge("hidden");
    }
  });

  weavy.on("create-root", (e: any, createRoot: any) => {
    weavy.plugins.theme.addCss(
      createRoot.root,
      ".weavy-panel, .weavy-panel-frame { transition: none !important; }"
    );
  });

  return (
    <header className="h-20 grid grid-cols-3 content-center items-center pl-8 pr-8 border-b border-alto bg-white">
      <img src={MMLogo} alt="MM Logo" />
      <ul className="flex justify-self-center" role="navigation">
        {menuItems.map(([title, url]) => (
          <li key={title}>
            <NavLink
              to={url}
              className={({ isActive }) =>
                `text-sm flex items-center align justify-center h-20 w-28 ${
                  isActive &&
                  "bg-blue-secondary  border-blue-main border-b-2 font-semibold"
                }`
              }
            >
              {title}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex justify-center items-center">
        <span className="relative inline-block">
          <IconButton
            className="w-6 h-6 text-gray-700 fill-current"
            variant={ButtonVariantType.Text}
            icon={<BellIcon fontSize="inherit" />}
            aria-label="comments"
            size="large"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              setOpenNotifs(true);
              setAnchorEl(e.currentTarget);
            }}
          />
          <span
            className={`${showBadge} absolute top-0 right-0 w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-blue-main rounded-full`}
          />
        </span>
      </div>
      {openNotifs && (
        <Popover
          className="border border-alto"
          open={openNotifs}
          onClose={() => setOpenNotifs(false)}
          anchorEl={anchorEl}
          showHeader
          headerLabel="Notifications"
          transformOrigin={{
            vertical: -15,
            horizontal: 7,
          }}
        >
          <div className="h-64 w-80">
            <WeavyApp
              spaceKey={accounts[0].localAccountId}
              spaceName={accounts[0].localAccountId}
              appKey={accounts[0].localAccountId}
              appName="Notifications"
              appType="notifications"
            />
          </div>
        </Popover>
      )}
    </header>
  );
};

export default Header;
