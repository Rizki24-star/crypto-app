import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewsResponse } from "../types/news";

type newsQueryParams = {
  count: number;
  category: string;
};

const newsHeaders = {
  "x-rapidapi-key": "c3c8ae2c7cmshb915ffece895d17p1f5d21jsnee29b391796f",
  "x-rapidapi-host": "news-api14.p.rapidapi.com",
};

const baseUrl = "https://news-api14.p.rapidapi.com";

const createRequest = (url: string) => ({
  url,
  headers: newsHeaders,
});

const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getNews: builder.query<NewsResponse, newsQueryParams>({
      query: ({ category }) =>
        createRequest(`/v2/search/articles?query=${category}&language=en`),
    }),
  }),
});

export { newsApi };
