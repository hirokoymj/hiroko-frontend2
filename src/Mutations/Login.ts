import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation LoginUser($loginInput: LoginInput) {
    loginUser(loginInput: $loginInput) {
      username
      email
      token
      # password
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      username
      email
      token
      # password
    }
  }
`;
