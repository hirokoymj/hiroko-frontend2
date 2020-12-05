import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";

import { ALL_CATEGORIES } from "../Category";
import { ALL_CATEGORY_SUBCATEGORY_LISTS } from "../CategorySubCategory";

const makeDropdownOptions = (category_data, subcategory_data, loading) => {
  let category_options = [];
  let subcategory_options = [];

  if (!loading) {
    const categories = get(category_data, "allCategories.nodes", []);
    const subcategories = get(
      subcategory_data,
      "allCategorySubcategoryLists.nodes",
      []
    );

    category_options = map(categories, (category) => {
      return {
        label: category.categoryName,
        value: category.id,
      };
    });
    subcategory_options = map(subcategories, (subcategory) => {
      return {
        label: subcategory.subcategoryName,
        value: subcategory.subcategoryId,
        categoryId: subcategory.categoryId,
      };
    });
  }

  return {
    category_options,
    subcategory_options,
  };
};

export const useCategorySubcategoryOptions = () => {
  const { data, loading } = useQuery(ALL_CATEGORIES);

  const {
    data: allCategorySubcategoryLists,
    loading: allCategorySubcategoryListsLoading,
  } = useQuery(ALL_CATEGORY_SUBCATEGORY_LISTS);

  const { category_options, subcategory_options } = makeDropdownOptions(
    data,
    allCategorySubcategoryLists,
    loading || allCategorySubcategoryListsLoading
  );

  return {
    category_options,
    subcategory_options,
  };
};
