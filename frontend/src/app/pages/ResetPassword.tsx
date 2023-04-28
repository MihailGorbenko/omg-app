import { Form, FloatingLabel, Button, Row, Container, Col } from "react-bootstrap"
import styles from '../styles/Form/AuthForm.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router"
import { Formik } from "formik"
import * as yup from 'yup'
import { ToastContainer, toast, Slide } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import useLoader from "../hooks/useLoader"
import useProgress from "../hooks/useProgress"
import { useSetPasswordMutation } from "../features/authentication/authApi"
import { AuthErrorResponse } from "../types/authSliceTypes"

const initialValues = {
    password: '',
    confirm: ''
}

const schema = yup.object().shape({
    password: yup
        .string()
        .trim()
        .required('Password is required!')
        .max(16, 'Can be max 16 chars length!')
        .min(8, 'Must be min 8 chars length!'),
    confirm: yup
        .string()
        .trim()
        .required('Confirm password!')
        .max(16, 'Can be max 16 chars length!')
        .min(8, 'Must be min 8 chars length!')
})


const ResetPassword: React.FC = () => {
    const navigate = useNavigate()
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [toLogin, setToLogin] = useState(false)
    const loader = useLoader()
    const progress = useProgress()
    const params = useParams()
    const [setPassword] = useSetPasswordMutation()
    const location = useLocation()

    function handleFormSubmit(values: typeof initialValues) {
        if (toLogin) {
            navigate('/login', { state: { from: location } })
            return
        }
        loader.on()
        progress.set(15)
        setPassword({ password: values.password, token: params?.token })
            .unwrap()
            .then(res => {
                toast('Success, now you can login!')
                setToLogin(true)
            })
            .catch(err => toast((err as AuthErrorResponse).message))
            .finally(() => {
                loader.off()
                progress.done()
            })

    }

    return (
        <Container>
            <Row className='justify-content-center'>
                <Col md={6} lg={5} xl={4} className="mt-5" >
                    <div className={styles.container}>
                        <h1 className="mb-3">Reset password</h1>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={(values) => handleFormSubmit(values)}
                            validationSchema={schema}>
                            {({ handleBlur,
                                handleChange,
                                handleSubmit,
                                values,
                                touched,
                                errors }) => (
                                <Form noValidate onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <FloatingLabel
                                            controlId="passwordInput"
                                            label="Password"
                                            className={styles.label}>
                                            <Form.Control
                                                type={passwordVisible ? 'text' : 'password'}
                                                placeholder="password"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                isValid={touched.password && !errors.password}
                                                isInvalid={touched.password && !!errors.password} />
                                            <div onClick={() => { setPasswordVisible(!passwordVisible) }}
                                                className={styles['password-icon']}>
                                                {passwordVisible
                                                    ?
                                                    <FontAwesomeIcon icon={["fas", "eye"]} />
                                                    :
                                                    <FontAwesomeIcon icon={["fas", "eye-slash"]} />}
                                            </div>
                                            <Form.Control.Feedback type="invalid">
                                                {errors.password}
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </FloatingLabel>
                                        <FloatingLabel
                                            controlId="confirmPasswordInput"
                                            label="Confirm password"
                                            className={styles.label}>
                                            <Form.Control
                                                type={passwordVisible ? 'text' : 'password'}
                                                placeholder="confirm password"
                                                name="confirm"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.confirm}
                                                isValid={touched.confirm
                                                    && !errors.confirm && (values.confirm === values.password)}
                                                isInvalid={touched.confirm && (!!errors.confirm || (values.confirm !== values.password))}
                                            />
                                            <div onClick={() => { setPasswordVisible(!passwordVisible) }}
                                                className={styles['password-icon']}>
                                                {passwordVisible
                                                    ?
                                                    <FontAwesomeIcon icon={["fas", "eye"]} />
                                                    :
                                                    <FontAwesomeIcon icon={["fas", "eye-slash"]} />}
                                            </div>
                                            <Form.Control.Feedback type="invalid">
                                                {values.confirm !== values.password ? 'Password not match!' : errors.confirm}
                                            </Form.Control.Feedback>
                                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Row style={{ justifyContent: 'end' }}>
                                        <Button
                                            variant="primary"
                                            className={styles.button}
                                            onClick={async () => {
                                                navigate('/')
                                            }}
                                        >
                                            Back
                                        </Button>
                                        <Button variant="primary" type="submit" className={styles.button}>
                                            {toLogin ? 'Login' : 'Reset'}
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
                </Col>
            </Row>
        </Container>

    )
}

export default ResetPassword