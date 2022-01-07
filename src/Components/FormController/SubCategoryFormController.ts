import { destroy } from "redux-form";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { Dispatch } from "redux";
import { useSelector } from "react-redux";

import { CREATE_SUB_CATEGORY } from "Mutations/SubCategory";
import { SUB_CATEGORIES } from "Queries/SubCategory";
import { CATEGORIES } from "Queries/Category";
import { ICreateSubCategoryVars, ISubCategory } from "Types/api/SubCategory";
import { ICategoryFeed, ICategoriesVars } from "Types/api/Category";
import { TSubCategoryFormData } from "Types/forms";
import { RootState } from "Redux/ReduxProvider";
import { makeDropdownOptions } from "Components/FormController/common";

type Props = {
  children: any;
};

export const SubCategoryFormController = ({ children }: Props) => {
  const { enqueueSnackbar } = useSnackbar();
  const selectedFilters = useSelector(
    (state: RootState) => state.categoryFilter.value
  );
  const [createSubCategory] = useMutation<ISubCategory, ICreateSubCategoryVars>(
    CREATE_SUB_CATEGORY,
    {
      refetchQueries: [
        {
          query: SUB_CATEGORIES,
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
    }
  );
  const { data, loading } = useQuery<ICategoryFeed, ICategoriesVars>(
    CATEGORIES
  );
  const category_options = makeDropdownOptions(
    data,
    "categories.categoryFeed",
    loading
  );

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
