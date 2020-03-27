import React, {
  FC,
  ComponentProps,
  useMemo,
  Children,
  cloneElement,
  useRef,
  useCallback,
  useState,
} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const collapseTransition = "300ms ease";

const PaneSectionRoot: FC<
  {
    collapsed?: boolean;
    onCollapseToggle?: () => void;
  } & ComponentProps<typeof PaneContainer>
> = ({ collapsed, onCollapseToggle, children, ...props }) => {
  const childNodes = Children.map(children, (n) => {
    if (typeof n !== "object" || n === null || !("type" in n)) {
      return n;
    }

    if (n.type === Heading) {
      return cloneElement(n, {
        collapsed,
        onClick: onCollapseToggle,
      });
    }

    if (n.type === Body) {
      return cloneElement(n, {
        collapsed,
      });
    }

    return n;
  });

  return (
    <PaneContainer {...props} aria-expanded={!collapsed}>
      {childNodes}
    </PaneContainer>
  );
};

const PaneContainer = styled.section`
  padding: 20px;
  color: #fff;
`;

/** Collapsible heading for sections within a timeline pane */
const Heading: FC<
  { collapsed?: boolean } & ComponentProps<typeof SectionHeading>
> = ({ collapsed, children, ...props }) => (
  <SectionHeading aria-expanded={!collapsed} {...props}>
    <FontAwesomeIcon icon={faAngleRight} color="#fff" />
    {children}
  </SectionHeading>
);

const SectionHeading = styled.h2`
  user-select: none;
  cursor: pointer;
  color: #fff;

  & > svg {
    box-sizing: content-box;
    margin-right: 10px;
    width: 20px !important;
    height: 20px;
    transition: transform ${collapseTransition};
  }

  &[aria-expanded="true"] > svg {
    transform: rotate(90deg);
  }
`;

const Body: FC<
  { collapsed?: boolean } & ComponentProps<typeof BodyContainer>
> = ({ collapsed, ...props }) => {
  const [initialHeight, setInitialHeight] = useState<number>();
  const ref = useRef<HTMLDivElement>();

  const handleRef = useCallback((element: HTMLDivElement) => {
    if (element === null) {
      return;
    }

    ref.current = element;
    setInitialHeight(element.scrollHeight);
  }, []);

  const maxHeight = useMemo(() => {
    if (collapsed) {
      return 0;
    }

    if (ref.current) {
      return ref.current.scrollHeight;
    }

    return initialHeight;
  }, [collapsed, initialHeight]);

  return (
    <BodyContainer
      {...props}
      ref={handleRef}
      style={{ ...props.style, maxHeight }}
      aria-expanded={!collapsed}
    />
  );
};

const BodyContainer = styled.div`
  overflow: hidden;
  transition: max-height ${collapseTransition};
`;

(PaneSectionRoot as PaneSection).Heading = Heading;
(PaneSectionRoot as PaneSection).Body = Body;

type PaneSection = typeof PaneSectionRoot & {
  Heading: typeof Heading;
  Body: typeof Body;
};
export const PaneSection: PaneSection = PaneSectionRoot as any;
