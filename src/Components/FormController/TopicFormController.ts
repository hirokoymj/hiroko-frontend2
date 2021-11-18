import { destroy } from "redux-form";
import { useQuery, useMutation } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import { useSnackbar } from "notistack";
import { Dispatch } from "redux";

import { CREATE_TOPIC } from "Mutations/Topic";
import { SUB_CATEGORIES } from "Queries/SubCategory";
import { CATEGORIES } from "Queries/Category";
import { TOPICS } from "Queries/Topic";
import { ICategoryFeed, ICategoriesVars } from "Types/api/Category";
import { ISubCategoriesVars, ISubCategoryFeed } from "Types/api/SubCategory";
import { ICreateTopicVars, ITopic } from "Types/api/Topic";
import { TTopicFormData } from "Types/forms";

const makeDropdownOptions = (
  category_data: any,
  subcategory_data: any,
  loading: boolean
) => {
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

type ITopicFormControllerProps = {
  children: any;
};
export const TopicFormController = ({
  children,
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
  const { data: data_subCategory, loading: loading_subCategory } = useQuery<
    ISubCategoryFeed,
    ISubCategoriesVars
  >(SUB_CATEGORIES);

  const { category_options, subCategory_options } = makeDropdownOptions(
    data,
    data_subCategory,
    loading || loading_subCategory
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
      console.log("Success");
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
    loading: loading || loading_subCategory,
  });
};
