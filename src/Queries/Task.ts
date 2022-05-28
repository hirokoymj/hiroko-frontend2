import gql from "graphql-tag";

export const TASKS = gql`
  query Tasks($limit: Int, $cursor: String, $sortBy: TaskOrderByEnum) {
    tasks(limit: $limit, cursor: $cursor, sortBy: $sortBy) {
      taskFeed {
        id
        name
        completed
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
