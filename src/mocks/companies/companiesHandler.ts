import { TCompanyBrief } from "API/Types/Companies/companyBriefGet";
import { TPagedResponse } from "API/Types/pagedResponse";
import { rest } from "msw";

const companiesHandler = rest.get(
  `${process.env.REACT_APP_BACKOFFICE_API}/api/v1/companies`,
  (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json<TPagedResponse<TCompanyBrief>>({
        count: 4,
        pageSize: 20,
        currentPage: 1,
        data: [
          {
            id: "D964E02C-723C-4C70-BC5E-29BDC0DC06B6",
            name: "Tesla",
            registrationNumber: "Tesla",
            logo: {
              uri: "https://stmmcompanydev.blob.core.windows.net/logos/7caf1707-ce54-4d3d-bad3-7e58b0a61199.png",
            },
            industries: [
              {
                id: "DFE44E8A-75EE-4E15-9773-043EF9EA7874",
                code: "Banking",
              },
            ],
            createdAt: new Date(),
          },
          {
            id: "605CBCC2-A517-4E08-B7CC-111AB5654FF9",
            name: "Opel",
            registrationNumber: "Opel",
            logo: {
              uri: "https://stmmcompanydev.blob.core.windows.net/logos/d6139b60-5046-4330-842a-24181fef8f26.jpg",
            },
            createdAt: new Date(),
          },
          {
            id: "FBD6C24F-9138-410D-81D8-0AD4D720E464",
            name: "Nissan",
            registrationNumber: "Nissan",
            logo: {
              uri: "https://stmmcompanydev.blob.core.windows.net/logos/c063c537-d8da-4c69-af16-62ee4b264681.png",
            },
            industries: [
              {
                id: "DFE44E8A-75EE-4E15-9773-043EF9EA7874",
                code: "Accounting",
              },
              {
                id: "DFE44E8A-75EE-4E15-9773-043EF9EA7875",
                code: "Software",
              },
            ],
            createdAt: new Date(),
          },
        ],
      })
    )
);

export default companiesHandler;
