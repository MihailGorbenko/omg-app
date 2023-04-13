import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { AuthState, User } from "../../types/authSliceTypes";

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')

const initialState: AuthState = {
    user: user ? JSON.parse(user) : user,
    token: token,
    isLogin: (user && token) ? true : false,
    loading: false,
    progress: 0
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthData: (state, { payload: { user, token } }
            : PayloadAction<{ user: User | null, token: String | null }>) => {
            state.user = user
            state.token = token
            state.isLogin = (user && token) ? true : false
        },
        setLoading: (state, { payload: { loading } }: PayloadAction<{ loading: boolean }>) => {
            state.loading = loading
        },
        setAccessToken: (state, { payload: { token } }: PayloadAction<{ token: string }>) => {
            state.token = token
        },
        setProgress: (state, { payload: { progress } }: PayloadAction<{ progress: number }>) => {
            state.progress = progress
        }

    }
})

export const { setAuthData, setLoading, setAccessToken, setProgress } = authSlice.actions
export default authSlice.reducer

export const selectAuth = (state: RootState) => state.auth
