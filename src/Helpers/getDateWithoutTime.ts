const getDateWithoutTime = (date: Date): Date =>
  new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));

export default getDateWithoutTime;
