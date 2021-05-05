import React, { FC, useCallback } from "react";
import prettier from "prettier/standalone";
import parserGraphql from "prettier/parser-graphql";
import {
  faPlay,
  faTrashAlt,
  faAlignLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";
import { useRequest } from "../../../context";
import { Toolbar } from "../../../components";

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
    <Toolbar
      items={[
        { title: "Run (⌃ ⏎)", icon: faPlay, onClick: execute },
        { title: "Clear", icon: faTrashAlt, onClick: handleTrashClick },
        { title: "Prettify", icon: faAlignLeft, onClick: handleFormatClick },
        { title: "Copy", icon: faCopy, onClick: handleCopy },
      ]}
    />
  );
};
