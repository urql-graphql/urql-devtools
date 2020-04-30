import React, { FC, useMemo, Fragment } from "react";
import styled from "styled-components";
import { ParsedFieldNode } from "../../../context/Explorer/ast";
import { InlineCodeHighlight } from "../../../components";

export const Arguments: FC<{
  args: ParsedFieldNode["args"];
}> = ({ args }) => {
  if (!args) {
    return null;
  }

  const entries = useMemo(() => Object.entries(args), [args]);

  return (
    <ArgumentText>
      (
      {entries.map(([key, value], index) => (
        <Fragment key={key}>
          {`${key}: `}
          <InlineCodeHighlight code={JSON.stringify(value) || "undefined" } language="json" />
          {index !== entries.length - 1 && ", "}
        </Fragment>
      ))}
      )
    </ArgumentText>
  );
};

const ArgumentText = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  color: ${(p) => p.theme.grey["+4"]};
`;
