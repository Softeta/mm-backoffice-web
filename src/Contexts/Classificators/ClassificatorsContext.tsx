import { TClassificators } from "API/Types/classificators";
import { createContext } from "react";

const initClassificators: TClassificators = {
  workTypes: [],
  formatTypes: [],
  seniorityLevels: [],
  workingHourTypes: [],
  jobStages: [],
};

const ClassificatorsContext = createContext({} as TClassificators);

export { ClassificatorsContext, initClassificators };
