import React, {
  FC,
  useCallback,
  useState,
  useMemo,
  MouseEventHandler,
  ComponentProps,
} from "react";
import styled from "styled-components";
import { useOrientationWatcher } from "../hooks";

const PaneRoot: FC<ComponentProps<typeof PaneContainer>> = ({
  children,
  ...props
}) => {
  const [grabbed, setGrabbed] = useState(false);
  const [size, setSize] = useState({ x: 400, y: 400 });
  const { isPortrait } = useOrientationWatcher();

  type position = { x: number; y: number };
  const handleClick = useCallback<MouseEventHandler>(
    (ce) => {
      // Right/middle click
      if (ce.button !== 0) {
        return;
      }

      ce.preventDefault();
      document.body.style.cursor = isPortrait ? "ns-resize" : "ew-resize";
      setGrabbed(true);
      let latestPosition: position = { x: ce.clientX, y: ce.clientY };
      let moving = true;

      const renderFrame = () => {
        window.requestAnimationFrame(() => {
          setSize((s) =>
            isPortrait
              ? {
                  ...s,
                  y: window.innerHeight - latestPosition.y,
                }
              : { ...s, x: window.innerWidth - latestPosition.x }
          );
          moving && renderFrame();
        });
      };

      const handleMouseMove = (e: MouseEvent) => {
        latestPosition = { x: e.clientX, y: e.clientY };
      };

      const handleMouseUp = () => {
        moving = false;
        document.body.style.cursor = "";
        setGrabbed(false);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("mousemove", handleMouseMove);
      };

      renderFrame();
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMove);
    },
    [size, isPortrait]
  );

  const style = useMemo(
    () =>
      isPortrait
        ? { minHeight: size.y, height: size.y, width: "auto" }
        : { minWidth: size.x, width: size.x, height: "auto" },
    [size, isPortrait]
  );

  return (
    <PaneContainer {...props} style={{ ...props.style, ...style }}>
      {children}
      <DraggingEdge
        role="seperator"
        aria-orientation={isPortrait ? "horizontal" : "vertical"}
        aria-grabbed={grabbed}
        onMouseDown={handleClick}
      />
    </PaneContainer>
  );
};

const PaneContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.dark["-2"]};

  width: 100%;
  height: 400px;

  @media (min-aspect-ratio: 1/1) {
    width: 400px;
    height: 100%;
  }
`;

const edgeWidth = 4;

const DraggingEdge = styled.div`
  position: absolute;
  z-index: 3;
  background: ${(p) => p.theme.dark["+1"]};

  cursor: ns-resize;
  width: 100%;
  height: ${edgeWidth}px;
  top: -${edgeWidth / 2}px;

  @media (min-aspect-ratio: 1/1) {
    width: ${edgeWidth}px;
    height: 100%;
    margin-top: 0;
    top: 0;
    left: -${edgeWidth / 2}px;
    cursor: ew-resize;
  }

  &:hover,
  &[aria-grabbed="true"] {
    transition: background 150ms ease;
    background: ${(p) => p.theme.dark["+2"]};
  }
`;

const Body = styled.div`
  overflow: auto;
`;

type Pane = typeof PaneRoot & { Body: typeof Body };

(PaneRoot as Pane).Body = Body;
export const Pane = PaneRoot as Pane;
