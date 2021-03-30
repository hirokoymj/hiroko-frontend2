import { gql } from "@apollo/client";

export const SINGLE_UPLOAD = gql`
  mutation SingleUpload($file: Upload!, $location: String!) {
    singleUpload(file: $file, location: $location) {
      url
    }
  }
`;
