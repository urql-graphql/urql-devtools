import { DevtoolsExchangeOutgoingMessage } from "@urql/devtools";

const filterEventTypes = <T extends DevtoolsExchangeOutgoingMessage["type"]>(
  types: T[]
) => {};

type FilterType<T, A> = A extends { type: T } ? true : false;

const excludeEventTypes = <T extends DevtoolsExchangeOutgoingMessage["type"]>(
  types: T[]
) => <E extends DevtoolsExchangeOutgoingMessage>(
  event: E
): FilterType<T, E> => {
  if (types.indexOf(event.type as any)) {
    return true;
  }

  return false;
};
