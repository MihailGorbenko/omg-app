import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store/store";
import { AuthErrorResponse, ErrorRawResponse, User } from "../../types/authSliceTypes";



export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            headers.set('Authorization', `Bearer ${token}`)
        }
    }),

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
            transformResponse: (response: {user:User}, meta, arg) => {
                return response.user
            }
        }),

        addUser: builder.mutation<String | AuthErrorResponse, {user:User}>({
            query: (user) => ({
                url: `/api/users/addUser`,
                method: 'POST',
                body: user,
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

export const { useAddUserMutation, useLazyGetUserQuery } = usersApi