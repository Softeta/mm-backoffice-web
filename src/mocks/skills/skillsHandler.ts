import { TPagedResponse } from "API/Types/pagedResponse";
import { TSkill } from "API/Types/skills";
import { rest } from "msw";

const skillsHandler = rest.get(
  `${process.env.REACT_APP_BACKOFFICE_API}/api/v1/skills`,
  (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json<TPagedResponse<TSkill>>({
        count: 15,
        currentPage: 1,
        pageSize: 100,
        data: [
          { id: "C9062C18-DA5D-4D1A-9517-EC36ADACA3FD", code: "Jira" },
          {
            id: "072C63CC-AA17-40BC-9113-00DDF65668CA",
            code: "Microsoft Word",
          },
          {
            id: "0FB3E039-4901-4B47-991F-57ED669AD2ED",
            code: "Sales Management",
          },
          { id: "448E3193-22B5-4F3F-8C12-5A9FBC73A60F", code: "IntelliMatch" },
          { id: "4493F4F3-A797-4204-A512-E149C0F75A5B", code: "Scrum" },
          {
            id: "1B946F6B-2A91-434E-9C9A-09F79513FAF0",
            code: "Money Transfers",
          },
          {
            id: "67984AD8-15D4-467E-9B00-BFC5A62709E1",
            code: "Microsoft Visual Studio C++",
          },
          { id: "557F6031-EAE8-4DF8-9C4D-F145CDEF155B", code: "BPMN" },
          { id: "0BC1CCA2-03C7-4DAE-AFF2-BB6EDA7B0648", code: "Kanban" },
          { id: "A3383893-E740-4C88-BDA0-0B8719E85D69", code: "Confluence" },
          { id: "D45275A2-7132-471A-A47B-F96DBC313CB8", code: "SharePoint" },
          {
            id: "B6465D73-802A-4FB7-A859-1AD963A0C603",
            code: "Microsoft PowerPoint",
          },
          {
            id: "22D1C0A1-FC86-4913-AB53-9E14323E321F",
            code: "Reporting & Analysis",
          },
          { id: "19ABF924-3B18-43DA-89F8-955BA1240F5B", code: "Fraud" },
          { id: "2B21DC8E-039D-4A65-866C-403AD3C2490B", code: "Leadership" },
          {
            id: "D14B3A67-0E33-47AE-8BF4-71D7DE7F4B8D",
            code: "Agile & Waterfall Methodologies",
          },
          {
            id: "11BB28FA-8F09-4E23-AA8B-B1B79EA09A19",
            code: "Business Analysis",
          },
          { id: "6F11E34A-EBC8-4D55-9A07-F14552E57ABB", code: "IBM BlueWorks" },
          { id: "03F457ED-BF30-4ACD-A4F3-4DD613CD39CF", code: "ARIS" },
          {
            id: "4442F323-F639-4E55-8A73-4274BF3EB1A4",
            code: "Microsoft Excel",
          },
          {
            id: "2B462D67-C623-4FE3-9B75-88326B61C486",
            code: "Visual Merchandising",
          },
          {
            id: "2607B23B-559E-49C3-A017-52DA6C122143",
            code: "Performance Improvement",
          },
          {
            id: "72BC8F24-ADE7-468D-93F6-695A526FF492",
            code: "SWIFT Messaging",
          },
          { id: "C8660E94-E9CA-4FC4-96AA-4F31289AEAED", code: "Lean Thinking" },
          {
            id: "B015BCBA-3094-490D-A65E-D71F5FE8F0EB",
            code: "Microsoft Outlook",
          },
          {
            id: "E456B4D1-39C9-47AD-983C-760F399D14BE",
            code: "Key Performance Indicators",
          },
          {
            id: "518445C2-6D86-447B-A85A-671936A86F56",
            code: "SWIFT Payments",
          },
          {
            id: "6709B3C7-AFB3-4572-9AB6-97F6BC451FCA",
            code: "Lean Process Improvement",
          },
          { id: "595B9FD6-6D90-407C-A32E-FF1F57B531F7", code: "IBM BPM" },
          {
            id: "98EE2426-B9F1-4C96-B688-88C2F878F124",
            code: "Microsoft Office",
          },
          {
            id: "7B864540-6CE5-40FD-9B38-64AF890FCF7D",
            code: "Anti Money Laundering",
          },
          {
            id: "F3B7AA2D-51E1-4001-809B-BB2FA74BCE08",
            code: "Project Management",
          },
          { id: "53FC39DE-4A03-430B-BB8E-BFEA1904D677", code: "Camunda BPM" },
          {
            id: "F066C58B-EA1D-4B86-A913-B91AA28ED86C",
            code: "Requirements Analysis",
          },
          {
            id: "7E33DDEB-1413-41B3-BA3C-938507C817FD",
            code: "Customer Service Operations",
          },
          {
            id: "9C03AE71-3217-45B2-AA30-8BD929DE06AA",
            code: "UAT Coordination",
          },
        ],
      })
    )
);

export default skillsHandler;
