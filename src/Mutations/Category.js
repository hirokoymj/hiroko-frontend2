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

export const DELETE_CATEGORY = gql`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id) {
      id
      name
      order
      createdAt
      updatedAt
    }
  }
`;
