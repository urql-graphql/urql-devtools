import React, { useState, useMemo, FC } from "react";
import styled from "styled-components";
import { TimelineContext } from "../../../context/Timeline";
import { Settings, Filter } from "./Settings";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;
  background: ${(props) => props.theme.dark["0"]};
`;

const MockTimelineProvider: FC = ({ children }) => {
  const [filter, setFilter] = useState({ source: ["devtoolsExchange"] });

  const value = useMemo(
    () => ({
      filter,
      setFilter,
      exchanges: ["devtoolsExchange", "fetchExchange", "graphCacheExchange"],
    }),
    [filter]
  );

  return (
    <TimelineContext.Provider value={value as any}>
      {children}
    </TimelineContext.Provider>
  );
};

export default {
  settings: (
    <Wrapper data-snapshot>
      <MockTimelineProvider>
        <Settings />
      </MockTimelineProvider>
    </Wrapper>
  ),
  filter: (
    <Wrapper data-snapshot>
      <MockTimelineProvider>
        <Filter />
      </MockTimelineProvider>
    </Wrapper>
  ),
};
