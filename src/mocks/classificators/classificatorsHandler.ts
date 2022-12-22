import { TClassificators } from "API/Types/classificators";
import { rest } from "msw";

const classificatorsHandler = rest.get(
  `${process.env.REACT_APP_BACKOFFICE_API}/api/v1/users`,
  (_req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json<TClassificators>({
        workTypes: ["Freelance", "Permanent"],
        formatTypes: ["Remote", "Onsite", "Hybrid"],
        seniorityLevels: ["Entry", "Junior", "Mid", "Senior", "Executive"],
        workingHourTypes: ["PartTime", "FullTime"],
        jobStages: [
          "Calibration",
          "CandidateSelection",
          "ShortListed",
          "Hired",
        ],
      })
    )
);

export default classificatorsHandler;
