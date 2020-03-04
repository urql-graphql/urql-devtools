import { useSpring } from "react-spring";
import { useCallback } from "react";

const defaultState = { filter: "brightness(1)" };
const flashState = { filter: "brightness(2.5)" };

type Flash = () => void;
type UseFlashResponse = [object, Flash];

/** Hook for flashing a screen element */
export const useFlash = (): UseFlashResponse => {
  const [props, setSpring] = useSpring(() => ({
    config: { duration: 300 }
  }));

  const flash = useCallback(
    () =>
      setSpring({
        from: defaultState,
        to: [flashState, defaultState]
      } as any),
    [setSpring]
  );

  return [props, flash];
};
