import { ForecastItem, ForecastResponse } from "../types/ForecastType";



const fetchForecast = async (lat: number, lon: number): Promise<ForecastItem[]> => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=9089fd9315eb3fee51fb63e824a69365&units=metric`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch forecast");
  }

  const data: ForecastResponse = await response.json();

  return data.list.filter((_, index) => index % 8 === 0);
};

export default fetchForecast;
