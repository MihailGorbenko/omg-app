import { selectAuth } from "../features/authentication/authSlice";
import { useAppDispatch, useTypedSelector } from "../store/store";
import { setAuthData, setLoading } from "../features/authentication/authSlice";
import { AuthCredentials, AuthErrorResponse, User } from "../types/authSliceTypes";
import { useLoginMutation } from "../features/authentication/authApi";
import { useLazyGetUserQuery } from "../features/authentication/usersApi";


export type UseLoginReturnType = {
    login: (c: AuthCredentials) => Promise<Boolean | AuthErrorResponse>
    logout: () => Promise<Boolean>
    isLogin: boolean,
    loading: boolean

}

export function useLogin(): UseLoginReturnType {
    const dispatch = useAppDispatch()
    const authState = useTypedSelector(selectAuth)
    const [tryLogin] = useLoginMutation()
    const [getUser] = useLazyGetUserQuery()


    function login(credentials: AuthCredentials): Promise<Boolean | AuthErrorResponse> {

        return new Promise((resolve, reject) => {
            dispatch(setLoading({ loading: true }))
            if (authState.isLogin) {
                dispatch(setLoading({ loading: false }))
                resolve(true)
            }
            else {
                let accessToken: string 
                tryLogin(credentials)
                    .unwrap()
                    .then(token => {
                        accessToken = token as string
                        dispatch(setAuthData({
                            user: authState.user,
                            token: accessToken 
                        }))
                        getUser()
                            .unwrap()
                            .then((resp) => {
                                try {
                                    const res = resp as User
                                    localStorage.setItem('user', JSON.stringify(res))
                                    localStorage.setItem('token', accessToken.toString())
                                    dispatch(setAuthData({
                                        user: res,
                                        token: accessToken
                                    }))
                                    
                                    dispatch(setLoading({ loading: false }))
                                } catch (err: any) {
                                    dispatch(setLoading({ loading: false }))
                                    reject(err)
                                }
                            })
                            .catch((err: AuthErrorResponse) => {
                                dispatch(setLoading({ loading: false }))
                                reject(err)
                            })
                    })
                    .catch((err: AuthErrorResponse) => {
                        dispatch(setLoading({ loading: false }))
                        reject(err)
                    })
            }

        })

    }

    function logout(): Promise<Boolean | any> {
        return new Promise((resolve, reject) => {
            try {
                dispatch(setLoading({ loading: true }))
                localStorage.setItem('user', '')
                localStorage.setItem('token', '')
                dispatch(setAuthData({ user: null, token: null }))
                dispatch(setLoading({ loading: false }))
                resolve(true)
            }
            catch (e: any) {
                console.log(e)
                dispatch(setLoading({ loading: false }))
                reject(e)
            }

        })
    }

    return {
        login,
        logout,
        isLogin: authState.isLogin,
        loading: authState.loading
    }

}