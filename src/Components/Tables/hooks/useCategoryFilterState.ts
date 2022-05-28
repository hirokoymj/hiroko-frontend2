import { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import { useDispatch } from "react-redux";
import {
  setCategoryFilter,
  updateCategoryFilter,
} from "Redux/Filter/categoryFilterSlice";

import { CATEGORY_ALL } from "Queries/Category";
import { ICategory } from "Types/api/Category";

type TCategoryOption = Pick<ICategory, "name" | "id">;

export const useCategoryFilterState = () => {
  const { data, loading: category_loading } = useQuery<ICategory>(CATEGORY_ALL);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const categories = !category_loading && get(data, "categoryAll");
  const filters =
    !category_loading &&
    categories.map(({ name, id }: TCategoryOption) => {
      return {
        name: name,
        value: id,
      };
    });
  const dispatch = useDispatch();

  const handleFilterChange = (event: any) => {
    setSelectedFilters(event.target.value);
    dispatch(setCategoryFilter(event.target.value));
  };

  const handleDeleteFilter = (value: string) => () => {
    const result = selectedFilters.filter((filter) => filter !== value);
    setSelectedFilters(result);
    dispatch(updateCategoryFilter(result));
  };

  return {
    category_loading,
    selectedFilters,
    filters,
    handleFilterChange,
    handleDeleteFilter,
  };
};
