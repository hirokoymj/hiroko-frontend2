import gql from "graphql-tag";

export const CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      abbr
      order
      createdAt
      updatedAt
    }
  }
`;

export const CATEGORY_BY_ID = gql`
  query Category_By_Id($id: ID!) {
    categoryById(id: $id) {
      id
      name
      abbr
      order
      createdAt
      updatedAt
    }
  }
`;
