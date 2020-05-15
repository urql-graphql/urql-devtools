import React, { useState, useMemo, FC } from "react";
import styled from "styled-components";
import { TimelineContext } from "../../../context/Timeline";
import { Settings, Filter } from "./Settings";

const Wrapper = styled.div`
  padding: 20px;
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
