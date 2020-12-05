import gql from "graphql-tag";

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($input: CategoryInput!){
    category(input: category: $input)){
      id
      categoryName
    }
  }
}`;
