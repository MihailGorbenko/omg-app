import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'
import { response } from 'express'
import { url } from 'inspector'
import { ErrorRawResponse, AuthCredentials, AuthErrorResponse, LoginResponse, RegisterResponse, CheckEmailResponse, SetPasswordResponse } from '../../types/authSliceTypes'

const staggeredRetry = retry(fetchBaseQuery({
    baseUrl: process.env.REACT_APP_AUTH_URL,
    credentials: 'include'
}),
    { maxRetries: 5 }
)

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: staggeredRetry,
    endpoints: (builder) => ({
        login: builder.mutation<String | AuthErrorResponse, AuthCredentials>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials
            }),
            transformResponse: (response: LoginResponse, meta, arg) => {

                return response.accessToken.replaceAll('"', '')
            },
            transformErrorResponse: (response: ErrorRawResponse, meta, arg) => {
                return {
                    predicate: response.data?.predicate,
                    status: response.status,
                }
            }
        }),

        refreshToken: builder.mutation<String | AuthErrorResponse, void>({
            query: () => ({
                url: '/refreshToken',
                method: 'POST',
            }),
            transformResponse: (response: LoginResponse, meta, arg) => {
                return response.accessToken
            },
            transformErrorResponse: (response: ErrorRawResponse, meta, arg) => {
                return {
                    predicate: response.data?.predicate,
                    status: response.status,
                }
            }
        }),

        resetPassword: builder.mutation<number | undefined | AuthErrorResponse, { email: String }>({
            query: (credentials) => ({
                url: '/resetPassword',
                method: 'POST',
                body: credentials
            }),
            transformResponse: (response: number | undefined, meta, arg) => {

                return meta?.response?.status

            },
            transformErrorResponse: (response: ErrorRawResponse, meta, arg) => {
                return {
                    predicate: response.data?.predicate,
                    status: response.status,
                }
            }
        }),

        checkEmail: builder.mutation<CheckEmailResponse | AuthErrorResponse, { email: String }>({
            query: (credentials) => ({
                url: '/checkEmail',
                method: 'POST',
                body: credentials

            }),

            transformResponse: (response: { predicate: String, message: String }, meta, arg) => {

                return {
                    status: meta?.response?.status,
                    predicate: response.predicate
                }

            },
            transformErrorResponse: (response: ErrorRawResponse, meta, arg) => {
                return {
                    predicate: response.data?.predicate,
                    status: response.status,
                }
            }

        }),

        setPassword: builder.mutation<SetPasswordResponse | AuthErrorResponse, { password: String, token: String }>({
            query: (payload) => ({
                url: '/setPassword',
                method: 'POST',
                body: payload
            }),

            transformResponse: (response: { message: String }, meta, arg) => {
                return {
                    message: response.message,
                    status: meta?.response?.status,
                }
            },

            transformErrorResponse: (response: ErrorRawResponse, meta, arg) => {
                return {
                    predicate: response.data?.predicate,
                    status: response.status,
                }
            }
        })
    })
})



export const {
    useLoginMutation,
    useRefreshTokenMutation,
    useResetPasswordMutation,
    useCheckEmailMutation,
    useSetPasswordMutation } = authApi