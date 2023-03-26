import { useRegisterMutation } from "../features/authentication/authApi";
import { selectAuth, setLoading } from "../features/authentication/authSlice";
import { useAddUserMutation } from "../features/authentication/usersApi";
import { useAppDispatch, useTypedSelector } from "../store/store";
import { AuthErrorResponse, User } from "../types/authSliceTypes";

export type UseRegiserReturnType = {
    register: (user: User, password: String) => Promise<Boolean | AuthErrorResponse>,
    loading: Boolean
}

export function useRegister(): UseRegiserReturnType {
    const dispatch = useAppDispatch()
    const [tryRegister] = useRegisterMutation()
    const [addUser] = useAddUserMutation()
    const authState = useTypedSelector(selectAuth)


    function register(user: User, password: String): Promise<Boolean | AuthErrorResponse> {
        let userId: string
        return new Promise((resolve, reject) => {
            dispatch(setLoading({ loading: true }))
            tryRegister({ email: user.email, password })
                .unwrap()
                .then(res => {
                    userId = res as string
                    user._id = userId
                    addUser({ user })
                        .unwrap()
                        .then(res => {
                            dispatch(setLoading({ loading: false }))
                            resolve(true)
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
        })
    }

    return {
        register,
        loading: authState.loading
    }

}