import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { AuthData, User } from "../../types/authSliceTypes";

const user = localStorage.getItem('user')

const initialState: AuthData = {
    user: user ? JSON.parse(user) : user,
    token: localStorage.getItem('token'),
    isLogin: user ? true : false
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthData: (state, { payload: { user, token } }: PayloadAction<{ user: User, token: String }>) => {
            state.user = user
            state.token = token
            state.isLogin = user ? true : false
        }
    }
})

export const { setAuthData } = authSlice.actions
export default authSlice.reducer

export const selectUser = (state: RootState) => state.auth.user
export const selectToken = (state: RootState) => state.auth.token
export const selectIsLogin = (state: RootState) => state.auth.isLogin