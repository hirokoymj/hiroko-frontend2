import gql from "graphql-tag";

export const ALL_CATEGORIES = gql`
  query AllCategories {
    allCategories {
      nodes {
        id
        categoryName
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      id
      name
    }
  }
`;
