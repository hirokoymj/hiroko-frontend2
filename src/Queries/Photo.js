import { gql } from "@apollo/client";

export const PHOTOS = gql`
  query Photos($location: String!) {
    photos(location: $location) {
      fileName
      location
    }
  }
`;
