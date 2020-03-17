import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { CodeHighlight } from "../../../components";

interface TimelinePaneSectionProps {
  title: string;
  timestamp: number;
}

export const TimelinePaneSection: React.FC<TimelinePaneSectionProps> = ({
  title,
  timestamp
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <PaneSection>
      <SectionTitle onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}>
        <OpenClosedArrow
          icon={isOpen ? faAngleDown : faAngleRight}
          color="#fff"
        />
        {title}
      </SectionTitle>
      {isOpen && (
        <>
          {timestamp}
          <CodeHighlight
            language="graphql"
            code={`
query { 
  todos(id: 1234) { 
    id 
    content 
  } 
} 
          `}
          />
        </>
      )}
    </PaneSection>
  );
};

const PaneSection = styled.section`
  padding: 2rem;
`;

const SectionTitle = styled.h2`
  color: #fff;
  cursor: pointer;
`;

const OpenClosedArrow = styled(FontAwesomeIcon)`
  padding-right: 1rem;
`;
