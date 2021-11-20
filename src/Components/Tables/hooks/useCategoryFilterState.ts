import React from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";

import { CATEGORY_ALL } from "Queries/Category";
import { ICategory } from "Types/api/Category";

type TCategoryOption = Pick<ICategory, "name" | "id">;

export const useCategoryFilterState = () => {
  const { data, loading: category_loading } = useQuery<ICategory>(CATEGORY_ALL);
  const [selectedFilters, setSelectedFilters] = React.useState([]);
  const categories = !category_loading && get(data, "categoryAll");
  const filters =
    !category_loading &&
    categories.map(({ name, id }: TCategoryOption) => {
      return {
        name: name,
        value: id,
      };
    });

  const handleFilterChange = (event: any) => {
    setSelectedFilters(event.target.value);
  };

  const handleDeleteFilter = (value: string) => () => {
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
