import gql from "graphql-tag";

export const ALL_CATEGORY_SUBCATEGORY_LISTS = gql`
  query AllCategorySubcategoryLists {
    allCategorySubcategoryLists {
      nodes {
        categoryId
        categoryName
        subcategoryId
        subcategoryName
      }
    }
  }
`;
