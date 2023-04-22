import { useEffect, useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";
import { useAppDispatch } from "../store/store";
import { AuthErrorResponse } from "../types/authSliceTypes";
import { useLocation, useNavigate } from "react-router";
import styles from '../styles/Form/AuthForm.module.css'
import { Button, Row } from "react-bootstrap";
import { Form, FloatingLabel } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Formik } from 'formik'
import * as yup from 'yup'
import { useResetPasswordMutation } from "../features/authentication/authApi";
import useLoader from "../hooks/useLoader";
import useProgress from "../hooks/useProgress";


const schema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email address!')
        .required('Email required!'),
    password: yup
        .string()
        .trim()
        .max(16, 'Must be max 16 characters! ')
        .min(8, 'Must be min 8 characters! ')
        .required('Password required!')
})

const initialValues = {
    email: '',
    password: ''
}



const LoginForm: React.FC = () => {
    const { login, isLogin } = useLogin();
    const location = useLocation()
    const navigate = useNavigate()
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [resetPassword] = useResetPasswordMutation()
    const loader = useLoader()
    const progress = useProgress()

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
                //show success toast
                console.log(resp)
                progress.done()
                loader.off()
            })
            .catch(err => {
                //show error toast
                console.log(err)
                progress.off()
                loader.off()
            })
    }

    async function handleFormSubmit(values: typeof initialValues) {
        clearErrors()
        await login({
            email: values.email,
            password: values.password
        })
            .then(res => { })
            .catch(err => {
                if ((err as AuthErrorResponse).predicate === 'NOT_EXIST') {
                    setEmailError(true)
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
                                    Login
                                </Button>
                            </Row>
                        </Form>
                    )}
            </Formik>
        </div>
    )
}

export default LoginForm