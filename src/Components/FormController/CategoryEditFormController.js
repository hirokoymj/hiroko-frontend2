import { destroy } from "redux-form";
import { useQuery, useMutation } from "@apollo/react-hooks";
import get from "lodash/get";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import { UPDATE_CATEGORY } from "Mutations/Category";
import { CATEGORY_BY_ID } from "Queries/Category";
import { CATEGORIES } from "Queries/Category";

export const CategoryEditFormController = ({ children, categoryId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [updateCategory] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: [{ query: CATEGORIES }],
  });
  const { data, loading } = useQuery(CATEGORY_BY_ID, {
    variables: {
      id: categoryId,
    },
  });

  const initialValues = !loading && {
    id: get(data, "categoryById.id"),
    name: get(data, "categoryById.name", ""),
    abbr: get(data, "categoryById.abbr", ""),
  };

  const onSubmit = async (values, dispatch) => {
    try {
      const { name, abbr } = values;
      await updateCategory({
        variables: {
          id: categoryId,
          input: {
            name,
            abbr,
          },
        },
      });
      dispatch(destroy("Category_Edit_Form"));
      enqueueSnackbar("Category successfully updated!", {
        variant: "success",
      });
      history.push("/categoryList");
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Failed to update category", {
        variant: "error",
      });
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
    initialValues,
    loading,
  });
};
