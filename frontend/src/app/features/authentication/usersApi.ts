import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store/store";
import { AuthErrorResponse, ErrorRawResponse, User } from "../../types/authSliceTypes";



export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            headers.set('Authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmU2NzE4NTk4MGVhMTE4NTZhYjg4YSIsImlhdCI6MTY3OTc4NTAyMiwiZXhwIjoxNjc5Nzg1NjIyfQ.GD1rsnVTO9MNOGce7o-4eZjIUhHFT3YSGft05HaLrpk`)
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