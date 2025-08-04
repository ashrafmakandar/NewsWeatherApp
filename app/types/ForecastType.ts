// types/ForecastType.ts

export interface ForecastMain {
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
}

export interface ForecastWeather {
  main: string;
  description: string;
  icon: string;
}

export interface ForecastItem {
  dt: number; // UNIX timestamp
  main: ForecastMain;
  weather: ForecastWeather[];
  dt_txt: string; // formatted time
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
    timezone: number;
  };
}
