import React from "react";
import styled from "styled-components";
import { TimelineTooltip, useTooltip } from "./TimelineTooltip";

const Wrapper = styled.div`
  padding: 50px;
`;

const HoverableItem = () => {
  const { ref, tooltipProps, isVisible } = useTooltip();

  return (
    <>
      <button
        ref={ref}
        style={{
          position: "absolute",
          left: 200,
          top: 200,
          width: 100,
          height: 30,
        }}
      >
        Hover me!
      </button>
      {isVisible && <TimelineTooltip {...tooltipProps}>Hello!</TimelineTooltip>}
    </>
  );
};

export default {
  basic: (
    <Wrapper id="portal">
      <TimelineTooltip data-snapshot>
        A network response or cache update
      </TimelineTooltip>
    </Wrapper>
  ),
  onHover: (
    <Wrapper>
      <HoverableItem />
    </Wrapper>
  ),
};
