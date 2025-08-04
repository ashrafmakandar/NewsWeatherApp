// services/fetchNews.ts

import { NewsResponse } from "../types/NewsType";

const API_KEY = "YOUR_NEWS_API_KEY";

// const fetchNews = async (): Promise<NewsResponse> => {
//   const res = await fetch(
//     `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=6dcde76bbe634f12b72e0156a794e14b`
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch news");
//   }

//   const data: NewsResponse = await res.json();
//   return data;
// };



const fetchNews = async (keyword: string): Promise<NewsResponse> => {
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&sortBy=publishedAt&pageSize=20&apiKey=6dcde76bbe634f12b72e0156a794e14b`;
console.log("Fetching news from URL:", url);
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return await response.json();
};

// export default fetchNews;


export default fetchNews;
