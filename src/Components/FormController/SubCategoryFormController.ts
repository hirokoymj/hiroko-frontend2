import { destroy } from "redux-form";
import { useQuery, useMutation } from "@apollo/react-hooks";
import get from "lodash/get";
import { useSnackbar } from "notistack";
import { Dispatch } from "redux";

import { CREATE_SUB_CATEGORY } from "Mutations/SubCategory";
import { SUB_CATEGORIES } from "Queries/SubCategory";
import { CATEGORIES } from "Queries/Category";
import { ICreateSubCategory, ISubCategory } from "Types/api/SubCategory";
import { ICategories } from "Types/api/Category";
import { IDropdownOption } from "Types/common";
import { TSubCategoryFormData } from "Types/forms";

type Props = {
  children: any;
};

export const SubCategoryFormController = ({ children }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const [createSubCategory] = useMutation<ISubCategory, ICreateSubCategory>(
    CREATE_SUB_CATEGORY,
    {
      refetchQueries: [
        {
          query: SUB_CATEGORIES,
          variables: { limit: 5, cursor: null },
          fetchPolicy: "network-only",
        },
      ],
    }
  );
  const { data, loading } = useQuery<ICategories>(CATEGORIES);

  const categories = !loading && get(data, "categories.categoryFeed");

  const category_options =
    !loading &&
    categories.map(({ id, name }: IDropdownOption) => {
      return {
        value: id,
        label: name,
      };
    });

  const onSubmit = async (values: TSubCategoryFormData, dispatch: Dispatch) => {
    try {
      const { name, categoryId } = values;
      await createSubCategory({
        variables: {
          input: {
            name,
            category: categoryId,
          },
        },
      });
      dispatch(destroy("Sub_Category_Form"));
      enqueueSnackbar("New sub category has been created!", {
        variant: "success",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const validate = (values: TSubCategoryFormData) => {
    const errors: any = {};
    if (!values.name) errors.name = "Required";
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
