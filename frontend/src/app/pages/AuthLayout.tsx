
import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export const AuthLayout: React.FC = () => {
  return (
    <>
      <h1>Auth  Layout</h1>
      <Link to='/auth/login'>Login</Link>
      <Link to='/auth/register'>Register</Link>
      <Outlet />
    </>

  );
};
