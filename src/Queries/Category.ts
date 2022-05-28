import gql from "graphql-tag";

export const CATEGORIES = gql`
  query Categories($limit: Int, $cursor: String, $filter: [String]) {
    categories(limit: $limit, cursor: $cursor, filter: $filter) {
      categoryFeed {
        id
        name
        abbr
        createdAt
        updatedAt
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
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

export const CATEGORY_ALL = gql`
  query CategoryAll {
    categoryAll {
      id
      name
      abbr
      createdAt
      updatedAt
    }
  }
`;
