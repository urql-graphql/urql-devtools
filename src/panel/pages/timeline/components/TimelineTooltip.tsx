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
  z-index: 9;

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
        left: x + width / 2,
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

    const setVisible = () => setIsVisible(true);
    const setInvisible = () => setIsVisible(false);
    ref.current.addEventListener("mouseenter", setVisible);
    ref.current.addEventListener("mouseleave", setInvisible);
    return () => {
      if (!ref.current) {
        return;
      }

      ref.current.removeEventListener("mouseenter", setVisible);
      ref.current.removeEventListener("mouseleave", setInvisible);
    };
  }, [hasRef]);

  return useMemo(() => ({ ref: handleRef, tooltipProps, isVisible }), [
    handleRef,
    tooltipProps,
    isVisible,
  ]);
};
