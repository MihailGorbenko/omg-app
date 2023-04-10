import { useEffect, useState } from "react";
import { useLazyGetUserQuery } from "../features/authentication/applicationApi";
import { setAccessToken } from "../features/authentication/authSlice";
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";
import { useAppDispatch } from "../store/store";
import { AuthErrorResponse } from "../types/authSliceTypes";
import { useNavigate } from "react-router";
import { Loader } from "./Loader";

const LoginForm: React.FC = () => {
    const { login, logout, loading, isLogin } = useLogin();
    let [error, setError] = useState(null);
    let { register } = useRegister();
    const dispatch = useAppDispatch();
    const [getUser] = useLazyGetUserQuery();
    const navigate = useNavigate()

    useEffect(() => {
        if (isLogin) navigate('/')
    }, [isLogin])


    return (
        <div>
            {loading && <Loader />}
            <h1>{isLogin ? `Logged in` : "Logged out"}</h1>
            <h1>{error ? JSON.stringify(error) : ""}</h1>

            <button
                onClick={async () => {
                    setError(null);
                    login({
                        email: "usermiha@test.com",
                        password: "mihana1234",
                    })
                        .then((status) => {
                            console.log(status)
                           
                        })
                        
                }}
            >
                Login
            </button>

            <button
                onClick={async () => {
                    logout()
                        .then((status) => console.log(status))
                        .catch((err) => console.log((err as AuthErrorResponse).predicate));
                }}
            >
                Logout
            </button>

            <button
                onClick={async () => {
                    setError(null);
                    register(
                        {
                            _id: "",
                            name: "miha",
                            lastName: "go",
                            email: `usermiha@test.com`,
                            avatar_url: "/api/storage/default.png",
                            avatar_min_url: "/api/storage/default_min.png"
                        },
                        "mihana1234"
                    )
                        .then((status) => console.log(status))
                        .catch((err) => {
                            setError(err);
                            console.log((err as AuthErrorResponse).predicate);
                        });
                }}
            >
                Register random
            </button>
            <button
                onClick={async () => {
                    dispatch(
                        setAccessToken({
                            token:
                                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZmU2NzE4NTk4MGVhMTE4NTZhYjg4YSIsImlhdCI6MTY3OTI0MDA5MSwiZXhwIjoxNjc5MjQwNjkxfQ.ycs68kmY_jp2IhUZ_1OEmBt4-z_8q31gHPVfYuxeKOs",
                        })
                    );
                    getUser()
                        .unwrap()
                        .then((id) => console.log(id))
                        .catch((err) => console.log(err));
                }}
            >
                expire token
            </button>
        </div>
    )
}

export default LoginForm