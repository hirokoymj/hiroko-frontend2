import { useQuery, useMutation } from "@apollo/react-hooks";
import get from "lodash/get";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import { UPDATE_CATEGORY } from "Mutations/Category";
import { CATEGORY_BY_ID } from "Queries/Category";
import { CATEGORIES } from "Queries/Category";
import {
  ICategory,
  IUpdateCategoryVars,
  ICategoryByIdVars,
} from "Types/api/Category";
import { ICategoryFormFields } from "Types/forms";

export const useCategoryEditForm = (categoryId: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [updateCategory] = useMutation<ICategory, IUpdateCategoryVars>(
    UPDATE_CATEGORY,
    {
      refetchQueries: [{ query: CATEGORIES }],
    }
  );
  const { data, loading } = useQuery<ICategory, ICategoryByIdVars>(
    CATEGORY_BY_ID,
    {
      variables: {
        id: categoryId,
      },
    }
  );

  const initialValues = !loading && {
    name: get(data, "categoryById.name", ""),
    abbr: get(data, "categoryById.abbr", ""),
  };

  const onSubmit = async (values: ICategoryFormFields) => {
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

  return {
    onSubmit,
    initialValues,
    loading,
  };
};
