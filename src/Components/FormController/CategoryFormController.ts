import { destroy } from "redux-form";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { Dispatch } from "redux";

import { CREATE_CATEGORY } from "Mutations/Category";
import { CATEGORIES } from "Queries/Category";
import { ICreateCategoryVars, ICategory } from "Types/api/Category";
import { ICategoryFormData } from "Types/forms";

type Props = {
  children: any;
};

export const CategoryFormController = ({ children }: Props) => {
  const { enqueueSnackbar } = useSnackbar();

  const [createCategory] = useMutation<ICategory, ICreateCategoryVars>(
    CREATE_CATEGORY,
    {
      refetchQueries: [
        {
          query: CATEGORIES,
          variables: { limit: 5, cursor: null },
          fetchPolicy: "network-only",
        },
      ],
    }
  );

  const onSubmit = async (values: ICategoryFormData, dispatch: Dispatch) => {
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

  const validate = (values: ICategoryFormData) => {
    const errors: { name?: string; abbr?: string } = {};
    if (!values.name) errors.name = "Required";
    if (!values.abbr) errors.abbr = "Required";

    return errors;
  };

  return children({
    onSubmit,
    validate,
  });
};
