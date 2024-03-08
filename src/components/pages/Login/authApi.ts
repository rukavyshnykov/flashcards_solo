import { LoginFormValues } from '@/components/forms/Auth'
import { baseApi } from '@/services/baseApi'

import { User } from './authTypes'

const authApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getMe: builder.query<User, void>({
      providesTags: ['User'],
      query: () => ({
        method: 'GET',
        url: '/v1/auth/me',
      }),
    }),
    login: builder.mutation<void, LoginFormValues>({
      invalidatesTags: ['User'],
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/login',
      }),
    }),
    logout: builder.mutation<void, void>({
      invalidatesTags: ['User'],
      query: () => ({
        method: 'POST',
        url: '/v1/auth/logout',
      }),
    }),
  }),
})

export const { useGetMeQuery, useLoginMutation, useLogoutMutation } = authApi
