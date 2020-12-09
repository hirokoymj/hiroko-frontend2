import gql from "graphql-tag";

export const CATEGORIES = gql`
  query Categories {
    categories {
      id
      name
      order
      createdAt
      updatedAt
    }
  }
`;
