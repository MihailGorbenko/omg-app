import { useState } from "react";
import {
  useCheckEmailMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useSetPasswordMutation,
} from "../features/authentication/authApi";
import {
  setAccessToken,
  setAuthData,
} from "../features/authentication/authSlice";
import {
  useAddUserMutation,
  useLazyGetUserQuery,
} from "../features/authentication/usersApi";
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";
import { useAppDispatch } from "../store/store";
import {
  AuthErrorResponse,
  CheckEmailResponse,
  LoginResponse,
  SetPasswordResponse,
} from "../types/authSliceTypes";

export const IndexPage: React.FC = () => {
  const { login, logout, loading, isLogin } = useLogin();
  let [error, setError] = useState(null);
  let { register } = useRegister();
  const dispatch = useAppDispatch();
  const [getUser] = useLazyGetUserQuery();
  return (
    <div>
      <h1>{loading ? "Loading" : ""}</h1>
      <h1>{isLogin ? `Logged in` : "Logged out"}</h1>
      <h1>{error ? JSON.stringify(error) : ""}</h1>

      <button
        onClick={async () => {
          setError(null);
          login({
            email: "gomiha@test.com",
            password: "mihana1234",
          })
            .then((status) => console.log(status))
            .catch((err) => setError(err));
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
              email: `gomiha@test.com`,
              avatar_url: "http://localhost:5000/api/storage/default.png",
              avatar_min_url: "http://localhost:5000/api/storage/default_min.png"
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
  );
};
