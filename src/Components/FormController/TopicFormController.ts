import { destroy } from "redux-form";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { Dispatch } from "redux";

import { CREATE_TOPIC } from "Mutations/Topic";
import { CATEGORIES } from "Queries/Category";
import { TOPICS } from "Queries/Topic";
import { ICategoryFeed, ICategoriesVars } from "Types/api/Category";
import { ICreateTopicVars, ITopic } from "Types/api/Topic";
import { TTopicFormData } from "Types/forms";
import { SUB_CATEGORY_BY_CATEGORY } from "Queries/SubCategory";
import {
  ISubCategory,
  ISubCategoryByCategoryVars,
} from "Types/api/SubCategory";
import { makeDropdownOptions } from "Components/FormController/common";

type ITopicFormControllerProps = {
  children: any;
  categoryId: string;
};
export const TopicFormController = ({
  children,
  categoryId,
}: ITopicFormControllerProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [createTopic] = useMutation<ITopic, ICreateTopicVars>(CREATE_TOPIC, {
    refetchQueries: [
      {
        query: TOPICS,
        variables: { limit: 5, cursor: null },
        fetchPolicy: "network-only",
      },
    ],
  });
  const { data, loading } = useQuery<ICategoryFeed, ICategoriesVars>(
    CATEGORIES
  );

  const { data: subCategoryData, loading: subCategoryLoading } = useQuery<
    ISubCategory,
    ISubCategoryByCategoryVars
  >(SUB_CATEGORY_BY_CATEGORY, {
    variables: {
      categoryId: categoryId === "undefined" ? "" : categoryId,
    },
  });
  const category_options = makeDropdownOptions(
    data,
    "categories.categoryFeed",
    loading
  );
  const subCategory_options = makeDropdownOptions(
    subCategoryData,
    "subCategoryByCategory",
    subCategoryLoading
  );

  const onSubmit = async (values: TTopicFormData, dispatch: Dispatch) => {
    try {
      await createTopic({
        variables: {
          input: {
            ...values,
          },
        },
      });
      dispatch(destroy("Create_Topic_Form"));
      enqueueSnackbar("New topic has been created!", {
        variant: "success",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const validate = (values: TTopicFormData) => {
    const errors: any = {};
    if (!values.category) errors.category = "Required";
    if (!values.subCategory) errors.subCategory = "Required";
    if (!values.title) errors.title = "Required";
    if (!values.url) errors.url = "Required";

    return errors;
  };

  return children({
    onSubmit,
    validate,
    category_options,
    subCategory_options,
    loading: loading || subCategoryLoading,
  });
};
