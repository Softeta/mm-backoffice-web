import { useContext, useEffect, useRef, useState } from "react";
import WeavyContext from "./WeavyContext";

export interface IWeavyApp {
  spaceKey: any;
  spaceName: any;
  appKey: any;
  appType: any;
  appName: any;
}

const WeavyApp = ({
  spaceKey,
  spaceName,
  appKey,
  appType,
  appName,
}: IWeavyApp) => {
  const { weavy } = useContext(WeavyContext);
  const [app, setApp] = useState<any>(null);
  const container = useRef<any>(null);

  useEffect(() => {
    const createWeavyApp = async () => {
      const space = weavy.space({
        key: spaceKey,
        name: spaceName,
      });

      setApp(
        space.app({
          key: appKey,
          type: appType,
          name: appName,
          container: container.current,
        })
      );
    };
    async function create() {
      await createWeavyApp();
    }

    if (weavy) {
      create();
    }
    return () => {
      if (app) {
        app.remove();
      }
    };
  }, [weavy, spaceKey, appKey, app, appName, appType, spaceName]);

  return <div className="weavy-container contents" ref={container} />;
};

export default WeavyApp;
