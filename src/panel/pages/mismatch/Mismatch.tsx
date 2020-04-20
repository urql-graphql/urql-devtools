import React, { FC, ComponentProps } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import { useDevtoolsContext } from "../../context";

export const Mismatch: FC<ComponentProps<typeof Container>> = (props) => {
  const { version } = useDevtoolsContext();
  return (
    <Container {...props}>
      <Icon icon={faBomb} />
      <Header>Version Mismatch</Header>
      <Hint>
        Expected devtools exchange (@urql/devtools) version{" "}
        <em>{`>=${version.required}`}</em> but got{" "}
        <em>{`${version.actual}.`}</em>
      </Hint>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${(p) => p.theme.dark["0"]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.h1`
  color: ${(p) => p.theme.light["0"]};
  font-weight: 400;
  margin: 0;
`;

const Hint = styled.p`
  text-align: center;
  color: ${(p) => p.theme.grey["+4"]};
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 80px;
  margin-bottom: 40px;
  color: ${(p) => p.theme.red["0"]};
`;
