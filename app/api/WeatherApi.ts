// services/fetchWeather.ts
import { WeatherType } from "../types/WeatherType";



import { WEATHER_API_KEY } from "../Constants";

const fetchWeather = async (lat: number, lon: number): Promise<WeatherType> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=`+ WEATHER_API_KEY + `&units=metric`
  );

 
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data: WeatherType = await response.json();
  return data;
};

export default fetchWeather;
