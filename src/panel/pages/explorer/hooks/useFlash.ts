import { useSpring } from "react-spring";
import { useCallback } from "react";

const defaultState = { background: "rgba(255, 255, 255, 0)" };
const flashState = { background: "rgba(255, 255, 255, 1)" };

type Flash = () => void;

type UseFlashResponse = [any, Flash];

/** Hook for flashing a screen element */
export const useFlash = (): UseFlashResponse => {
  const [props, setSpring] = useSpring(() => ({
    config: { duration: 300 },
  }));

  const flash = useCallback(
    () =>
      setSpring({
        from: defaultState,
        to: [flashState, defaultState],
      } as any),
    [setSpring]
  );

  return [props, flash];
};
