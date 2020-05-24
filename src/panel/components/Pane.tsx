import React, {
  FC,
  useCallback,
  useState,
  useMemo,
  MouseEventHandler,
  ComponentProps,
  useRef,
} from "react";
import styled from "styled-components";
import { useOrientationWatcher } from "../hooks";

interface OverrideProps {
  forcedOrientation?: { isPortrait: boolean };
  initSize: { x: number; y: number };
}

const PaneRoot: FC<ComponentProps<typeof PaneContainer> & OverrideProps> = ({
  children,
  forcedOrientation,
  initSize,
  ...props
}) => {
  const [grabbed, setGrabbed] = useState(false);
  const [size, setSize] = useState(initSize ? initSize : { x: 400, y: 400 });
  const dynamicOrientation = useOrientationWatcher();
  const paneRef = useRef(null);

  const { isPortrait } = forcedOrientation
    ? forcedOrientation
    : dynamicOrientation;

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
    <PaneContainer
      {...props}
      style={{ ...props.style, ...style }}
      data-portrait={`${isPortrait}`}
      ref={paneRef}
    >
      {children}
      <DraggingEdge
        role="seperator"
        aria-orientation={isPortrait ? "horizontal" : "vertical"}
        aria-grabbed={grabbed}
        onMouseDown={handleClick}
        data-portrait={`${isPortrait}`}
      />
    </PaneContainer>
  );
};

const PaneContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.dark["0"]};
  border-top: solid 1px ${(props) => props.theme.dark["+4"]};

  width: 100%;
  height: 400px;

  &[data-portrait="false"] {
    width: 400px;
    height: 100%;
    border-top: none;
    border-left: solid 1px ${(props) => props.theme.dark["+4"]};
  }
`;

const edgeWidth = 4;

const DraggingEdge = styled.div`
  position: absolute;
  z-index: 3;
  opacity: 0;

  cursor: ns-resize;
  width: 100%;
  height: ${edgeWidth}px;
  top: -${edgeWidth / 2}px;

  &[data-portrait="false"] {
    width: ${edgeWidth}px;
    height: 100%;
    margin-top: 0;
    top: 0;
    left: -${edgeWidth / 2}px;
    cursor: ew-resize;
  }
`;

const Body = styled.div`
  overflow: auto;
`;

type Pane = typeof PaneRoot & { Body: typeof Body };

(PaneRoot as Pane).Body = Body;
export const Pane = PaneRoot as Pane;
