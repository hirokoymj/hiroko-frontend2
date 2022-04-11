import { useQuery, useMutation } from "@apollo/react-hooks";
import get from "lodash/get";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import { UPDATE_TOPIC } from "Mutations/Topic";
import { CATEGORIES } from "Queries/Category";
import { TOPIC_BY_ID } from "Queries/Topic";
import { ICategoryFeed, ICategoriesVars } from "Types/api/Category";
import { IUpdateTopicVars, ITopic, ITopicByIdVars } from "Types/api/Topic";
import { ITopicFormFields } from "Types/forms";
import { SUB_CATEGORY_BY_CATEGORY } from "Queries/SubCategory";
import {
  ISubCategory,
  ISubCategoryByCategoryVars,
} from "Types/api/SubCategory";
import { makeDropdownOptions } from "Components/FormController/common";

interface ITopicEditFormControllerProps {
  children: any;
  topicId: string;
  categoryId: string;
}
export const TopicEditFormController = (
  props: ITopicEditFormControllerProps
) => {
  const { children, topicId, categoryId } = props;
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [updateTopic] = useMutation<ITopic, IUpdateTopicVars>(UPDATE_TOPIC);
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

  const { data: topicData, loading: topicLoading } = useQuery<
    ITopic,
    ITopicByIdVars
  >(TOPIC_BY_ID, {
    variables: {
      id: topicId,
    },
  });

  const initialValues = !topicLoading && {
    title: get(topicData, "topicById.title", ""),
    url: get(topicData, "topicById.url", ""),
    category: get(topicData, "topicById.category.id", ""),
    subCategory: get(topicData, "topicById.subCategory.id", ""),
    order: get(topicData, "topicById.order", 0),
  };

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

  const onSubmit = async (values: ITopicFormFields) => {
    try {
      await updateTopic({
        variables: {
          id: topicId,
          input: {
            ...values,
            order: parseInt(values.order),
          },
        },
      });
      console.log("Success");
      enqueueSnackbar("Topic successfully updated!", {
        variant: "success",
      });
      history.push("/topicList");
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Faild to update Topic.", {
        variant: "error",
      });
    }
  };

  return children({
    onSubmit,
    category_options,
    subCategory_options,
    initialValues,
    loading: loading || subCategoryLoading || topicLoading,
  });
};
