import { useQuery, useMutation } from "@apollo/react-hooks";
import get from "lodash/get";
import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import { UPDATE_SUB_CATEGORY } from "Mutations/SubCategory";
import { SUB_CATEGORY_BY_ID } from "Queries/SubCategory";
import { CATEGORIES } from "Queries/Category";
import { ICategoriesVars, ICategoryFeed } from "Types/api/Category";
import {
  ISubCategory,
  IUpdateSubCategoryVars,
  ISubCategoryByIdVars,
} from "Types/api/SubCategory";
import { ISubCategoryFormFields } from "Types/forms";
import { IDropdownOption } from "Types/common";

export const useSubCategoryEditForm = (subCategoryId: string) => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const [updateSubCategory] = useMutation<ISubCategory, IUpdateSubCategoryVars>(
    UPDATE_SUB_CATEGORY
  );
  const { data, loading } = useQuery<ICategoryFeed, ICategoriesVars>(
    CATEGORIES
  );
  const { data: data_sub_category, loading: loading_sub_category } = useQuery<
    ISubCategory,
    ISubCategoryByIdVars
  >(SUB_CATEGORY_BY_ID, {
    variables: {
      id: subCategoryId,
    },
  });

  const initialValues = !loading_sub_category && {
    categoryId: get(data_sub_category, "subCategoryById.category.id", ""),
    name: get(data_sub_category, "subCategoryById.name", ""),
    order: get(data_sub_category, "subCategoryById.order", 1),
  };

  const categories = !loading && get(data, "categories.categoryFeed", []);
  const category_options =
    !loading &&
    categories.map(({ id, name }: IDropdownOption) => {
      return {
        value: id,
        label: name,
      };
    });

  const onSubmit = async (values: ISubCategoryFormFields) => {
    try {
      const { name, categoryId, order } = values;
      await updateSubCategory({
        variables: {
          id: subCategoryId,
          input: {
            name,
            category: categoryId,
            order: parseInt(order),
          },
        },
      });
      enqueueSnackbar("Sub Category successfully updated!", {
        variant: "success",
      });
      history.push("/subCategoryList");
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Failed to update sub category", {
        variant: "error",
      });
    }
  };

  return {
    onSubmit,
    category_options,
    initialValues,
    loading: loading || loading_sub_category,
  };
};
