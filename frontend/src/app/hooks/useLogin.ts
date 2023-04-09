import { selectAuth } from "../features/authentication/authSlice";
import { useAppDispatch, useTypedSelector } from "../store/store";
import { setAuthData } from "../features/authentication/authSlice";
import { AuthCredentials, AuthErrorResponse, User } from "../types/authSliceTypes";
import { useLoginMutation } from "../features/authentication/authApi";
import { useLazyGetUserQuery } from "../features/authentication/applicationApi";
import useProgress from "./useProgress";
import useLoader from "./useLoader";


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
    const progress = useProgress()
    const loader = useLoader()


    function login(credentials: AuthCredentials): Promise<Boolean | AuthErrorResponse> {

        return new Promise((resolve, reject) => {
            loader.on()
            if (authState.isLogin) {
                loader.off()
                resolve(true)
            }
            else {
                let accessToken: string 
                progress.set(5)
                tryLogin(credentials)
                    .unwrap()
                    .then(token => {
                        accessToken = token as string
                        dispatch(setAuthData({
                            user: authState.user,
                            token: accessToken 
                        }))
                        progress.set(50)
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
                                    
                                    loader.off()
                                    progress.done()
                                } catch (err: any) {
                                    loader.off()
                                    progress.off()
                                    reject(err)
                                }
                            })
                            .catch((err: AuthErrorResponse) => {
                                loader.off()
                                progress.off()
                                reject(err)
                            })
                    })
                    .catch((err: AuthErrorResponse) => {
                        loader.off()
                        progress.off()
                        reject(err)
                    })
            }

        })

    }

    function logout(): Promise<Boolean | any> {
        return new Promise((resolve, reject) => {
            try {
                loader.on()
                localStorage.setItem('user', '')
                localStorage.setItem('token', '')
                dispatch(setAuthData({ user: null, token: null }))
                loader.off()
                resolve(true)
            }
            catch (e: any) {
                console.log(e)
                loader.off()
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