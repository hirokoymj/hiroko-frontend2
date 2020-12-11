import gql from "graphql-tag";

import { CategoryFragments } from "./CategoryFragments";

export const SUB_CATEGORIES = gql`
  query SubCategories {
    subCategories {
      id
      name
      order
      createdAt
      updatedAt
      category {
        ...CategoryInfo
      }
    }
  }
  ${CategoryFragments.categoryInfo}
`;

export const SUB_CATEGORIES_By_ID = gql`
  query SubCategoriesById($id: ID!) {
    subCategoriesById(id: $id) {
      id
      name
      order
      createdAt
      updatedAt
      category {
        ...CategoryInfo
      }
    }
  }
  ${CategoryFragments.categoryInfo}
`;

export const SUB_CATEGORY_BY_CATEGORY = gql`
  query SubCategoryByCategory($categoryId: ID!) {
    subCategoryByCategory(categoryId: $categoryId) {
      id
      name
      order
      createdAt
      updatedAt
      category {
        ...CategoryInfo
      }
    }
  }
  ${CategoryFragments.categoryInfo}
`;
