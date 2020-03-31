import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  MutableRefObject,
  FC,
  ComponentProps,
} from "react";
import styled from "styled-components";

export interface TooltipPosition {
  x: number;
  y: number;
}

export const TimelineTooltip: FC<JSX.IntrinsicElements["div"]> = ({
  children,
  ...props
}) => (
  <div {...props} style={{ paddingBottom: 8, zIndex: 9, ...props.style }}>
    <TooltipElement>{children}</TooltipElement>
  </div>
);

const TooltipElement = styled.p<{ position?: TooltipPosition }>`
  position: relative;
  background-color: ${(p) => p.theme.dark["-3"]};
  border-radius: 2px;
  color: #fff;
  font-size: 12px;
  margin: 0;
  padding: 10px 20px;

  &::after {
    content: "";
    display: block;
    position: absolute;
    border-top: 9px solid ${(p) => p.theme.dark["-3"]};
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    margin-top: -1px;
    left: 50%;
    top: 100%;
    transform: translate(-50%, 0);
  }
`;

export const useTooltip = () => {
  const ref: MutableRefObject<HTMLElement | null> = useRef<HTMLElement>(null);
  const mouseX = useRef<number | undefined>(undefined);
  const [hasRef, setHasRef] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipProps, setTooltipProps] = useState<
    ComponentProps<typeof TimelineTooltip>
  >({});

  const calculateTooltipPosition = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const { x, y, width } = ref.current.getBoundingClientRect(); //eslint-disable-line @typescript-eslint/no-non-null-assertion
    setTooltipProps({
      style: {
        position: "fixed",
        // * 12px for event size
        left: width > 12 ? mouseX.current : x + width / 2,
        top: y,
        transform: `translateX(-50%) translateY(-100%)`,
      },
    });
  }, []);

  const handleRef = useCallback((passedRef) => {
    if (passedRef === null) {
      return;
    }

    ref.current = passedRef;
    calculateTooltipPosition();
    setHasRef(true);
  }, []);

  // Update position on resize
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const mObserver = new MutationObserver(calculateTooltipPosition);
    const rObserver = new ResizeObserver(calculateTooltipPosition);
    mObserver.observe(ref.current, {
      attributes: true,
      childList: true,
    });
    rObserver.observe(ref.current);
    return () => {
      mObserver.disconnect();
      rObserver.disconnect();
    };
  }, [hasRef]);

  // Set visible on mouse enter
  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const handleMouseEnter = (e: MouseEvent) => {
      handleMouseMove(e);
      setIsVisible(true);
    };
    const setInvisible = () => setIsVisible(false);
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      calculateTooltipPosition();
    };
    ref.current.addEventListener("mouseenter", handleMouseEnter);
    ref.current.addEventListener("mouseleave", setInvisible);
    ref.current.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (!ref.current) {
        return;
      }

      ref.current.removeEventListener("mouseenter", handleMouseEnter);
      ref.current.removeEventListener("mouseleave", setInvisible);
      ref.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hasRef]);

  return useMemo(() => ({ ref: handleRef, tooltipProps, isVisible }), [
    handleRef,
    tooltipProps,
    isVisible,
  ]);
};
