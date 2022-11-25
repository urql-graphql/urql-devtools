import React, {
  FC,
  useMemo,
  useCallback,
  ChangeEvent,
  useState,
  useEffect,
  useRef,
} from "react";
import styled from "styled-components";
import { GraphQLNamedType } from "graphql";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { rem } from "polished";

interface SearchProps {
  // TODO: replacement for TypeMap
  typeMap: any;
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
        <Input
          type="search"
          value={searchValue}
          onChange={handleOnChange}
          placeholder="Search for a type in schema"
        />
        <Icon icon={faSearch} />
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
  flex: 1;
`;

const Icon = styled(FontAwesomeIcon)`
  font-size: ${(p) => p.theme.fontSizes.body.l};
  line-height: ${(p) => p.theme.lineHeights.body.l};
  color: ${(p) => p.theme.colors.textDimmed.base};
  pointer-events: none;

  input:focus ~ & {
    color: ${(p) => p.theme.colors.primary.base};
  }
`;

const InputWrapper = styled.label`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  color: ${(p) => p.theme.colors.textDimmed.base};
  padding-left: ${(p) => p.theme.space[3]};
  border-left: 1px solid ${(p) => p.theme.colors.divider.base};
`;

const Input = styled.input`
  flex: 1;
  background-color: transparent;
  border: none;
  width: 100%;
  height: ${rem(32)};
  padding: 0 ${(p) => p.theme.space[3]};
  color: ${(p) => p.theme.colors.text.base};
  font-size: ${(p) => p.theme.fontSizes.body.m};

  &:focus {
    outline: none;
  }

  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
`;

const List = styled.ul`
  position: absolute;
  right: 0;
  left: ${rem(64)};
  display: flex;
  width: ${rem(250)};
  max-height: ${rem(400)};
  margin-top: 0;
  padding: ${(p) => p.theme.space[3]};
  list-style: none;
  flex-direction: column;
  background-color: ${(p) => p.theme.colors.canvas.base};
  border: 1px solid ${(p) => p.theme.colors.divider.base};

  z-index: 2;
  overflow: auto;
`;

const ListItem = styled.li`
  padding: ${(p) => p.theme.space[3]};

  &:hover {
    background-color: ${(p) => p.theme.colors.canvas.hover};
  }
`;

const TextButton = styled.button`
  display: inline-block;
  width: 100%;
  background: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  color: ${(p) => p.theme.colors.text.base};
  font-size: inherit;
  text-align: left;
  padding: 0;
  margin: 0;

  &:hover {
    text-decoration: underline;
  }
`;
