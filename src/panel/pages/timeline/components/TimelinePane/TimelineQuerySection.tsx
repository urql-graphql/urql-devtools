import React, {
  useMemo,
  useState,
  useCallback,
  FC,
  ComponentProps
} from "react";
import { print, DocumentNode } from "graphql";
import { CodeHighlight } from "../../../../components";
import { PaneSection } from "./PaneSection";

/** Section presenting query and variables of operation */
export const TimelineQuerySection: FC<{
  query: DocumentNode;
  variables?: object;
} & ComponentProps<typeof PaneSection>> = ({ query, variables, ...props }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const queryCode = useMemo(() => print(query), [query]);

  const handleToggle = useCallback(() => setIsCollapsed(c => !c), []);

  return (
    <PaneSection
      {...props}
      collapsed={isCollapsed}
      onCollapseToggle={handleToggle}
    >
      <PaneSection.Heading>Query</PaneSection.Heading>
      <PaneSection.Body>
        <CodeHighlight language={"graphql"} code={queryCode} />
        <h3>Variables</h3>
        <CodeHighlight
          language={"javascript"}
          code={JSON.stringify(variables, null, 2)}
        />
      </PaneSection.Body>
    </PaneSection>
  );
};
