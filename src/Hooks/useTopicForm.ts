import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

import { CREATE_TOPIC } from "Mutations/Topic";
import { CATEGORIES } from "Queries/Category";
import { TOPICS } from "Queries/Topic";
import { SUB_CATEGORY_BY_CATEGORY } from "Queries/SubCategory";
import { ICategoryFeed, ICategoriesVars } from "Types/api/Category";
import { ICreateTopicVars, ITopic } from "Types/api/Topic";
import { ITopicFormFields } from "Types/forms";
import { makeDropdownOptions } from "Components/FormController/common";
import { RootState } from "Redux/ReduxProvider";
import {
  ISubCategory,
  ISubCategoryByCategoryVars,
} from "Types/api/SubCategory";

export const useTopicForm = (categoryId: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const selectedFilters = useSelector(
    (state: RootState) => state.categoryFilter.value
  );

  // Create Topic
  const [createTopic] = useMutation<ITopic, ICreateTopicVars>(CREATE_TOPIC, {
    refetchQueries: [
      {
        query: TOPICS,
        variables: {
          limit: 10,
          cursor: null,
          ...(selectedFilters.length !== 0 && {
            filter: selectedFilters,
          }),
        },
        fetchPolicy: "network-only",
      },
    ],
  });
  //
  // Category Dropdown
  //
  const { data, loading } = useQuery<ICategoryFeed, ICategoriesVars>(
    CATEGORIES
  );
  const category_options = makeDropdownOptions(
    data,
    "categories.categoryFeed",
    loading
  );
  //
  // SubCategory Dropdown
  //
  const { data: subCategoryData, loading: subCategoryLoading } = useQuery<
    ISubCategory,
    ISubCategoryByCategoryVars
  >(SUB_CATEGORY_BY_CATEGORY, {
    variables: {
      categoryId: categoryId,
    },
  });

  // Make dropdown
  const subCategory_options = makeDropdownOptions(
    subCategoryData,
    "subCategoryByCategory",
    subCategoryLoading
  );

  const onSubmit = async (values: ITopicFormFields) => {
    try {
      await createTopic({
        variables: {
          input: {
            ...values,
            order: parseInt(values.order),
          },
        },
      });
      enqueueSnackbar("New topic has been created!", {
        variant: "success",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const defaultValues = {
    category: "",
    subCategory: "",
    url: "",
    title: "",
    order: "", // <input type=number> type is number but string.
  };

  return {
    onSubmit,
    category_options,
    loading: loading || subCategoryLoading,
    defaultValues,
    subCategory_options,
  };
};
