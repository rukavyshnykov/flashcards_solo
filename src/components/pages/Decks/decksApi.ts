import { baseApi } from '@/services/baseApi'

import { DecksArgs, DecksResponse } from './decksTypes'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getDecks: builder.query<DecksResponse, DecksArgs>({
      providesTags: ['Decks'],
      query: body => ({
        method: 'GET',
        params: body,
        url: '/v2/decks',
      }),
    }),
  }),
})

export const { useGetDecksQuery } = decksApi
