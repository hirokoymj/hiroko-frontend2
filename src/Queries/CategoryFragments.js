import gql from "graphql-tag";

export const CategoryFragments = {
  categoryInfo: gql`
    fragment CategoryInfo on Category {
      id
      name
      abbr
      order
      createdAt
      updatedAt
    }
  `,
};
