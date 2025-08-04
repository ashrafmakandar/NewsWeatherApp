// services/fetchWeather.ts
import { WeatherType } from "../types/WeatherType";

const fetchWeather = async (lat: number, lon: number): Promise<WeatherType> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9089fd9315eb3fee51fb63e824a69365&units=metric`
  );

  console.log(response)
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }

  const data: WeatherType = await response.json();
  return data;
};

export default fetchWeather;
