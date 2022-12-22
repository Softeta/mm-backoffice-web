import { rest } from "msw";
import { TPagedResponse } from "API/Types/pagedResponse";
import { TCandidateBrief } from "API/Types/Candidate/candidatesBriefGet";

const candidatesHandler = rest.get(
  `${process.env.REACT_APP_BACKOFFICE_API}/api/v1/candidates`,
  (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json<TPagedResponse<TCandidateBrief>>({
        count: 3,
        data: [
          {
            id: "d96a8847-9049-4288-ac9b-9985b7198bde",
            picture: {
              uri: "https://stmmcandidatedev.blob.core.windows.net/pictures/24e703ed-a105-4b0a-94b0-5cbe1174d954.jpg",
            },
            fullName: "Jonas Jonaitis",
            currentPosition: { id: "123-1", code: "Junior developer" },
            address: {
              addressLine: "Lithuania, Vilnius",
              city: "Vilnius",
              country: "Lithuania",
              postalCode: "333333",
            },
            startDate: new Date("2022-06-01T00:00:00+03:00"),
            endDate: new Date("2022-06-05T00:00:00+03:00"),
            currency: "EUR",
            permanent: {
              monthlySalary: 45226,
            },
            freelance: {
              monthlySalary: 45226,
              hourlySalary: 10023,
            },
            openForOpportunities: false,
            isShortlisted: false,
            createdAt: new Date("2022-07-20T13:56:14.854496+00:00"),
            isHired: false,
          },
          {
            id: "9b415c46-5a11-4014-a20f-dafc5a456548",
            picture: {
              uri: "https://stmmcandidatedev.blob.core.windows.net/pictures/c0687c9f-f67f-4c1d-b910-accb800dbf05.jpeg",
            },
            fullName: "Kasparas Gecas",
            linkedInUrl: "http://localhost:5011/swagger/index.html",
            address: {
              addressLine: "Lithuania, Vilnius Žalgirio g. 135",
              city: "Vilnius",
              country: "Lithuania",
              postalCode: "545454",
              longitude: 15.14577,
              latitude: 13.584847,
            },
            openForOpportunities: true,
            isShortlisted: true,
            createdAt: new Date("2022-07-20T13:56:14.854496+00:00"),
            isHired: false,
          },
          {
            id: "9b415c46-5a11-4014-a20f-dafc5adf6549",
            fullName: "Vincas Kudirka",
            linkedInUrl: "http://localhost:5011/swagger/index.html",
            address: {
              addressLine: "Lithuania, Naumiestis Žalgirio g. 135",
              city: "Naumiestis",
              country: "Lithuania",
              postalCode: "535353",
              longitude: 22.14577,
              latitude: 13.584847,
            },
            openForOpportunities: false,
            isShortlisted: true,
            createdAt: new Date("2022-07-20T13:56:14.854496+00:00"),
            isHired: false,
          },
        ],
        currentPage: 1,
        pageSize: 100,
        nextPagePath: "www.nextPage.com",
        previousPagePath: "www.previousPage.com",
      })
    )
);

export default candidatesHandler;
