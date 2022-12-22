import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

interface IProps {
  htmlUrl?: string;
}

export const PapiWheel = ({ htmlUrl }: IProps) => {
  const [loading, setLoading] = useState(true);
  const [papiWheelImage, setPapiWheelImage] = useState<string>();

  useEffect(() => {
    if (!htmlUrl) {
      return;
    }

    setLoading(true);
    fetch(htmlUrl).then((resp) => {
      resp.text().then((html) => {
        const div = document.createElement("div");
        div.innerHTML = html;
        const divChildren = div.getElementsByTagName("div");

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < divChildren.length; i++) {
          const child = divChildren[i];

          if (child.id === "wheel") {
            const svg = child.getElementsByTagName("svg")[0];
            setPapiWheelImage(svg.outerHTML);
            setLoading(false);
            break;
          }
        }
      });
    });
  }, [htmlUrl]);

  return (
    <>
      {(!papiWheelImage || loading) && <CircularProgress />}
      {papiWheelImage && !loading && (
        <img
          className="mx-auto "
          src={`data:image/svg+xml;utf8,${encodeURIComponent(papiWheelImage)}`}
          alt=""
        />
      )}
    </>
  );
};
