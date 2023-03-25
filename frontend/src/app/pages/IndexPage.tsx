import {
  useCheckEmailMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useRegisterMutation,
  useResetPasswordMutation,
  useSetPasswordMutation
} from "../features/authentication/authApi";
import { setAuthData } from "../features/authentication/authSlice";
import { useAppDispatch } from "../store/store";
import { AuthErrorResponse, CheckEmailResponse, LoginResponse, SetPasswordResponse } from "../types/authSliceTypes";

export const IndexPage: React.FC = () => {
  const [login, { isLoading, isError, isSuccess, error }] = useResetPasswordMutation();
  const [
    reset,
    { isLoading: rfrLoad, isError: rfrError, isSuccess: rfrSuccess },
  ] =  useSetPasswordMutation();


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
            email: "gomihagle@gmail.com"
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
          reset({
            password:'mihana1234',
            token: '981f3b79-0f7a-41ab-9051-f3ec76ee753d'
          })
            .unwrap()
            .then((resp) => console.log((resp as SetPasswordResponse).status))
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
