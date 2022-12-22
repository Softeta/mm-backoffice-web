export enum RouteParams {
  candidateId = "candidateId",
  companyId = "companyId",
  jobId = "jobId",
}

export const routes = {
  home: "/",
  unauthorized: {
    url: "/unauthorized",
  },
  dashboard: {
    url: "/dashboard",
  },
  jobs: {
    url: "/jobs",
  },
  candidates: {
    url: "/candidates",
  },
  companies: {
    url: "/companies",
  },
};

export default routes;
