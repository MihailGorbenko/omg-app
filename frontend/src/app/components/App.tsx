import { Outlet, useNavigate } from "react-router-dom";
import { NavPanel } from "./NavPanel";
import { ProgressBar } from "./ProgressBar";
import { useTypedSelector } from "../store/store";
import { selectAuth } from "../features/authentication/authSlice";
import '../styles/App.css'


export default function App() {
  const authState = useTypedSelector(selectAuth)
  const navigate = useNavigate()


  return (
    < >
      <NavPanel />
      {(authState.progress > 0 && authState.progress < 100)
        && <ProgressBar progress={authState.progress} />}
      <Outlet />
    </>

  )
}
