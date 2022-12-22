import { TPagedResponse } from "API/Types/pagedResponse";
import { TSkill } from "API/Types/skills";
import { rest } from "msw";

const recommendedSkillsHandler = rest.get(
  `${process.env.REACT_APP_BACKOFFICE_API}/api/v1/skills/recommended`,
  (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json<TPagedResponse<TSkill>>({
        count: 7,
        currentPage: 1,
        pageSize: 20,
        data: [
          { id: "D45275A2-7132-471A-A47B-F96DBC313CB8", code: "SharePoint" },

          { id: "2B21DC8E-039D-4A65-866C-403AD3C2490B", code: "Leadership" },
          {
            id: "D14B3A67-0E33-47AE-8BF4-71D7DE7F4B8D",
            code: "Agile & Waterfall Methodologies",
          },
          {
            id: "72BC8F24-ADE7-468D-93F6-695A526FF492",
            code: "SWIFT Messaging",
          },
          {
            id: "518445C2-6D86-447B-A85A-671936A86F56",
            code: "SWIFT Payments",
          },
          {
            id: "F3B7AA2D-51E1-4001-809B-BB2FA74BCE08",
            code: "Project Management",
          },
          {
            id: "F066C58B-EA1D-4B86-A913-B91AA28ED86C",
            code: "Requirements Analysis",
          },
        ],
      })
    )
);

export default recommendedSkillsHandler;
