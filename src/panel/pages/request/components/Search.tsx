import React, {
  FC,
  useMemo,
  useCallback,
  ChangeEvent,
  useState,
  useEffect,
  useRef,
} from "react";
import { GraphQLNamedType } from "graphql";
import styled from "styled-components";
import { TypeMap } from "graphql/type/schema";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchProps {
  typeMap: TypeMap;
  setType: (type: GraphQLNamedType) => void;
}

export const Search: FC<SearchProps> = ({ typeMap, setType }) => {
  const containerRef = useRef<HTMLDivElement>(undefined as any);
  const [searchValue, setSearchValue] = useState<string>("");
  const [listOpen, setListOpen] = useState<boolean>(false);

  let typeKeys = useMemo(() => Object.keys(typeMap), [typeMap]);

  const results = useMemo(
    () =>
      (typeKeys = typeKeys.filter((key) =>
        searchValue.length === 1
          ? key.toLowerCase().startsWith(searchValue.toLowerCase())
          : key.toLowerCase().includes(searchValue.toLowerCase())
      )),
    [searchValue]
  );

  useEffect(() => {
    if (searchValue && results.length) {
      setListOpen(true);
    } else {
      setListOpen(false);
    }
  }, [searchValue, results]);

  useEffect(() => {
    const onOutsideClick = (e: MouseEvent) => {
      if (!containerRef?.current?.contains(e.target as Node)) {
        setListOpen(false);
      } else if (searchValue && results.length) {
        setListOpen(true);
      }
    };

    window.addEventListener("click", onOutsideClick);

    return () => {
      window.removeEventListener("click", onOutsideClick);
    };
  }, [searchValue, results]);

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value || "");
    },
    [setSearchValue]
  );

  const handleTypeSelect = useCallback(
    (type) => {
      setType(type);
      setListOpen(false);
    },
    [setListOpen, setType]
  );

  return (
    <Container ref={containerRef}>
      <InputWrapper>
        <Icon icon={faSearch} />
        <Input
          type="search"
          value={searchValue}
          onChange={handleOnChange}
          placeholder="Search for a type in schema"
        />
      </InputWrapper>
      {listOpen ? (
        <List>
          {results.map((res, i) => (
            <ListItem key={i}>
              <TextButton onClick={() => handleTypeSelect(typeMap[res])}>
                <HighlightMatch name={typeMap[res].name} term={searchValue} />
              </TextButton>
            </ListItem>
          ))}
        </List>
      ) : null}
    </Container>
  );
};

interface HighlightProps {
  name: string;
  term: string;
}

const HighlightMatch: FC<HighlightProps> = ({ name, term }) => {
  const start = name.toLowerCase().indexOf(term.toLowerCase());
  const end = start + term.length;

  return (
    <>
      <span>{name.slice(0, start)}</span>
      <strong>{name.slice(start, end)}</strong>
      <span>{name.slice(end, name.length)}</span>
    </>
  );
};

const Container = styled.div`
  width: 250px;
  background-color: ${(p) => p.theme.dark["+5"]};
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: 13px;
  margin-right: 6px;
  color: ${(p) => p.theme.light["-9"]};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: ${(p) => p.theme.light["-5"]};
  font-size: 13px;
  padding: 6px 12px;
  padding-left: 0;

  &::before {
    content: "|";
    display: inline-block;
    color: ${(p) => p.theme.grey["-2"]};
    padding-right: 6px;
  }
`;

const Input = styled.input`
  background-color: transparent;
  border: none;
  width: 100%;
  color: ${(p) => p.theme.light["-5"]};

  padding-bottom: 3px;
  border-bottom: 1px solid transparent;

  &:focus {
    outline: none;
    border-bottom: 1px solid ${(p) => p.theme.grey["-5"]};
  }
`;

const List = styled.ul`
  position: absolute;
  right: 0;
  left: 55px;
  display: flex;
  width: 250px;
  max-height: 400px;
  margin-top: 0;
  padding: 12px 6px;
  list-style: none;
  flex-direction: column;
  background-color: ${(p) => p.theme.dark["+2"]};
  border: 1px solid ${(p) => p.theme.dark["+4"]};

  z-index: 2;
  overflow: auto;
`;

const ListItem = styled.li`
  padding: 6px;

  &:hover {
    background-color: ${(p) => p.theme.dark["+3"]};
  }
`;

const TextButton = styled.button`
  display: inline-block;
  width: 100%;
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
