import { baseApi } from '@/services/baseApi'

import { CreateDeckArgs, Deck, DecksArgs, DecksResponse, MinMax } from './decksTypes'

const decksApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addDeck: builder.mutation<Deck, CreateDeckArgs>({
      invalidatesTags: ['Decks'],
      query: body => {
        const formData = new FormData()

        body.cover && formData.append('cover', body.cover)
        formData.append('name', body.name)
        formData.append('isPrivate', String(body.isPrivate))

        return {
          body: formData,
          method: 'POST',
          url: '/v1/decks',
        }
      },
    }),
    deleteDeck: builder.mutation<Deck, { id: string }>({
      invalidatesTags: ['Decks'],
      query: body => ({
        method: 'DELETE',
        url: `/v1/decks/${body.id}`,
      }),
    }),
    getCards: builder.query<any, { id: string }>({
      // providesTags: ['Deck'],
      query: ({ id }) => ({
        url: `/v1/decks/${id}/cards`,
      }),
    }),
    getDeck: builder.query<any, { id: string }>({
      providesTags: arg => [{ id: arg.id, type: 'Deck' }],
      query: ({ id }) => ({
        url: `/v1/decks/${id}`,
      }),
    }),
    getDecks: builder.query<DecksResponse, DecksArgs | undefined>({
      providesTags: result =>
        result
          ? [...result.items.map(({ id }) => ({ id, type: 'Deck' as const })), 'Decks']
          : ['Decks'],
      query: params => ({
        params,
        url: '/v2/decks',
      }),
    }),
    getDecksMinMax: builder.query<MinMax, void>({
      // providesTags: ['Decks'],
      query: () => ({
        url: '/v2/decks/min-max-cards',
      }),
    }),
  }),
})

export const {
  useAddDeckMutation,
  useDeleteDeckMutation,
  useGetCardsQuery,
  useGetDeckQuery,
  useGetDecksMinMaxQuery,
  useGetDecksQuery,
} = decksApi
