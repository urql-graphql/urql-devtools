import React, { FC, useCallback } from "react";
import styled from "styled-components";
import prettier from "prettier/standalone";
import parserGraphql from "prettier/parser-graphql";
import {
  faPlay,
  faTrashAlt,
  faAlignLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { useRequest } from "../../../context";
export const Settings: FC = () => {
  const { setQuery, execute, query } = useRequest();

  const handleTrashClick = useCallback(() => setQuery(""), [setQuery]);

  const handleFormatClick = useCallback(() => {
    if (query) {
      const formatted = prettier.format(query, {
        parser: "graphql",
        plugins: [parserGraphql],
      });
      setQuery(formatted);
    }
  }, [query, setQuery]);

  const handleCopy = async () => {
    const text = document.getElementById("query-text-box")?.textContent;
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
      } catch (err) {
        console.error("Failed to copy!", err);
      }
    }
  };

  return (
    <Container>
      <Icon title="Run (⌃ ⏎)" icon={faPlay} onClick={execute} />
      <Icon title="Clear" icon={faTrashAlt} onClick={handleTrashClick} />
      <Icon title="Prettify" icon={faAlignLeft} onClick={handleFormatClick} />
      <Icon icon={faCopy} title="Copy" onClick={handleCopy} id="copy-icon" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 3px 10px;
  background: ${(props) => props.theme.dark["+3"]};
  border-bottom: solid 1px ${(p) => p.theme.dark["+4"]};
`;

const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
  font-size: 13px;
  margin: 3px 5px;

  &:hover {
    color: ${(p) => p.theme.light["-9"]};
  }

  &,
  &:active {
    color: ${(p) => p.theme.grey["0"]};
  }
`;
