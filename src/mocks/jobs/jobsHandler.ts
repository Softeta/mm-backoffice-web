import { rest } from "msw";
import { TPagedResponse } from "API/Types/pagedResponse";
import { TJobBriefResponse } from "API/Types/Jobs/jobGet";
import WorkTypes from "Enums/workType";

const jobs = {
  count: 30,
  data: [
    {
      jobId: "a7062d30-3cbc-4e4d-b176-138cc91c1fae",
      companyName: "Tesla Motors",
      companyLogoUri:
        "https://stmmcompanydev.blob.core.windows.net/logos/7caf1707-ce54-4d3d-bad3-7e58b0a61199.png",
      position: "Backend developer",
      freelance: WorkTypes.Freelance,
      permanent: WorkTypes.Permanent,
      jobStage: "Calibration",
      deadlineDate: new Date("2022-03-28T21:56:55+00:00"),
      assignedTo: [
        {
          id: "044ea708-7c7d-4bf5-893d-0556107b9f71",
          firstName: "Kristian",
          lastName: "Ledel",
          pictureUri:
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
        },
      ],
      isPriority: true,
    },
    {
      jobId: "e23237b3-4be2-4c67-9897-1d7e6121b88f",
      companyName: "Toyota",
      companyLogoUri:
        "https://stmmcompanydev.blob.core.windows.net/logos/bebb6677-fafd-44c8-8ba1-b338503a689a.png",
      position: "Frontend developer",
      freelance: WorkTypes.Freelance,
      jobStage: "Calibration",
      deadlineDate: new Date("2022-03-21T12:11:30.284+00:00"),
      assignedTo: [
        {
          id: "0fe55d2d-33c8-4a07-afcd-82f3da9b024f",
          firstName: "Laurynas",
          lastName: "Jonavičius",
          pictureUri:
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
        },
        {
          id: "d852515d-e9e6-425f-8dfc-f3a722d81f84",
          firstName: "Inga",
          lastName: "Skumbinienė",
        },
      ],
      isPriority: true,
    },
    {
      jobId: "ee29a317-4102-4d98-b3a1-49a77a880d74",
      companyName: "Burger king",
      companyLogoUri:
        "https://stmmcompanydev.blob.core.windows.net/logos/603fc5d2-bc0f-4682-a162-050beabd7ba7.jpg",
      position: "Backend developer",
      freelance: WorkTypes.Freelance,
      jobStage: "CandidateSelection",
      deadlineDate: new Date("2024-03-21T22:00:00+00:00"),
      assignedTo: [
        {
          id: "df31cc0d-117a-4122-83d7-b81856e4af5c",
          firstName: "Kasparas",
          lastName: "Gecas",
        },
      ],
      isPriority: false,
    },
    {
      jobId: "2679478b-49aa-4028-860c-52888109d985",
      companyName: "Opel",
      companyLogoUri:
        "https://stmmcompanydev.blob.core.windows.net/logos/d6139b60-5046-4330-842a-24181fef8f26.jpg",
      position: "Frontend developer",
      freelance: WorkTypes.Freelance,
      jobStage: "Calibration",
      deadlineDate: new Date("2022-03-21T12:11:30.284+00:00"),
      assignedTo: [
        {
          id: "0fe55d2d-33c8-4a07-afcd-82f3da9b024f",
          firstName: "Laurynas",
          lastName: "Jonavičius",
          pictureUri:
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
        },
      ],
      isPriority: false,
    },
    {
      jobId: "c2c03b5d-b6d7-4073-8825-6013ea50bc64",
      companyName: "Softeta",
      companyLogoUri:
        "https://stmmcompanydev.blob.core.windows.net/logos/ed691c07-a948-4056-915f-14c74201ea88.png",
      position: "Backend developer",
      freelance: WorkTypes.Freelance,
      jobStage: "Calibration",
      deadlineDate: new Date("2022-03-25T12:11:30+00:00"),
      assignedTo: [
        {
          id: "62e2eda7-737c-498e-82bc-0f82f312834a",
          firstName: "Paulius",
          lastName: "Papaurėlis",
        },
        {
          id: "df31cc0d-117a-4122-83d7-b81856e4af5c",
          firstName: "Kasparas",
          lastName: "Gecas",
        },
      ],
      isPriority: false,
    },
    {
      jobId: "dc01f58f-5ea4-4031-b097-ae7546eda717",
      companyName: "Nissan",
      companyLogoUri:
        "https://stmmcompanydev.blob.core.windows.net/logos/c063c537-d8da-4c69-af16-62ee4b264681.png",
      position: "Frontend developer",
      freelance: WorkTypes.Freelance,
      jobStage: "Calibration",
      deadlineDate: new Date("2022-03-21T12:11:30.284+00:00"),
      assignedTo: [
        {
          id: "044ea708-7c7d-4bf5-893d-0556107b9f71",
          firstName: "Kristian",
          lastName: "Ledel",
          pictureUri:
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
        },
        {
          id: "d852515d-e9e6-425f-8dfc-f3a722d81f84",
          firstName: "Inga",
          lastName: "Skumbinienė",
        },
        {
          id: "0fe55d2d-33c8-4a07-afcd-82f3da9b024f",
          firstName: "Laurynas",
          lastName: "Jonavičius",
          pictureUri:
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
        },
      ],
      isPriority: false,
    },
    {
      jobId: "18896ace-286b-4361-b0a8-e167af13112a",
      companyName: "Nissan",
      companyLogoUri:
        "https://stmmcompanydev.blob.core.windows.net/logos/c063c537-d8da-4c69-af16-62ee4b264681.png",
      position: "Project manager",
      freelance: WorkTypes.Freelance,
      jobStage: "Hired",
      deadlineDate: new Date("2022-03-24T12:11:30+00:00"),
      assignedTo: [
        {
          id: "0fe55d2d-33c8-4a07-afcd-82f3da9b024f",
          firstName: "Laurynas",
          lastName: "Jonavičius",
          pictureUri:
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
        },
      ],
      isPriority: false,
    },
    {
      jobId: "fb603cdf-bf7f-4b1e-ad3f-e5b95d8a07ef",
      companyName: "Tesla",
      companyLogoUri:
        "https://stmmcompanydev.blob.core.windows.net/logos/40c1cf2b-dc8e-40a6-a528-4459a929fc31.png",
      position: "Backend developer",
      permanent: WorkTypes.Permanent,
      jobStage: "ShortListed",
      deadlineDate: new Date("2025-01-22T22:00:00+00:00"),
      assignedTo: [
        {
          id: "0fe55d2d-33c8-4a07-afcd-82f3da9b024f",
          firstName: "Laurynas",
          lastName: "Jonavičius",
          pictureUri:
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
        },
      ],
      isPriority: false,
    },
    {
      jobId: "fb603cdf-bf7f-4b1e-ad3f-e5b95d8a07ef",
      companyName: "Tesla",
      companyLogoUri:
        "https://stmmcompanydev.blob.core.windows.net/logos/40c1cf2b-dc8e-40a6-a528-4459a929fc31.png",
      position: "Backend developer",
      permanent: WorkTypes.Permanent,
      jobStage: "ShortListed",
      deadlineDate: new Date("2025-01-22T22:00:00+00:00"),
      assignedTo: [
        {
          id: "0fe55d2d-33c8-4a07-afcd-82f3da9b024f",
          firstName: "Laurynas",
          lastName: "Jonavičius",
          pictureUri:
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
        },
      ],
      isPriority: false,
    },
    {
      jobId: "fb603cdf-bf7f-4b1e-ad3f-e5b95d8a07ef",
      companyName: "Tesla",
      companyLogoUri:
        "https://stmmcompanydev.blob.core.windows.net/logos/40c1cf2b-dc8e-40a6-a528-4459a929fc31.png",
      position: "Backend developer",
      permanent: WorkTypes.Permanent,
      jobStage: "ShortListed",
      deadlineDate: new Date("2025-01-22T22:00:00+00:00"),
      assignedTo: [
        {
          id: "0fe55d2d-33c8-4a07-afcd-82f3da9b024f",
          firstName: "Laurynas",
          lastName: "Jonavičius",
          pictureUri:
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
        },
      ],
      isPriority: false,
    },
    {
      jobId: "fb603cdf-bf7f-4b1e-ad3f-e5b95d8a07ef",
      companyName: "Tesla",
      companyLogoUri:
        "https://stmmcompanydev.blob.core.windows.net/logos/40c1cf2b-dc8e-40a6-a528-4459a929fc31.png",
      position: "Backend developer",
      permanent: WorkTypes.Permanent,
      jobStage: "ShortListed",
      deadlineDate: new Date("2025-01-22T22:00:00+00:00"),
      assignedTo: [
        {
          id: "0fe55d2d-33c8-4a07-afcd-82f3da9b024f",
          firstName: "Laurynas",
          lastName: "Jonavičius",
          pictureUri:
            "https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg",
        },
      ],
      isPriority: false,
    },
  ],
  currentPage: 1,
  pageSize: 11,
} as TPagedResponse<TJobBriefResponse>;

export const jobsHandler = rest.get(
  `${process.env.REACT_APP_BACKOFFICE_API}v1/jobs`,
  (_req, res, ctx) =>
    res(ctx.status(200), ctx.json<TPagedResponse<TJobBriefResponse>>(jobs))
);

export const jobsDashboardHandler = rest.get(
  `${process.env.REACT_APP_BACKOFFICE_API}v1/dashboard`,
  (_req, res, ctx) =>
    res(ctx.status(200), ctx.json<TPagedResponse<TJobBriefResponse>>(jobs))
);
