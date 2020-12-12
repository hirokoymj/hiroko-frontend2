import gql from "graphql-tag";

import { CategoryFragments } from "./CategoryFragments";
import { SubCategoryFragments } from "./SubCategoryFragments";

export const TOPICS = gql`
  query Topics {
    topics {
      id
      title
      url
      category {
        ...CategoryInfo
      }
      subCategory {
        ...SubCategoryInfo
      }
    }
  }
  ${CategoryFragments.categoryInfo}
  ${SubCategoryFragments.subCategoryInfo}
`;

export const TOPIC_BY_ID = gql`
  query Topic_By_Id($id: ID!) {
    topicById(id: $id) {
      id
      title
      url
      category {
        ...CategoryInfo
      }
      subCategory {
        ...SubCategoryInfo
      }
    }
  }
  ${CategoryFragments.categoryInfo}
  ${SubCategoryFragments.subCategoryInfo}
`;

export const TOPIC_BY_CATEGORY = gql`
  query Topic_By_Category($id: ID!) {
    topicByCategory(categoryId: $id) {
      id
      title
      url
      category {
        ...CategoryInfo
      }
      subCategory {
        ...SubCategoryInfo
      }
    }
  }
  ${CategoryFragments.categoryInfo}
  ${SubCategoryFragments.subCategoryInfo}
`;
