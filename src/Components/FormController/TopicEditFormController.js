import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";

import { TOPIC_BY_ID } from "../../Queries/Topic";

export const TopicEditFormController = ({ children, id }) => {
  console.log("TopicEditFormController");
  const { data, loading } = useQuery(TOPIC_BY_ID, {
    variables: {
      id,
    },
  });
  const initialValues = !loading && {
    categoryId: get(data, "topicById.categoryByCategoryId.id"),
    subcategoryId: get(data, "topicById.subcategoryBySubcategoryId.id"),
    title: get(data, "topicById.title"),
    url: get(data, "topicById.url"),
  };

  const onSubmit = (values) => {};

  const validate = (values) => {};

  return children({
    onSubmit,
    initialValues,
    validate,
    loading,
  });
};
