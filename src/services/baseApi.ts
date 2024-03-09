import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from './baseApiWithReauth'

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  reducerPath: 'baseApi',
  tagTypes: ['User', 'Decks'],
})
