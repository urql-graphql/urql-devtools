import React, {
  FC,
  useState,
  useCallback,
  ComponentProps,
  useMemo
} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { DocumentNode, print } from "graphql";
import { CodeHighlight } from "../../../components";
import { ReceivedDebugEvent } from "../../../types";

/** Collapsible heading for sections within a timeline pane */
export const TimelinePaneHeading: FC<{ collapsed?: boolean } & ComponentProps<
  typeof SectionTitle
>> = ({ collapsed = false, children, ...props }) => (
  <SectionTitle {...props}>
    <OpenClosedArrow
      icon={collapsed ? faAngleRight : faAngleDown}
      color="#fff"
    />
    {children}
  </SectionTitle>
);

/** Section presenting query and variables of operation */
export const TimelineQuerySection: FC<{
  query: DocumentNode;
  variables?: object;
}> = ({ query, variables }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const queryCode = useMemo(() => print(query), [query]);

  const handleToggle = useCallback(() => setIsCollapsed(c => !c), []);

  return (
    <PaneSection>
      <TimelinePaneHeading onClick={handleToggle} collapsed={isCollapsed}>
        Query
      </TimelinePaneHeading>
      {!isCollapsed && (
        <>
          <CodeHighlight language={"graphql"} code={queryCode} />
          <h3>Variables</h3>
          <CodeHighlight
            language={"javascript"}
            code={JSON.stringify(variables, null, 2)}
          />
        </>
      )}
    </PaneSection>
  );
};

/** Section presenting information specific to this debug event */
export const TimelineEventSection: FC<{ event: ReceivedDebugEvent }> = ({
  event
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = useCallback(() => setIsCollapsed(c => !c), []);

  return (
    <>
      <TimelinePaneHeading onClick={handleToggle} collapsed={isCollapsed}>
        Event
      </TimelinePaneHeading>
      {/** Todo - only fall back to printing json when
       * we don't have a pretty way of describing the event (i.e. unknown debug events) */}
      {!isCollapsed && (
        <CodeHighlight
          language={"javascript"}
          code={JSON.stringify(event.data, null, 2)}
        />
      )}
    </>
  );
};

const PaneSection = styled.section`
  padding: 1rem 2rem 0 2rem;
  color: #fff;
`;

const SectionTitle = styled.h2`
  user-select: none;
  cursor: pointer;
  color: #fff;
`;

const OpenClosedArrow = styled(FontAwesomeIcon)`
  padding-right: 1rem;
`;
