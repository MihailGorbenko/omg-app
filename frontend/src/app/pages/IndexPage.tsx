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
import { useAppDispatch } from "../store/store";
import {
  AuthErrorResponse,
  CheckEmailResponse,
  LoginResponse,
  SetPasswordResponse,
} from "../types/authSliceTypes";

export const IndexPage: React.FC = () => {
  const [login, { isLoading, isError, isSuccess, error }] =
    useAddUserMutation();
  const [
    get,
    { isLoading: rfrLoad, isError: rfrError, isSuccess: rfrSuccess },
  ] = useLazyGetUserQuery();

  const dispatch = useAppDispatch();
  return (
    <div>
      <h1>{isLoading ? "Loading" : ""}</h1>
      <h1>{isError ? `Error ${error}` : ""}</h1>
      <h1>{isSuccess ? "Success" : ""}</h1>
      <h1>{rfrLoad ? "Loading refresh" : ""}</h1>
      <h1>{rfrError ? "Error refresh" : ""}</h1>
      <h1>{rfrSuccess ? "Success refresh" : ""}</h1>

      <button
        onClick={async () => {
          login({
            user: {
              _id: "a3f95db6bd46cb41b4ba87ss",
              name: "miha",
              lastName: " ",
              email: "gomihagle@gmail.com",
              avatar_url: "https://omgapp.pp.ua/api/storage/default.png",
            },
          })
            .unwrap()
            .then((token) => console.log(token))
            .catch((err) => console.log((err as AuthErrorResponse).predicate));
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          get()
            .unwrap()
            .then((resp) => console.log(resp))
            .catch((err: AuthErrorResponse) => {
              console.log(err.predicate);
            });
        }}
      >
        Check Email
      </button>
    </div>
  );
};
