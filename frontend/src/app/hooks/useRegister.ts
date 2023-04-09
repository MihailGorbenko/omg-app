import { selectAuth } from "../features/authentication/authSlice";
import { useRegisterUserMutation } from "../features/authentication/applicationApi";
import { useTypedSelector } from "../store/store";
import { AuthErrorResponse, User } from "../types/authSliceTypes";
import useLoader from "./useLoader";
import useProgress from "./useProgress";

export type UseRegiserReturnType = {
    register: (user: User, password: string) => Promise<Boolean | AuthErrorResponse>,
    loading: Boolean
}

export function useRegister(): UseRegiserReturnType {
    const [registerUser] = useRegisterUserMutation()
    const authState = useTypedSelector(selectAuth)
    const loader = useLoader()
    const progress = useProgress()


    function register(user: User, password: string): Promise<Boolean | AuthErrorResponse> {

        return new Promise((resolve, reject) => {
            loader.on()
            progress.set(15)
            registerUser({ user, password })
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
    }

    return {
        register,
        loading: authState.loading
    }

}