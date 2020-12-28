import gql from "graphql-tag";

// export const WeatherFragments = {
//   temperatureInfo: gql`
//     fragment TemperatureInfo on Temperature {
//       day
//       min
//       max
//     }
//   `,
// };

export const WeatherFragments = {
  temperature: gql`
    fragment temperature on Temperature {
      day
      min
      max
    }
  `,
  cityInfo: gql`
    fragment cityInfo on CityInfo {
      name
      country
      lat
      lon
    }
  `,
};
