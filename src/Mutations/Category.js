import gql from "graphql-tag";

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: createCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      order
      createdAt
      updatedAt
    }
  }
`;
