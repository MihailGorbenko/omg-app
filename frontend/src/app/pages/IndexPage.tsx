import { useState } from "react";
import {
  useCheckEmailMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useSetPasswordMutation,
} from "../features/authentication/authApi";
import { setAuthData } from "../features/authentication/authSlice";
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
  return (
    <div>
      <h1>{loading ? "Loading" : ""}</h1>
      <h1>{isLogin ? `Logged in` : "Logged out"}</h1>
      <h1>{error ? JSON.stringify(error) : ""}</h1>

      <button
        onClick={async () => {
          setError(null);
          login({
            email: "gomihagle@gmail.com",
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
          setError(null)
          register(
            {
              _id: "",
              name: 'miha',
              lastName: 'go',
              email: `mito@exapmle.com`,
              avatar_url: "https://omgapp.pp.ua/api/storage/default.png",
            },
            "mihana1234"
          )
            .then((status) => console.log(status))
            .catch((err) => {
              setError(err)
              console.log((err as AuthErrorResponse).predicate)
            });
        }}
      >
        Register random
      </button>
    </div>
  );
};
