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

export const CURRENT_WEATHER_BY_CITY = gql`
  query CurrentWeatherByCity($city: String!, $unit: Units) {
    currentWeatherByCity(city: $city, unit: $unit) {
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

export const DAILY_FORECAST = gql`
  query DailyForecast($city: String!, $unit: Units) {
    dailyForecast(city: $city, unit: $unit) {
      id
      city {
        name
        lon
        lat
        country
      }
      forecastList {
        dt
        weather
        icon
        humidity
        temperature {
          day
          min
          max
        }
      }
    }
  }
`;
