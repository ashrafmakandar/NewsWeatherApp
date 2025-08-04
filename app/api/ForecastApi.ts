import { WEATHER_API_KEY } from '../Constants';
import { ForecastItem, ForecastResponse } from "../types/ForecastType";




const fetchForecast = async (lat: number, lon: number,unit?:string): Promise<ForecastItem[]> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${unit}`
  );
console.log("Fetching forecast from URL:", response.url);
  if (!response.ok) {
    throw new Error("Failed to fetch forecast");
  }

  const data: ForecastResponse = await response.json();

  return data.list.filter((_, index) => index % 8 === 0);
};

export default fetchForecast;
