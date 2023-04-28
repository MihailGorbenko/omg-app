import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { AuthErrorResponse } from "../types/authSliceTypes";
import { useLocation, useNavigate } from "react-router";
import { Button, Row } from "react-bootstrap";
import { Form, FloatingLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from 'formik'
import { Slide, toast, ToastContainer } from "react-toastify";
import { useResetPasswordMutation } from "../features/authentication/authApi";
import useLoader from "../hooks/useLoader";
import useProgress from "../hooks/useProgress";
import * as yup from 'yup'
import styles from '../styles/Form/AuthForm.module.css'
import "react-toastify/dist/ReactToastify.css";



const schema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Must be valid email address')
        .required('Email required!'),
    password: yup
        .string()
        .trim()
        .max(16, 'Must be max 16 characters! ')
        .min(8, 'Must be min 8 characters! ')
        .required('Password required!')
})



const LoginForm: React.FC = () => {
    const { login, isLogin } = useLogin();
    const location = useLocation()
    const navigate = useNavigate()
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [toRegister, setToRegister] = useState(false)
    const [resetPassword] = useResetPasswordMutation()
    const loader = useLoader()
    const progress = useProgress()
    const initialValues = {
        email: '',
        password: ''
    }
    initialValues.email = location.state?.email ? location.state.email : ''

    useEffect(() => {
        if (isLogin) navigate('/')
    }, [isLogin])


    function clearErrors() {
        setEmailError(false)
        setPasswordError(false)
    }

    async function handleResetLink(email: string) {
        loader.on()
        progress.set(15)
        await resetPassword({ email })
            .unwrap()
            .then(resp => {
                toast.success((resp as { message: string }).message);
                progress.done()
                loader.off()
            })
            .catch(err => {
                if ((err as AuthErrorResponse).predicate === 'INCORRECT') {
                    toast.error('Incorrect email!');
                }
                progress.off()
                loader.off()
            })
    }

    async function handleFormSubmit(values: typeof initialValues) {
        if (toRegister) {
            navigate('/register', { state: { from: location, email: values.email } })
            return
        }
        clearErrors()
        await login({
            email: values.email,
            password: values.password
        })
            .then(res => { })
            .catch(err => {
                if ((err as AuthErrorResponse).predicate === 'NOT_EXIST') {
                    setEmailError(true)
                    setToRegister(true)
                }
                else if ((err as AuthErrorResponse).predicate === 'INCORRECT') {
                    setEmailError(true)
                }
                else if ((err as AuthErrorResponse).predicate === 'PASS_INCORRECT') {
                    setPasswordError(true)
                }

            })

    }

    return (
        <div className={styles.container}>
            <h1 className="mb-3">Login</h1>
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => handleFormSubmit(values)}
                validationSchema={schema}>
                {
                    ({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        errors
                    }) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <FloatingLabel
                                    controlId="emailInput"
                                    label="Email"
                                    className={styles.label}>
                                    <Form.Control
                                        type="email"
                                        placeholder="name@example.com"
                                        className={styles.input}
                                        name="email"
                                        value={values.email}
                                        onChange={(e) => {
                                            setToRegister(false)
                                            clearErrors()
                                            handleChange(e)
                                        }}
                                        onBlur={handleBlur}
                                        isInvalid={(touched.email && !!errors.email) || emailError}
                                        isValid={touched.email && !errors.email && !emailError} />
                                    <Form.Control.Feedback type="invalid">{
                                        emailError
                                            ? 'User with such email not registred!'
                                            : errors.email
                                    }
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback >Looks good!</Form.Control.Feedback>
                                </FloatingLabel>

                            </Form.Group>
                            <Form.Group className="mb-3">
                                <FloatingLabel
                                    controlId="passwordInput"
                                    label="Password"
                                    className={styles.label}>
                                    <Form.Control
                                        type={passwordVisible ? 'text' : 'password'}
                                        placeholder="password"
                                        name="password"
                                        onChange={(e) => {
                                            clearErrors()
                                            handleChange(e)
                                        }}
                                        onBlur={handleBlur}
                                        isValid={touched.password && !errors.password && !passwordError}
                                        isInvalid={(touched.password && !!errors.password) || passwordError}
                                    />
                                    <div onClick={() => { setPasswordVisible(!passwordVisible) }}
                                        className={styles['password-icon']}>
                                        {passwordVisible
                                            ?
                                            <FontAwesomeIcon icon={["fas", "eye"]} />
                                            :
                                            <FontAwesomeIcon icon={["fas", "eye-slash"]} />}
                                    </div>
                                    <Form.Control.Feedback type="invalid">{
                                        passwordError
                                            ? 'Invalid password!'
                                            : errors.password
                                    }
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback >Looks good!</Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                            <div className={styles['reset-link']}
                                onClick={() => handleResetLink(values.email)}>Forgot password?</div>

                            <Row style={{ justifyContent: 'end' }}>
                                <Button
                                    variant="primary"
                                    className={styles.button}
                                    onClick={async () => {
                                        navigate('/auth', { state: { from: location } })
                                    }}
                                >
                                    Back
                                </Button>
                                <Button variant="primary" type="submit" className={styles.button}>
                                    {!toRegister ? 'Login' : 'Register'}
                                </Button>
                            </Row>
                            <ToastContainer
                                className={styles['toast-container']}
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                transition={Slide}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                            />
                        </Form>
                    )}
            </Formik>
        </div>
    )
}

export default LoginForm