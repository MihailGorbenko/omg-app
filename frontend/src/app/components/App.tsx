import { Outlet } from "react-router-dom";
import { NavPanel } from "./NavPanel";
import { ProgressBar } from "./ProgressBar";
import { useTypedSelector } from "../store/store";
import { selectAuth } from "../features/authentication/authSlice";
import '../styles/App.css'
import { GlobalLoader } from "./GlobalLoader";


export default function App() {
  const authState = useTypedSelector(selectAuth)

  return (
    < >
      <NavPanel />
      {(authState.progress > 0 && authState.progress < 100)
        && <ProgressBar progress={authState.progress} />}
      {authState.loading && <GlobalLoader />}
      <Outlet />
    </>

  )
}
