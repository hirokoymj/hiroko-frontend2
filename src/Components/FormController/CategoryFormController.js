import { destroy } from "redux-form";
import { useMutation } from "@apollo/react-hooks";

import { CREATE_CATEGORY } from "Mutations/Category";
// import { CATEGORIES } from "Queries/Category";

export const CategoryFormController = ({ children }) => {
  const [createCategory] = useMutation(CREATE_CATEGORY);

  const onSubmit = async (values, dispatch) => {
    try {
      const { name, order } = values;
      await createCategory({
        variables: {
          input: {
            name,
            order: parseInt(order),
          },
        },
      });
      console.log("Success");
      dispatch(destroy("Category_Form"));
    } catch (e) {
      console.error(e);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.categoryName) errors.categoryName = "Required";
    if (!values.categoryOrder) errors.categoryOrder = "Required";

    return errors;
  };

  return children({
    onSubmit,
    validate,
  });
};
