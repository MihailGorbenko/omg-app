import { FC, useEffect } from "react"
import { useTypedSelector } from "../store/store";
import { selectAuth } from "../features/authentication/authSlice";
import { useLocation, useNavigate } from "react-router-dom";



interface Props {
    children: JSX.Element | null;
}
export const ProtectedRoute: FC<Props> = ({ children }) => {

    const authState = useTypedSelector(selectAuth)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!authState.isLogin) {
            navigate('/auth', {
                replace: true,
                state: { from: location }
            })
        }
    })


    return authState.isLogin ? children : null

}