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

export const TimelinePaneSection: React.FC<TimelinePaneSectionProps> = ({
  title,
  subSections,
  startOpen
}) => {
  const [isOpen, setIsOpen] = React.useState(!!startOpen);
  return (
    <PaneSection>
      <SectionTitle onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}>
        <OpenClosedArrow
          icon={isOpen ? faAngleDown : faAngleRight}
          color="#fff"
        />
        {title}
      </SectionTitle>
      {isOpen &&
        subSections.map(section => (
          <>
            {section.title && <h3>{section.title}</h3>}

            {/* TODO?: move into a list */}
            {section.info && (
              <InfoContainer>
                <span>{section.info[0]}</span>
                <InfoValue>{section.info[1]}</InfoValue>
              </InfoContainer>
            )}
            {section.code && (
              <CodeHighlight
                language={section.code.language}
                code={section.code.code}
                isTimelinePane
              />
            )}
          </>
        ))}
    </PaneSection>
  );
};

const InfoContainer = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 1rem;
`;

const InfoValue = styled.span`
  position: absolute;
  right: 0;
`;

const PaneSection = styled.section`
  padding: 1rem 2rem 0 2rem;
  color: #fff;
`;

const SectionTitle = styled.h2`
  cursor: pointer;
  color: #fff;
`;

const OpenClosedArrow = styled(FontAwesomeIcon)`
  padding-right: 1rem;
`;

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

export const TimelineQueryInfo: FC<{
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
