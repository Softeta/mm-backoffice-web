import { TCompanySearch } from "API/Types/Companies/companySearchGet";
import { TPagedResponse } from "API/Types/pagedResponse";
import ContactPersonRoles from "Enums/contactPersonRoles";
import ContactPersonStage from "Enums/contactPersonStage";
import { rest } from "msw";

const companiesSearchHandler = rest.get(
  `${process.env.REACT_APP_BACKOFFICE_API}/api/v1/companies/search`,
  (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json<TPagedResponse<TCompanySearch>>({
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
            contactPersons: [
              {
                id: "DFE44E8A-75EE-4E15-9773-043EF9EA7874",
                role: ContactPersonRoles.Admin,
                firstName: "John",
                lastName: "Doe",
                stage: ContactPersonStage.Approved,
                phone: {
                  countryCode: "+370",
                  number: "60000000",
                  phoneNumber: "+37060000000",
                },
                email: "john.doe@gmail.com",
                isEmailVerified: true,
                picture: {
                  uri: "https://stmmcompanydev.blob.core.windows.net/logos/16a5b5bf-da54-4d9e-85ba-53cba88ee1cf.png",
                },
              },
              {
                id: "B7C395CC-2DE8-4821-A58F-085261A3F62C",
                role: ContactPersonRoles.Admin,
                firstName: "Robert",
                lastName: "Smith",
                stage: ContactPersonStage.Approved,
                phone: {
                  countryCode: "+370",
                  number: "60000000",
                  phoneNumber: "+37060000000",
                },
                email: "robert.smith@gmail.com",
                isEmailVerified: true,
                picture: {
                  uri: "https://stmmcompanydev.blob.core.windows.net/logos/16a5b5bf-da54-4d9e-85ba-53cba88ee1cf.png",
                },
              },
            ],
          },
          {
            id: "605CBCC2-A517-4E08-B7CC-111AB5654FF9",
            name: "Opel",
            registrationNumber: "Opel",
            logo: {
              uri: "https://stmmcompanydev.blob.core.windows.net/logos/d6139b60-5046-4330-842a-24181fef8f26.jpg",
            },
            contactPersons: [
              {
                id: "DFE44E8A-75EE-4E15-9773-043EF9EA7874",
                role: ContactPersonRoles.User,
                firstName: "John",
                lastName: "Doe",
                stage: ContactPersonStage.Approved,
                phone: {
                  countryCode: "+370",
                  number: "60000000",
                  phoneNumber: "+37060000000",
                },
                email: "john.doe@gmail.com",
                isEmailVerified: false,
                picture: {
                  uri: "https://stmmcompanydev.blob.core.windows.net/logos/16a5b5bf-da54-4d9e-85ba-53cba88ee1cf.png",
                },
              },
              {
                id: "B7C395CC-2DE8-4821-A58F-085261A3F62C",
                role: ContactPersonRoles.Admin,
                firstName: "Robert",
                lastName: "Smith",
                stage: ContactPersonStage.Approved,
                phone: {
                  countryCode: "+370",
                  number: "60000000",
                  phoneNumber: "+37060000000",
                },
                email: "robert.smith@gmail.com",
                isEmailVerified: true,
                picture: {
                  uri: "https://stmmcompanydev.blob.core.windows.net/logos/16a5b5bf-da54-4d9e-85ba-53cba88ee1cf.png",
                },
              },
            ],
          },
          {
            id: "FBD6C24F-9138-410D-81D8-0AD4D720E464",
            name: "Nissan",
            registrationNumber: "Nissan",
            logo: {
              uri: "https://stmmcompanydev.blob.core.windows.net/logos/c063c537-d8da-4c69-af16-62ee4b264681.png",
            },
            contactPersons: [
              {
                id: "DFE44E8A-75EE-4E15-9773-043EF9EA7874",
                role: ContactPersonRoles.Admin,
                firstName: "John",
                lastName: "Doe",
                stage: ContactPersonStage.Approved,
                phone: {
                  countryCode: "+370",
                  number: "60000000",
                  phoneNumber: "+37060000000",
                },
                email: "john.doe@gmail.com",
                isEmailVerified: true,
                picture: {
                  uri: "https://stmmcompanydev.blob.core.windows.net/logos/16a5b5bf-da54-4d9e-85ba-53cba88ee1cf.png",
                },
              },
            ],
          },
        ],
      })
    )
);

export default companiesSearchHandler;
