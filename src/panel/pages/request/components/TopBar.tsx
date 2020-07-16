import React, { FC } from "react";
import { GraphQLNamedType } from "graphql";
import styled from "styled-components";
import { faHome, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TopBarProps {
  setStack: (stack: GraphQLNamedType[] | []) => void;
  stack: GraphQLNamedType[] | [];
}

export const TopBar: FC<TopBarProps> = ({ setStack, stack, children }) => {
  const prevType = stack[stack.length - 2];

  return (
    <FlexContainer>
      <Container>
        <ButtonContainer>
          <IconButton
            onClick={() => setStack([])}
            data-disabled={stack.length < 2}
          >
            <Icon icon={faHome} title="Root" />
          </IconButton>
          <IconButton
            onClick={() => setStack([...stack].slice(0, -1))}
            data-disabled={stack.length === 0}
          >
            <Icon icon={faArrowLeft} title={prevType?.name || "Root"} />
          </IconButton>
        </ButtonContainer>
        {children}
      </Container>
      <Breadcrumbs>
        <TextButton
          data-disabled={stack.length === 0}
          onClick={() => setStack([])}
        >
          Root
        </TextButton>
        {stack.length > 0
          ? (stack as GraphQLNamedType[]).map((item, i) => (
              <TextButton
                onClick={() => setStack([...stack].slice(0, i + 1))}
                data-disabled={i === stack.length - 1}
                key={i}
              >
                {item.name}
              </TextButton>
            ))
          : null}
      </Breadcrumbs>
    </FlexContainer>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const FlexContainer = styled.div`
  background-color: ${(p) => p.theme.dark["+5"]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
`;

const ButtonContainer = styled.menu`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0 4px;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 13px;
  color: currentColor;
`;

const IconButton = styled.button`
  display: inline-block;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  color: ${(p) => p.theme.light["-9"]};
  font-size: inherit;
  text-align: left;
  padding: 4px;
  margin: 0;
  border-radius: 3px;

  &:first-of-type {
    margin-right: 4px;
  }

  &:hover {
    background-color: ${(p) => p.theme.grey["-9"]};
  }

  &[data-disabled="true"] {
    pointer-events: none;
    color: ${(p) => p.theme.grey["-6"]};
  }
`;

const TextButton = styled.button`
  display: inline-block;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 11px;
  text-align: left;
  padding: 0;
  margin: 0;
  color: inherit;
  color: ${(p) => p.theme.orange["+3"]};

  &:hover {
    text-decoration: underline;
  }

  &[data-disabled="true"] {
    color: ${(p) => p.theme.grey["0"]};
    pointer-events: none;
  }

  &[data-disabled="false"] {
    &::after {
      content: ">";
      display: inline-block;
      margin: 0 3px;
      color: ${(p) => p.theme.grey["0"]};
    }
  }
`;

const Breadcrumbs = styled.nav`
  display: flex;
  align-items: center;
  padding: 5px;
  margin: 0 4px;
  color: ${(p) => p.theme.grey["0"]};
`;
