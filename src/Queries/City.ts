import gql from "graphql-tag";

export const CITIES = gql`
  query Cities($city: String!) {
    cities(city: $city) {
      id
      name
      country
      coord {
        lon
        lat
      }
    }
  }
`;
