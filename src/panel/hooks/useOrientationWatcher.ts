import { useEffect, useState, useMemo } from "react";

const aspectQuery = window.matchMedia("(min-aspect-ratio: 1/1)");

interface OrientationWatcher {
  isPortrait: boolean;
  isLandscape: boolean;
}

export const useOrientationWatcher = (): OrientationWatcher => {
  const [state, setState] = useState(aspectQuery.matches);

  useEffect(() => {
    const listener = () => setState(aspectQuery.matches);
    aspectQuery.addEventListener("change", listener);
    return () => aspectQuery.removeEventListener("change", listener);
  }, []);

  return useMemo(() => ({ isPortrait: !state, isLandscape: state }), [state]);
};
