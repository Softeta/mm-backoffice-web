import { TJobEmployee } from "./Common/jobEmployee";

export type TUpdateJobAssignedEmployeesRequest = {
  assignedEmployees: string[];
};

export type TUpdateJobAssignedEmployeesResponse = {
  data: {
    assignedEmployees: TJobEmployee[];
  };
};
