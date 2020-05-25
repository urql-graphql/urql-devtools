import React, { FC, useMemo, useCallback } from "react";
import { GraphQLNamedType } from "graphql";
import styled from "styled-components";
import { TypeMap } from "graphql/type/schema";

interface SearchProps {
  typeMap: TypeMap;
  setType: (type: GraphQLNamedType) => void;
}

export const Search: FC<SearchProps> = (props) => {
  const [results, setResults] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const typeKeys = useMemo(() => Object.keys(props.typeMap));

  const handleOnChange = () => {};
  return (
    <div>
      <input value={searchValue} />
      <ul>
        {results.map((res) => (
          <li>{res.name}</li>
        ))}
      </ul>
    </div>
  );
};

const StackHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(p) => p.theme.light["-5"]};
  background-color: ${(p) => p.theme.dark["+3"]};
  border-top: 1px solid ${(p) => p.theme.dark["+7"]};
  border-bottom: 1px solid ${(p) => p.theme.dark["+7"]};
  font-size: 13px;
  padding: 6px 12px;

  &:first-of-type {
    background-color: ${(p) => p.theme.dark["+5"]};
    border-bottom: none;
  }
`;

const StackWrapper = styled.div`
  box-sizing: border-box;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(p) => p.theme.dark["+1"]};
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const TypeKind = styled.code`
  color: ${(p) => p.theme.yellow["+3"]};
  margin-right: 6px;

  &[data-kind="interface"] {
    color: ${(p) => p.theme.red["+3"]};
  }

  &[data-kind="enum"] {
    color: ${(p) => p.theme.purple["+3"]};
  }

  &[data-kind="union"] {
    color: ${(p) => p.theme.blue["+3"]};
  }

  &[data-kind="scalar"] {
    color: ${(p) => p.theme.orange["+3"]};
  }
`;

const TextButton = styled.button`
  display: inline-block;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  color: ${(p) => p.theme.orange["+3"]};
  font-size: inherit;
  text-align: left;
  padding: 0;
  margin: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const BackButton = styled(TextButton)`
  width: max-content;
  color: ${(p) => p.theme.light["-9"]};
  font-size: 12px;
  border-radius: 3px;
  margin-right: 6px;
  padding: 4px 6px;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: ${(p) => p.theme.grey["-9"]};
    text-decoration: none;
  }
`;

const Title = styled.span`
  color: ${(p) => p.theme.light["-9"]};
  display: inline-block;
  padding: 4px 6px;
`;

const Description = styled.p`
  font-size: 13px;
  color: ${(p) => p.theme.light["-9"]};
  margin: 12px;
`;
