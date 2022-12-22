import { RefObject } from "react";

const getRefWidth = (ref: RefObject<HTMLElement>) => {
  if (!ref.current) return 0;
  const boundingRect = ref.current.getBoundingClientRect();
  return boundingRect.width;
};

export default getRefWidth;
