import gql from "graphql-tag";

export const ALL_TOPIC_VIEWS = gql`
  query AllTopicViews {
    allTopicViews(orderBy: CATEGORY_ID_ASC) {
      nodes {
        id
        categoryId
        categoryName
        subcategoryId
        subcategoryName
        title
        url
      }
    }
  }
`;

export const TOPIC_BY_ID = gql`
  query TopicById($id: UUID!) {
    topicById(id: $id) {
      id
      categoryByCategoryId {
        id
        categoryName
      }
      subcategoryBySubcategoryId {
        id
        subcategoryName
      }
      title
      url
    }
  }
`;
