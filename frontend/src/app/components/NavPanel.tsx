import { Navbar, Container, Nav, Button, Image } from "react-bootstrap";

import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import styles from "../styles/NavPanel/NavPanel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import "../styles/NavPanel/NavPanel_override.css";
import { NavLink } from "react-router-dom";
import { useTypedSelector } from "../store/store";
import { selectAuth } from "../features/authentication/authSlice";

export const NavPanel: React.FC = () => {
  const { isLogin, logout } = useLogin();
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const authUser = useTypedSelector(selectAuth)

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <Navbar
      expand="md"
      variant="dark"
      className={styles["nav-panel"]}
      collapseOnSelect
    >
      <Container fluid>
        <Navbar.Brand className={styles["nav-logo"]}>
          <Link to="/home" className="nav-link">
            <FontAwesomeIcon icon={["fas", "user-astronaut"]} size="xl" />
            <sup>mg</sup>
          </Link>
        </Navbar.Brand>
        {isLogin && <Image
          roundedCircle
          src={authUser.user ? authUser.user.avatar_min_url.toString() : " "}
          className={classNames(
            styles['user-avatar-min'],
            "me-1 me-md-3")} />
        }
        <Navbar.Toggle className="x" aria-controls="basic-navbar-nav">
          <div className="icon-bar"></div>
          <div className="icon-bar"></div>
          <div className="icon-bar"></div>
        </Navbar.Toggle>

        <Navbar.Collapse
          id="basic-navbar-nav"
          className={styles["action-block"]}
        >
          <Nav className={classNames(styles["nav-block"], "me-0 me-md-2")}>
            {isLogin ? (
              <Button
                className={classNames(
                  "nav-link",
                  styles["login-out-button"],
                  "order-1",
                  "order-md-0",
                  "mt-2 mt-md-0"
                )}
                variant="outline-success"
                onClick={() => handleLogout()}
              >
                Logout
                <FontAwesomeIcon
                  icon={["fas", "person-walking-luggage"]}
                  size="sm"
                  className={styles["logout-logo"]}
                />
              </Button>
            ) : (
              <Button
                className={classNames(
                  styles["login-out-button"],
                  "order-1",
                  "order-md-0",
                  "mt-2 mt-md-0"
                )}
                variant="outline-success"
              >
                <NavLink to="/login" className={styles["no-link"]}>
                  Login
                  <FontAwesomeIcon
                    icon={["fas", "rocket"]}
                    size="sm"
                    className={styles["logout-logo"]}
                  />
                </NavLink>
              </Button>
            )}
            <NavLink
              to="/home"
              className={classNames(
                "nav-link",
                styles["nav-active-border"],
                path === "/home" ? "active" : ""
              )}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={classNames(
                "nav-link",
                styles["nav-active-border"],
                path === "/about" ? "active" : ""
              )}
            >
              About
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
