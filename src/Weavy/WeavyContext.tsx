import { createContext } from "react";

export type Weavy = {
  weavy: any;
};

const WeavyContext = createContext({} as Weavy);

export default WeavyContext;
