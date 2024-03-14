import { baseApi } from '@/services/baseApi'

import { DecksArgs, DecksResponse, MinMax } from './decksTypes'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDecks: builder.query<DecksResponse, DecksArgs>({
      providesTags: ['Decks'],
      query: params => ({
        params,
        url: '/v2/decks',
      }),
    }),
    getDecksMinMax: builder.query<MinMax, void>({
      providesTags: ['Decks'],
      query: () => ({
        url: '/v2/decks/min-max-cards',
      }),
    }),
  }),
})

export const { useGetDecksMinMaxQuery, useGetDecksQuery } = decksApi
