import { TJobSalaryBudget } from "./jobSalaryBudget";

export type TJobFreelance = {
  hoursPerProject?: number;
  hourlyBudget?: TJobSalaryBudget;
  monthlyBudget?: TJobSalaryBudget;
};
