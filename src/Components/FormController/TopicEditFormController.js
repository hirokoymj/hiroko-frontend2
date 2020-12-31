import { destroy } from "redux-form";
import { useQuery, useMutation } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";

import { UPDATE_TOPIC } from "Mutations/Topic";
import { SUB_CATEGORIES } from "Queries/SubCategory";
import { CATEGORIES } from "Queries/Category";
import { TOPIC_BY_ID } from "Queries/Topic";

const makeDropdownOptions = (category_data, subcategory_data, loading) => {
  const categories =
    !loading && get(category_data, "categories.categoryFeed", []);
  const subcategories =
    !loading && get(subcategory_data, "subCategories.subCategoryFeed", []);

  const category_options = map(categories, ({ id, name }) => {
    return {
      value: id,
      label: name,
    };
  });
  const subCategory_options = map(subcategories, ({ id, name, category }) => {
    return {
      value: id,
      label: name,
      categoryId: category.id,
    };
  });

  return {
    category_options,
    subCategory_options,
  };
};

export const TopicEditFormController = ({ children, topicId }) => {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [updateTopic] = useMutation(UPDATE_TOPIC);
  const { data, loading } = useQuery(CATEGORIES);
  const { data: data_subCategory, loading: loading_subCategory } = useQuery(
    SUB_CATEGORIES
  );
  const { data: data_topic, loading: loading_topic } = useQuery(TOPIC_BY_ID, {
    variables: {
      id: topicId,
    },
  });

  const { category_options, subCategory_options } = makeDropdownOptions(
    data,
    data_subCategory,
    loading || loading_subCategory
  );

  const initialValues = !loading_topic && {
    title: get(data_topic, "topicById.title"),
    url: get(data_topic, "topicById.url"),
    category: get(data_topic, "topicById.category.id"),
    subCategory: get(data_topic, "topicById.subCategory.id"),
  };

  const onSubmit = async (values, dispatch) => {
    try {
      await updateTopic({
        variables: {
          id: topicId,
          input: {
            ...values,
          },
        },
      });
      console.log("Success");
      dispatch(destroy("Topic_Edit_Form"));
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

  const validate = (values) => {
    const errors = {};
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
    initialValues,
    loading: loading || loading_subCategory,
  });
};
