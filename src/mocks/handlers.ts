/* eslint-disable @typescript-eslint/no-unused-vars */
import { DefaultRequestBody, MockedRequest, RestHandler } from "msw";
import backOfficeUsersHandler from "./backOfficeUsers/backOfficeUsersHandler";
import candidatesHandler from "./candidates/candidatesHandler";
import classificatorsHandler from "./classificators/classificatorsHandler";
import companiesHandler from "./companies/companiesHandler";
import companiesSearchHandler from "./companies/companiesSearchHandler";
import industriesHandler from "./industries/industriesHandler";
import jobPositionsHandler from "./jobPositions/jobPositionsHandler";
import { jobsHandler, jobsDashboardHandler } from "./jobs/jobsHandler";
import recommendedSkillsHandler from "./skills/recommendedSkillsHandler";
import skillsHandler from "./skills/skillsHandler";

const prodHandlers: RestHandler<MockedRequest<DefaultRequestBody>>[] = [];
const devHandlers = [
  backOfficeUsersHandler,
  jobsHandler,
  jobsDashboardHandler,
  candidatesHandler,
  classificatorsHandler,
  industriesHandler,
  jobPositionsHandler,
  skillsHandler,
  recommendedSkillsHandler,
  companiesHandler,
  companiesSearchHandler,
];

export const handlers =
  process.env.NODE_ENV === "development" &&
  process.env.REACT_APP_IS_MOCK_ENABLED?.toLowerCase() === "true"
    ? devHandlers
    : prodHandlers;

export default handlers;
