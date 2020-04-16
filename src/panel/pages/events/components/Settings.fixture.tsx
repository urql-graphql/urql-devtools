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
  const [filter, setFilter] = useState({
    source: ["devtoolsExchange"],
    graphqlType: ["query", "mutation", "subscription"],
  });

  const value = useMemo(
    () => ({
      filter,
      setFilter,
      filterables: {
        source: ["devtoolsExchange", "fetchExchange", "graphCacheExchange"],
        graphqlType: ["query", "mutation", "subscription"],
      },
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
    <Wrapper>
      <MockTimelineProvider>
        <Settings data-snapshot />
      </MockTimelineProvider>
    </Wrapper>
  ),
  filter: (
    <Wrapper>
      <MockTimelineProvider>
        <Filter data-snapshot />
      </MockTimelineProvider>
    </Wrapper>
  ),
};
