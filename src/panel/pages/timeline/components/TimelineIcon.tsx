import React, { FC, useMemo } from "react";
import styled from "styled-components";
import { OperationType } from "urql";

const Icon = styled.div`
  background-color: green;
  color: #fff;
  height: 20px;
  line-height: 20px;
  text-align: center;
  width: 20px;

  &[data-type="Q"] {
    background: ${(props) => props.theme.blue["-1"]};
  }

  &[data-type="M"] {
    background: ${(props) => props.theme.green["0"]};
  }

  &[data-type="S"] {
    background: ${(props) => props.theme.red["0"]};
  }
`;

export const TimelineIcon: FC<{
  operation: Omit<OperationType, "teardown">;
}> = ({ operation, ...rest }) => {
  const letter = useMemo(() => operation[0].toUpperCase(), [operation]);

  return (
    <Icon data-type={letter} {...rest}>
      {letter}
    </Icon>
  );
};
