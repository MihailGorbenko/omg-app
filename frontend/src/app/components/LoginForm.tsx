import { useEffect, useState } from "react";
import { useLazyGetUserQuery } from "../features/authentication/applicationApi";
import { setAccessToken } from "../features/authentication/authSlice";
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";
import { useAppDispatch } from "../store/store";
import { AuthErrorResponse } from "../types/authSliceTypes";
import { useLocation, useNavigate } from "react-router";
import { Loader } from "./Loader";
import styles from '../styles/LoginForm/LoginForm.module.css'
import { Button, Row } from "react-bootstrap";
import { Form, FloatingLabel, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const LoginForm: React.FC = () => {
    const { login, logout, loading, isLogin } = useLogin();
    const location = useLocation()
    const navigate = useNavigate()
    const [passwordVisible, setPasswordVisible] = useState(false)

    useEffect(() => {
        if (isLogin) navigate('/')
    }, [isLogin])


    return (

        <div className={styles.container}>
            <Form>
                <Form.Group className="mb-3">
                    <FloatingLabel
                        controlId="emailInput"
                        label="Email"
                        className="mb-3"
                        style={{ color: 'gray', }}
                    >
                        <Form.Control type="email" placeholder="name@example.com" className={styles.input} />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <FloatingLabel
                        controlId="passwordInput"
                        label="Password"
                        className="mb-3"
                        style={{ color: 'gray', }}>
                        <Form.Control
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="password"
                            />
                        <div onClick={() => { setPasswordVisible(!passwordVisible) }}
                            className={styles['password-icon']}>
                            {passwordVisible
                                ?
                                <FontAwesomeIcon icon={["fas", "eye"]}  />
                                :
                                <FontAwesomeIcon icon={["fas", "eye-slash"]}  />}
                        </div>
                    </FloatingLabel>
                </Form.Group>
                <Row style={{ justifyContent: 'end' }}>
                    <Button 
                    variant="primary" 
                    className={styles.button}
                    onClick={async () => {
                        navigate('/auth', { state: { from:location  } })
                    }}
                    >
                        Back
                    </Button>
                    <Button variant="primary" type="submit" className={styles.button}>
                        Login
                    </Button>
                </Row>

            </Form>

        </div>
    )
}

export default LoginForm