import { baseApi } from '@/services/baseApi'

import {
  Card,
  CardArgs,
  CardsResponse,
  CreateDeckArgs,
  Deck,
  DecksArgs,
  DecksResponse,
  MinMax,
} from './decksTypes'

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
    createCard: builder.mutation<Card, CardArgs>({
      invalidatesTags: ['Cards'],
      query: body => {
        const formData = new FormData()

        body.questionImg !== null && formData.append('questionImg', body.questionImg)
        body.answerImg !== null && formData.append('answerImg', body.answerImg)
        formData.append('question', body.question)
        formData.append('answer', body.answer)

        return {
          body: formData,
          method: 'POST',
          url: `/v1/decks/${body.id}/cards`,
        }
      },
    }),
    deleteCard: builder.mutation<void, { id: string }>({
      invalidatesTags: ['Cards'],
      query: ({ id }) => ({
        method: 'DELETE',
        url: `/v1/cards/${id}`,
      }),
    }),
    deleteDeck: builder.mutation<Deck, { id: string }>({
      invalidatesTags: ['Decks'],
      query: body => ({
        method: 'DELETE',
        url: `/v1/decks/${body.id}`,
      }),
    }),
    getCards: builder.query<CardsResponse, { id: string }>({
      providesTags: ['Cards'],
      query: ({ id }) => ({
        url: `/v1/decks/${id}/cards`,
      }),
    }),
    getDeck: builder.query<Deck, { id: string }>({
      providesTags: arg => [{ id: arg!.id, type: 'Deck' }],
      query: ({ id }) => ({
        url: `/v1/decks/${id}`,
      }),
    }),
    getDecks: builder.query<DecksResponse, DecksArgs>({
      providesTags: result =>
        result
          ? [...result.items.map(({ id }) => ({ id, type: 'Deck' as const })), 'Decks']
          : ['Decks'],
      query: params => {
        const refined = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]: any[]) =>
              !(
                value === undefined ||
                value === null ||
                (typeof value === 'string' && !value.length)
              )
          )
        )

        return {
          params: refined,
          url: '/v2/decks',
        }
      },
    }),
    getDecksMinMax: builder.query<MinMax, void>({
      query: () => ({
        url: '/v2/decks/min-max-cards',
      }),
    }),
    patchDeck: builder.mutation<Deck, CreateDeckArgs & { id: string }>({
      invalidatesTags: ['Decks'],
      query: body => {
        const formData = new FormData()

        body.cover && formData.append('cover', body.cover)
        formData.append('name', body.name)
        formData.append('isPrivate', String(body.isPrivate))

        return {
          body: formData,
          method: 'PATCH',
          url: `/v1/decks/${body.id}`,
        }
      },
    }),
  }),
})

export const {
  useAddDeckMutation,
  useCreateCardMutation,
  useDeleteCardMutation,
  useDeleteDeckMutation,
  useGetCardsQuery,
  useGetDeckQuery,
  useGetDecksMinMaxQuery,
  useGetDecksQuery,
  usePatchDeckMutation,
} = decksApi
