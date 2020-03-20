import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { PaneSection } from "./PaneSection";

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  padding: 30px;
  background: ${props => props.theme.dark["-3"]};
`;

const Interactive = () => {
  const [collapsed, setCollapsed] = useState(false);
  const handleToggle = useCallback(() => setCollapsed(c => !c), []);

  return (
    <PaneSection collapsed={collapsed} onCollapseToggle={handleToggle}>
      <PaneSection.Heading>This is a heading</PaneSection.Heading>
      <PaneSection.Body>This is the body</PaneSection.Body>
    </PaneSection>
  );
};

export default {
  expanded: (
    <Wrapper>
      <PaneSection data-snapshot>
        <PaneSection.Heading>Hi there</PaneSection.Heading>
        Hi
      </PaneSection>
    </Wrapper>
  ),
  collapsed: (
    <Wrapper>
      <PaneSection data-snapshot collapsed>
        <PaneSection.Heading>This is a heading</PaneSection.Heading>
        <PaneSection.Body>This is the body</PaneSection.Body>
      </PaneSection>
    </Wrapper>
  ),
  interactive: (
    <Wrapper>
      <Interactive />
    </Wrapper>
  )
};
