import { ITemperature, Units } from "Types/api/DailyForcast";

export interface ICurrentWeather {
  id: number;
  cityInfo: ICityInfo;
  weather: IWeather;
}

export interface ICurrentWeatherByCityVars {
  city: string;
  unit?: Units;
}

interface IWeather {
  dt: number;
  condition: string;
  description: string;
  feelsLike: string;
  icon: string;
  temperature: ITemperature;
  humidity: number;
}

interface ICityInfo {
  name: string;
  country: string;
  lon: string;
  lat: string;
}
