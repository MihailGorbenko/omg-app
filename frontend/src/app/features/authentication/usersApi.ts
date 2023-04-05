import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState, useAppDispatch } from "../../store/store";
import { AuthErrorResponse, ErrorRawResponse, User } from "../../types/authSliceTypes";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { setAccessToken, setAuthData } from "./authSlice";


const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token
        headers.set('Authorization', `Bearer ${token}`)
    }
})

const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async (args, api, extraOptions) => {
        let res = await baseQuery(args, api, extraOptions)
        if (res.error && res.error.status === 401) {
            const refreshQuery = fetchBaseQuery({
                baseUrl: process.env.REACT_APP_AUTH_URL,
                method: 'POST',
                credentials: 'include'
            })
            let refreshResp = await refreshQuery('/refreshToken', api, extraOptions)
            if (!refreshResp.error) {
                const data = refreshResp.data
                const accessToken = (data as { accessToken: String }).accessToken.replaceAll('"', '')
                localStorage.setItem('token', accessToken)
                api.dispatch(setAccessToken({ token: accessToken }))
                res = await baseQuery(args, api, extraOptions)
            }
            else {
                api.dispatch(setAuthData({ user: null, token: null }))
                localStorage.setItem('user', '')
                localStorage.setItem('token', '')
            }
        }
        return res
    }

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: baseQueryWithRefresh,
    endpoints: (builder) => ({
        getUser: builder.query<User | AuthErrorResponse, void>({
            query: () => ({
                url: `/api/users/getUser`,
                method: 'GET',
            }),
            transformErrorResponse: (response: ErrorRawResponse, meta, arg) => {
                return {
                    predicate: response.data?.predicate,
                    status: response.status,
                }
            },
            transformResponse: (response: { user: User }, meta, arg) => {
                return response.user
            }
        }),

        registerUser: builder.mutation<String | AuthErrorResponse, { user: User, password: string }>({
            query: (payload) => ({
                url: `/api/users/registerUser`,
                method: 'POST',
                body: payload,
            }),
            transformErrorResponse: (response: ErrorRawResponse, meta, arg) => {
                return {
                    predicate: response.data?.predicate,
                    status: response.status,
                }
            },
        })

    })
})

export const { useRegisterUserMutation, useLazyGetUserQuery } = usersApi