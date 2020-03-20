import React, { FC, useState, useCallback } from "react";
import { ReceivedDebugEvent } from "../../../../types";
import { CodeHighlight } from "../../../../components";
import { PaneSection } from "./PaneSection";

/** Section presenting information specific to this debug event */
export const TimelineEventSection: FC<{ event: ReceivedDebugEvent }> = ({
  event
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = useCallback(() => setIsCollapsed(c => !c), []);

  return (
    <PaneSection collapsed={isCollapsed} onCollapseToggle={handleToggle}>
      <PaneSection.Heading>Event</PaneSection.Heading>
      {/** Todo - only fall back to printing json when
       * we don't have a pretty way of describing the event (i.e. unknown debug events) */}
      <PaneSection.Body>
        <CodeHighlight
          language={"javascript"}
          code={JSON.stringify(event.data, null, 2)}
        />
      </PaneSection.Body>
    </PaneSection>
  );
};
