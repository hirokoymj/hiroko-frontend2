import gql from "graphql-tag";
import { CategoryFragments } from "../Queries/CategoryFragments";
import { SubCategoryFragments } from "../Queries/SubCategoryFragments";

export const CREATE_TOPIC = gql`
  mutation CreateTopic($input: createTopicInput!) {
    createTopic(input: $input) {
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

export const DELETE_TOPIC = gql`
  mutation DeleteTopic($id: ID!) {
    deleteTopic(id: $id) {
      id
      title
      url
    }
  }
`;

export const UPDATE_TOPIC = gql`
  mutation UpdateTopic($id: ID!, $input: updateTopicInput!) {
    updateTopic(id: $id, input: $input) {
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
