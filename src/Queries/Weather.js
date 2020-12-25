import gql from "graphql-tag";

export const CURRENT_WEATHER = gql`
  query CurrentWeather($lat: String!, $lon: String!, $unit: String) {
    currentWeather(lat: $lat, lon: $lon, unit: $unit) {
      id
      cityName
      country
      weather
      icon
      temperature
      min
      max
      humidity
    }
  }
`;
