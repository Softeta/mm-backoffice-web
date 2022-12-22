const getInitials = (name: string): string => {
  if (name.length === 0) {
    return "";
  }

  const split = name.split(" ");
  if (split.length > 1) {
    return `${split[0][0]}${split[1][0]}`;
  }

  return split[0][0];
};
export default getInitials;
