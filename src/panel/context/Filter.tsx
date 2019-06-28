import React, { createContext, FC, useState } from "react";

import { UrqlEvent } from "../../types";

export enum FilterType {
  Name = "name",
  Key = "key",
  Info = "info"
}

interface Filter {
  value: string;
  propName: FilterType;
  propGetter: (e: UrqlEvent) => string | number;
}

interface FilterContextValue {
  filters: Filter[];
  addFilter: (filter: Filter) => void;
  removeFilter: (filter: Filter) => void;
}

export const FilterContext = createContext<FilterContextValue>(
  undefined as any
);

function filterFilters(filters: Filter[], incomingFilter: Filter) {
  return filters.filter(
    f =>
      f.value !== incomingFilter.value && f.propName !== incomingFilter.propName
  );
}

export const FilterProvider: FC = ({ children }) => {
  const [filters, setFilters] = useState<Filter[]>([]);

  const addFilter = (filter: Filter) => {
    return setFilters([filter, ...filterFilters(filters, filter)]);
  };

  const removeFilter = (filter: Filter) => {
    return setFilters(filterFilters(filters, filter));
  };

  const value = {
    filters,
    addFilter,
    removeFilter
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
