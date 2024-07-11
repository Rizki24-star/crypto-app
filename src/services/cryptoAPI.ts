import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CoinHistory, CryptoDetails, CryptoResponse } from "../types/crypto";

const cryptoApiHeaders = {
  "x-rapidapi-key": "c3c8ae2c7cmshb915ffece895d17p1f5d21jsnee29b391796f",
  "x-rapidapi-host": "coinranking1.p.rapidapi.com",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createRequest = (url: string) => ({
  url,
  headers: cryptoApiHeaders,
});

const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query<CryptoResponse, number>({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: builder.query<{ data: { coin: CryptoDetails } }, string>({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: builder.query<
      { data: CoinHistory },
      { coinId: string; timePeriod: string }
    >({
      query: ({ coinId, timePeriod }) =>
        createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
    }),
  }),
});

export { cryptoApi };
