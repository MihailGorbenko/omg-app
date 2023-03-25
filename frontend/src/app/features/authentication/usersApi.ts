import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store/store";
import { User } from "../../types/authSliceTypes";



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
        getUser: builder.query<User, void>({
            query: () => ({
                url: `/api/users/getUser`,
                method: 'GET',
            }),
        }),

        addUser: builder.mutation<String, {user:User}>({
            query: (user) => ({
                url: `/api/users/addUser`,
                method: 'POST',
                body: user,
                headers: {Authorization: ''}
            })
        })

    })
})

export const { useAddUserMutation, useLazyGetUserQuery, useGetUserQuery } = usersApi