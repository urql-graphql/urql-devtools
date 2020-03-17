import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { CodeHighlight } from "../../../components";

interface TimelinePaneSectionProps {
  title: string;
  timestamp: number;
  subSections: {
    title?: string;
    info?: [string, string];
    code?: {
      language: string;
      code: string;
    };
  }[];
  startOpen?: boolean;
}

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
`;

const OpenClosedArrow = styled(FontAwesomeIcon)`
  padding-right: 1rem;
`;
