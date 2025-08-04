// services/fetchNews.ts

import { NewsResponse } from "../types/NewsType";

import { NEWS_API_KEY } from "../Constants";






const fetchNews = async (keyword: string): Promise<NewsResponse> => {
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&sortBy=publishedAt&pageSize=20&apiKey=${NEWS_API_KEY}`;
console.log("Fetching news from URL:", url);
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  return await response.json();
};

// export default fetchNews;


export default fetchNews;
