export interface IDailyForecast {
  id: string;
  cityInfo: string;
  forecastList: [IForecast];
}
export interface IDailyForcastVars {
  city: string;
  unit?: Units;
}
export enum Units {
  metric = "metric",
  imperial = "imperial",
}
export interface IForecast {
  dt: number;
  condition: string;
  icon: string;
  temperature: ITemperature;
  humidity: number;
  wind: number;
  rain: number;
  sunrise: number;
  sunset: number;
}

export interface ITemperature {
  day: number;
  min: number;
  max: number;
}

export interface ICity {
  id: number;
  name: string;
  country: string;
  coord: ICoord;
}

export interface ICoord {
  lon: number;
  lat: number;
}

export interface ICitiesVars {
  city: string;
}
