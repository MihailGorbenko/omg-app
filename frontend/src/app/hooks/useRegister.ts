import { useRegisterMutation } from "../features/authentication/authApi";
import { selectAuth } from "../features/authentication/authSlice";
import { useAddUserMutation } from "../features/authentication/usersApi";
import { useTypedSelector } from "../store/store";
import { AuthErrorResponse, User } from "../types/authSliceTypes";
import useLoader from "./useLoader";
import useProgress from "./useProgress";

export type UseRegiserReturnType = {
    register: (user: User, password: String) => Promise<Boolean | AuthErrorResponse>,
    loading: Boolean
}

export function useRegister(): UseRegiserReturnType {
    const [tryRegister] = useRegisterMutation()
    const [addUser] = useAddUserMutation()
    const authState = useTypedSelector(selectAuth)
    const loader = useLoader()
    const progress = useProgress()


    function register(user: User, password: String): Promise<Boolean | AuthErrorResponse> {
        let userId: string
        return new Promise((resolve, reject) => {
            loader.on()
            progress.set(5)
            tryRegister({ email: user.email, password })
                .unwrap()
                .then(res => {
                    userId = res as string
                    user._id = userId
                    progress.set(50)
                    addUser({ user })
                        .unwrap()
                        .then(res => {
                            loader.off()
                            progress.done()
                            resolve(true)
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
        })
    }

    return {
        register,
        loading: authState.loading
    }

}