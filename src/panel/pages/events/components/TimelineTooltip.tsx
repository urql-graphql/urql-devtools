import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  FC,
  ComponentProps,
} from "react";
import styled from "styled-components";
import { Portal } from "../../../components";

export const TimelineTooltip: FC<JSX.IntrinsicElements["div"]> = ({
  children,
  style: styleProp,
  ...props
}) => {
  const previousOffset = useRef(0);
  const ref = useRef<HTMLDivElement>(null);

  const offset = useMemo(() => {
    if (!ref.current) {
      return 0;
    }

    const { left, right } = ref.current.getBoundingClientRect();

    if (left < 0) {
      return Math.abs(left) + 10;
    }

    if (right > window.innerWidth) {
      return window.innerWidth - right - 10;
    }

    return previousOffset.current;
  }, [styleProp, ref]);

  previousOffset.current = offset;

  return (
    <Portal>
      <TooltipElement
        {...props}
        ref={ref}
        positionOffset={offset}
        style={{ ...styleProp, marginLeft: offset }}
      >
        {children}
      </TooltipElement>
    </Portal>
  );
};

const TooltipElement = styled.div<{ positionOffset: number }>`
  position: relative;
  background-color: ${(p) => p.theme.dark["+3"]};
  border-radius: 2px;
  color: ${(p) => p.theme.light["0"]};
  font-size: 12px;
  margin: 0;
  padding: 10px 20px;
  white-space: nowrap;

  &::after {
    content: "";
    display: block;
    position: absolute;
    border-top: 9px solid ${(p) => p.theme.dark["+3"]};
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    margin-top: -1px;
    left: calc(50% - ${(p) => p.positionOffset}px);
    top: 100%;
    transform: translate(-50%, 0);
  }
`;

export const useTooltip = () => {
  const ref = useRef<HTMLElement>();
  const mouseX = useRef<number | undefined>(undefined);
  const [hasRef, setHasRef] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipProps, setTooltipProps] = useState<
    Omit<ComponentProps<typeof TimelineTooltip>, "ref">
  >({});

  const calculateTooltipPosition = useCallback(() => {
    if (!ref.current) {
      return;
    }

    const { x, y, width } = ref.current.getBoundingClientRect();

    setTooltipProps({
      style: {
        position: "fixed",
        // 12px for event size
        left: width > 12 ? mouseX.current : x + width / 2,
        bottom: window.innerHeight - y + 10,
        transform: `translateX(-50%)`,
      },
    });
  }, []);

  const handleTargetRef = useMemo(() => {
    const fn = (r: null | HTMLElement) => {
      if (r === null) {
        return;
      }

      ref.current = r;
      calculateTooltipPosition();
      setHasRef(true);
    };
    fn.current = ref.current;
    return fn;
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

  return useMemo(
    () => ({
      ref: handleTargetRef,
      tooltipProps,
      isVisible,
    }),
    [handleTargetRef, tooltipProps, isVisible]
  );
};
