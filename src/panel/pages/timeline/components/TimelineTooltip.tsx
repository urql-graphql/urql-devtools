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

type TimelineTooltipProps = {
  handleTooltipRef?: (passedRef: any) => void;
  tooltipOffset?: number;
};

export const TimelineTooltip: FC<
  JSX.IntrinsicElements["div"] & TimelineTooltipProps
> = ({ children, handleTooltipRef, tooltipOffset, ...props }) => {
  const offset = useMemo(() => (tooltipOffset ? tooltipOffset : 0), [
    tooltipOffset,
  ]);
  return (
    <div
      {...props}
      style={{ marginLeft: tooltipOffset, ...props.style }}
      ref={handleTooltipRef}
    >
      <TooltipElement offset={offset}>{children}</TooltipElement>
    </div>
  );
};

const TooltipElement = styled.p<{ position?: TooltipPosition; offset: number }>`
  position: relative;
  background-color: ${(p) => p.theme.dark["-3"]};
  border-radius: 2px;
  color: #fff;
  font-size: 12px;
  margin: 0;
  padding: 10px 20px;
  white-space: nowrap;

  &::after {
    content: "";
    display: block;
    position: absolute;
    border-top: 9px solid ${(p) => p.theme.dark["-3"]};
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    margin-top: -1px;
    left: calc(50% - ${(p) => p.offset}px);
    top: 100%;
    transform: translate(-50%, 0);
  }
`;

export const useTooltip = () => {
  const containerRef: MutableRefObject<HTMLElement | null> = useRef<
    HTMLElement
  >(null);
  const tooltipRef: MutableRefObject<HTMLElement | null> = useRef<HTMLElement>(
    null
  );
  const tooltipOffset: MutableRefObject<number> = useRef(0);
  const mouseX = useRef<number | undefined>(undefined);
  const [hasRef, setHasRef] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipProps, setTooltipProps] = useState<
    ComponentProps<typeof TimelineTooltip> & TimelineTooltipProps
  >({});

  const calculateTooltipPosition = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const { x, y, width } = containerRef.current.getBoundingClientRect(); //eslint-disable-line @typescript-eslint/no-non-null-assertion

    const newTooltipProps: ComponentProps<typeof TimelineTooltip> &
      TimelineTooltipProps = {
      style: {
        position: "fixed",
        left: x + width / 2,
        top: y,
        transform: `translateX(-50%) translateY(-100%)`,
        paddingBottom: 8,
        zIndex: 9,
      },
      handleTooltipRef,
      tooltipOffset: tooltipOffset.current,
    };

    if (!tooltipRef.current || !!tooltipOffset.current) {
      setTooltipProps(newTooltipProps);
      return;
    }

    const offsetRight =
      window.innerWidth - tooltipRef.current.getBoundingClientRect().right;
    const offsetLeft = tooltipRef.current.getBoundingClientRect().left;

    // * add an offset to the tooltip if it would be rendered out of bounds
    if (offsetLeft < 0) {
      tooltipOffset.current = Math.abs(offsetLeft) + 8;
    }

    if (offsetRight < 0) {
      tooltipOffset.current = offsetRight - 8;
    }

    setTooltipProps({
      ...newTooltipProps,
      tooltipOffset: tooltipOffset.current,
    });
  }, []);

  const handleContainerRef = useCallback((passedRef) => {
    if (passedRef === null) {
      return;
    }

    containerRef.current = passedRef;
    calculateTooltipPosition();
    setHasRef(true);
  }, []);

  const handleTooltipRef = useCallback((passedRef) => {
    if (passedRef === null) {
      return;
    }

    tooltipRef.current = passedRef;
  }, []);

  // Update position on resize
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const mObserver = new MutationObserver(calculateTooltipPosition);
    const rObserver = new ResizeObserver(calculateTooltipPosition);
    mObserver.observe(containerRef.current, {
      attributes: true,
      childList: true,
    });
    rObserver.observe(containerRef.current);
    return () => {
      mObserver.disconnect();
      rObserver.disconnect();
    };
  }, [hasRef]);

  // Set visible on mouse enter
  useEffect(() => {
    if (!containerRef.current) {
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
    containerRef.current.addEventListener("mouseenter", handleMouseEnter);
    containerRef.current.addEventListener("mouseleave", setInvisible);
    containerRef.current.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (!containerRef.current) {
        return;
      }

      containerRef.current.removeEventListener("mouseenter", handleMouseEnter);
      containerRef.current.removeEventListener("mouseleave", setInvisible);
      containerRef.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hasRef]);

  return useMemo(
    () => ({
      containerRef: handleContainerRef,
      tooltipRef: handleTooltipRef,
      tooltipProps,
      isVisible,
    }),
    [handleContainerRef, handleTooltipRef, tooltipProps, isVisible]
  );
};
