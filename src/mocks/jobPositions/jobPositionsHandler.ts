import { TPosition } from "API/Types/position";
import { TPagedResponse } from "API/Types/pagedResponse";
import { rest } from "msw";

const jobPositionsHandler = rest.get(
  `${process.env.REACT_APP_BACKOFFICE_API}/api/v1/job-positions`,
  (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json<TPagedResponse<TPosition>>({
        count: 11,
        currentPage: 1,
        pageSize: 100,
        data: [
          { id: "505852bb-42f8-446c-af5c-6aba8a972567", code: "Recruiter" },
          {
            id: "422399ea-13f9-43d1-a452-61c18b7f4601",
            code: "Markets specialist",
          },
          { id: "f7b78630-639c-48e0-8298-3aa18d1a2b48", code: "Data analyst" },
          {
            id: "8ca4796b-48c1-4009-86f7-9b11296fc7f9",
            code: "Process analyst",
          },
          {
            id: "48592579-ebef-4f8d-bdb1-503ccfc43e9e",
            code: "Project manager",
          },
          { id: "37f05382-1c46-47bd-b56c-15c437e5df80", code: "Accountant" },
          {
            id: "21fedf25-85a6-4879-89cb-e1478cad5454",
            code: "Frontend developer",
          },
          {
            id: "8ea9ea7a-adbf-4800-8a3c-a983215534d2",
            code: ".NET software developer",
          },
          {
            id: "e5533ed5-d461-4b4d-9f4f-c59b713c3496",
            code: "Backend developer",
          },
          {
            id: "e60fd5d2-fb7d-43c1-8440-842d0f17e958",
            code: "Office administrator",
          },
          {
            id: "7f3f295c-ce80-435b-9dc4-4a134ebafef9",
            code: "Business analyst",
          },
        ],
      })
    )
);

export default jobPositionsHandler;
