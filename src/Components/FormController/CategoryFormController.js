import { destroy } from "redux-form";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";

import { CREATE_CATEGORY } from "Mutations/Category";
import { CATEGORIES } from "Queries/Category";

export const CategoryFormController = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [createCategory] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [
      {
        query: CATEGORIES,
        variables: { limit: 5, cursor: null },
        fetchPolicy: "network-only",
      },
    ],
  });

  const onSubmit = async (values, dispatch) => {
    try {
      await createCategory({
        variables: {
          input: {
            ...values,
          },
        },
      });
      dispatch(destroy("Category_Form"));
      enqueueSnackbar("New category has been created!", {
        variant: "success",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const validate = (values) => {
    const errors = {};
    if (!values.name) errors.name = "Required";
    if (!values.abbr) errors.abbr = "Required";

    return errors;
  };

  return children({
    onSubmit,
    validate,
  });
};
