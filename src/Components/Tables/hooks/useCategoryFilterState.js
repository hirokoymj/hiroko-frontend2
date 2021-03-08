import React from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";

import { CATEGORY_ALL } from "Queries/Category";

export const useCategoryFilterState = () => {
  const { data, loading: category_loading } = useQuery(CATEGORY_ALL);
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const categories = !category_loading && get(data, "categoryAll");
  const filters =
    !category_loading &&
    categories.map(({ name, id }) => {
      return {
        name: name,
        value: id,
      };
    });

  const handleFilterChange = (event) => {
    console.log("handleFilterChagne");
    console.log(event.target);
    console.log(event.target.value);
    setSelectedFilters(event.target.value);
  };

  const handleDeleteFilter = (value) => () => {
    setSelectedFilters((chips) => {
      const result = chips.filter((chip) => chip !== value);
      return result;
    });
  };

  return {
    category_loading,
    selectedFilters,
    filters,
    handleFilterChange,
    handleDeleteFilter,
  };
};
