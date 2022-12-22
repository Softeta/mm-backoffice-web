import WorkTypes from "Enums/workType";

const getWorkTypes = (
  freelance?: WorkTypes,
  permanent?: WorkTypes
): string[] => {
  const workTypes: string[] = [];
  if (freelance) {
    workTypes.splice(0, 0, freelance);
  }
  if (permanent) {
    workTypes.splice(0, 0, permanent);
  }
  return workTypes;
};

export default getWorkTypes;
