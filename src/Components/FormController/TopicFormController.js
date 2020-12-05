import { destroy } from "redux-form";
import { useMutation, useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";

import { ALL_CATEGORIES } from "../../Queries/Category";
import { ALL_CATEGORY_SUBCATEGORY_LISTS } from "../../Queries/CategorySubCategory";
import { ALL_TOPIC_VIEWS } from "../../Queries/Topic";
import { CREATE_TOPIC } from "../../Mutations/Topic";

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

export const TopicFormController = ({ children }) => {
  const [createTopic] = useMutation(CREATE_TOPIC, [
    {
      refetchQueries: [{ query: ALL_TOPIC_VIEWS }],
    },
  ]);

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

  const initialValues = {
    categoryId: 2,
  };

  const onSubmit = async (values, dispatch) => {
    try {
      await createTopic({
        variables: {
          input: {
            ...values,
          },
        },
      });
      console.log("Success");
      dispatch(destroy("Topic_Form"));
    } catch (e) {
      console.error(e);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.subcategoryId) errors.subcategoryId = "Required";
    if (!values.categoryId) errors.categoryId = "Required";
    if (!values.url) errors.url = "Required";
    if (!values.title) errors.title = "Required";

    return errors;
  };

  return children({
    onSubmit,
    initialValues,
    validate,
    loading: loading || allCategorySubcategoryListsLoading,
    category_options,
    subcategory_options,
  });
};
