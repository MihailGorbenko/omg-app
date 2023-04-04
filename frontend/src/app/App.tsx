import { Routes, Route, BrowserRouter } from "react-router-dom";
import { NavPanel } from "./components/NavPanel";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { IndexPage as LoginPage } from "./pages/LoginPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import { ProgressBar } from "./components/ProgressBar";
import { useTypedSelector } from "./store/store";
import { selectAuth } from "./features/authentication/authSlice";
import useProgress from "./hooks/useProgress";


export default function App() {
  const authState = useTypedSelector(selectAuth)


  return (
    <BrowserRouter>
      <NavPanel />
      {(authState.progress > 0 && authState.progress < 100)
       && <ProgressBar progress={authState.progress} />}
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route path="/resetPassword/:token" element={<ResetPasswordPage />} />
      </Routes>
    </BrowserRouter>
  );
}
