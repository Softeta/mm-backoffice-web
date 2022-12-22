import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

interface IProps {
  delay?: number; // ms
}
const Loader = ({ delay = 0 }: IProps) => {
  const [showLoader, setShowLoader] = useState(!delay);

  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(true), delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <div className="flex justify-center">
      {showLoader && <CircularProgress className="mt-2" />}
    </div>
  );
};

export default Loader;
