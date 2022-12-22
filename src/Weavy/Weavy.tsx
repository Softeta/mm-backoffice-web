import { useState, useEffect } from "react";
import WeavyContext from "./WeavyContext";

declare global {
  interface Window {
    Weavy: any;
  }
}

type IWeavy = {
  jwt: () => Promise<any>;
  children: any;
};

const Weavy = ({ children, jwt }: IWeavy) => {
  const [weavy, setWeavy] = useState<any>(null);

  useEffect(() => {
    setWeavy(new window.Weavy({ jwt, init: false }));
  }, [jwt]);

  useEffect(() => {
    if (weavy) {
      weavy.init();
    }

    return () => {
      if (weavy) {
        weavy.destroy();
      }
    };
  }, [weavy]);

  return (
    // eslint-disable-next-line
    <WeavyContext.Provider value={{ weavy }}>{children}</WeavyContext.Provider>
  );
};

export default Weavy;
