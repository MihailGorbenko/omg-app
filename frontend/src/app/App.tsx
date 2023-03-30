import { Routes, Route, BrowserRouter } from "react-router-dom";
import { NavPanel } from "./components/NavPanel";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { IndexPage as LoginPage } from "./pages/LoginPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";

export default function App() {
  return (
    <BrowserRouter>
    <NavPanel/>
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
