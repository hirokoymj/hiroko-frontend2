import { destroy } from "redux-form";
import { useQuery, useMutation } from "@apollo/react-hooks";
import get from "lodash/get";

import { CREATE_SUB_CATEGORY } from "Mutations/SubCategory";
import { SUB_CATEGORIES } from "Queries/SubCategory";
import { CATEGORIES } from "Queries/Category";

export const SubCategoryFormController = ({ children }) => {
  const [createSubCategory] = useMutation(CREATE_SUB_CATEGORY, {
    refetchQueries: [{ query: SUB_CATEGORIES }],
  });

  const { data, loading } = useQuery(CATEGORIES);
  let category_options = [];

  if (!loading) {
    const categories = get(data, "categories");
    category_options = categories.map(({ id, name }) => {
      return {
        value: id,
        label: name,
      };
    });
  }

  const onSubmit = async (values, dispatch) => {
    try {
      const { name, order, categoryId } = values;
      await createSubCategory({
        variables: {
          input: {
            name,
            order: parseInt(order),
            category: categoryId,
          },
        },
      });
      console.log("Success");
      dispatch(destroy("Sub_Category_Form"));
    } catch (e) {
      console.error(e);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Required";
    if (!values.order) errors.order = "Required";
    if (!values.categoryId) errors.categoryId = "Required";

    return errors;
  };

  return children({
    onSubmit,
    validate,
    category_options,
    loading,
  });
};
