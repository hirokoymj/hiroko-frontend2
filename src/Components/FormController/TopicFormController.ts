import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";

import { CREATE_TOPIC } from "Mutations/Topic";
import { CATEGORIES } from "Queries/Category";
import { TOPICS } from "Queries/Topic";
import { ICategoryFeed, ICategoriesVars } from "Types/api/Category";
import { ICreateTopicVars, ITopic } from "Types/api/Topic";
import { ITopicFormFields } from "Types/forms";
import { makeDropdownOptions } from "Components/FormController/common";
import { RootState } from "Redux/ReduxProvider";

type ITopicFormControllerProps = {
  children: any;
};
export const TopicFormController = ({
  children,
}: ITopicFormControllerProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const selectedFilters = useSelector(
    (state: RootState) => state.categoryFilter.value
  );
  const [createTopic] = useMutation<ITopic, ICreateTopicVars>(CREATE_TOPIC, {
    refetchQueries: [
      {
        query: TOPICS,
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
  });
  const { data, loading } = useQuery<ICategoryFeed, ICategoriesVars>(
    CATEGORIES
  );

  const category_options = makeDropdownOptions(
    data,
    "categories.categoryFeed",
    loading
  );

  const onSubmit = async (values: ITopicFormFields) => {
    try {
      await createTopic({
        variables: {
          input: {
            ...values,
            order: parseInt(values.order),
          },
        },
      });
      enqueueSnackbar("New topic has been created!", {
        variant: "success",
      });
    } catch (e) {
      console.error(e);
    }
  };

  return children({
    onSubmit,
    category_options,
    loading,
  });
};
