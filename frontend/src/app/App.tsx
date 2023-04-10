import { Routes, Route, BrowserRouter, Outlet, useNavigate } from "react-router-dom";
import { NavPanel } from "./components/NavPanel";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ProgressBar } from "./components/ProgressBar";
import { useTypedSelector } from "./store/store";
import { selectAuth } from "./features/authentication/authSlice";
import useProgress from "./hooks/useProgress";
import { useEffect } from "react";


export default function App() {
  const authState = useTypedSelector(selectAuth)
  const navigate = useNavigate()


  return (
    <>
      <NavPanel />
      {(authState.progress > 0 && authState.progress < 100)
        && <ProgressBar progress={authState.progress} />}
      <Outlet />
    </>

  )
}
