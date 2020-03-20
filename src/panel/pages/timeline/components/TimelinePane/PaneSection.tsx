import React, {
  FC,
  ComponentProps,
  useMemo,
  Children,
  cloneElement,
  useRef
} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";

const PaneSectionRoot: FC<{
  collapsed?: boolean;
  onCollapseToggle?: () => void;
}> = ({ collapsed, onCollapseToggle, children }) => {
  const childNodes = Children.map(children, n => {
    if (typeof n !== "object" || n === null || !("type" in n)) {
      return n;
    }

    if (n.type === Heading) {
      return cloneElement(n, {
        collapsed,
        onClick: onCollapseToggle
      });
    }

    if (n.type === Body) {
      return cloneElement(n, {
        collapsed
      });
    }

    return n;
  });

  return <PaneContainer aria-expanded={!collapsed}>{childNodes}</PaneContainer>;
};

const PaneContainer = styled.section`
  padding: 20px;
  color: #fff;
`;

/** Collapsible heading for sections within a timeline pane */
const Heading: FC<{ collapsed?: boolean } & ComponentProps<
  typeof SectionHeading
>> = ({ collapsed, children, ...props }) => (
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
    transition: transform 300ms ease;
  }

  &[aria-expanded="true"] > svg {
    transform: rotate(90deg);
  }
`;

const Body: FC<{ collapsed?: boolean } & ComponentProps<
  typeof BodyContainer
>> = ({ collapsed, ...props }) => {
  const ref = useRef<HTMLDivElement>();

  const maxHeight = useMemo(() => {
    if (collapsed) {
      return 0;
    }

    if (!ref.current) {
      return undefined;
    }

    return ref.current.scrollHeight;
  }, [collapsed]);

  return (
    <BodyContainer
      {...props}
      ref={ref}
      style={{ ...props.style, maxHeight }}
      aria-expanded={!collapsed}
    />
  );
};

const BodyContainer = styled.div`
  overflow: hidden;
  transition: max-height 300ms ease;
`;

// @ts-ignore
PaneSectionRoot.Heading = Heading;
// @ts-ignore
PaneSectionRoot.Body = Body;

type PaneSection = typeof PaneSectionRoot & {
  Heading: typeof Heading;
  Body: typeof Body;
};
export const PaneSection: PaneSection = PaneSectionRoot as any;
