import { LoginFormValues } from '@/components/forms/Auth'
import { baseApi } from '@/services/baseApi'

import { RegisterArgs, User } from './authTypes'

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
    register: builder.mutation<User, RegisterArgs>({
      invalidatesTags: ['User'],
      query: body => ({
        body,
        method: 'POST',
        url: '/v1/auth/sign-up',
      }),
    }),
    setMe: builder.mutation<User, { avatar?: File | null; name?: string }>({
      invalidatesTags: ['User'],
      query: body => {
        const formData = new FormData()

        body.avatar && formData.append('avatar', body.avatar)

        body.name && formData.append('name', body.name)

        return {
          body: formData,
          method: 'PATCH',
          url: '/v1/auth/me',
        }
      },
    }),
  }),
})

export const {
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useSetMeMutation,
} = authApi
