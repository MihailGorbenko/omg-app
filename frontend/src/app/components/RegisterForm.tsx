import { Form, FloatingLabel, Button, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router"
import { Formik } from "formik"
import * as yup from 'yup'
import styles from '../styles/Form/AuthForm.module.css'
import { useCheckEmailMutation } from "../features/authentication/authApi"
import useProgress from "../hooks/useProgress"
import useLoader from "../hooks/useLoader"
import { AuthErrorResponse, CheckEmailResponse } from "../types/authSliceTypes"
import { useRegister } from "../hooks/useRegister"
import { Slide, ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";





const schema = yup.object().shape({
    email: yup
        .string()
        .trim()
        .matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Must be valid email address')
        .required('Email is required!'),
    name: yup
        .string()
        .trim()
        .required('Name is required!')
        .max(12, 'Can be max 12 chars length!')
        .min(2, 'Must be min 2 chars length!'),
    lastname: yup
        .string()
        .trim()
        .required('Last Name is required!')
        .max(12, 'Can be max 12 chars length!')
        .min(2, 'Must be min 2 chars length!'),
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
        .min(8, 'Must be min 8 chars length!'),
})

const RegisterForm: React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [emailInUse, setEmailInUse] = useState(false)
    const [check] = useCheckEmailMutation()
    const progress = useProgress()
    const loader = useLoader()
    const { register } = useRegister()
    const [toLogin, setToLogin] = useState(false)

    const initialValues = {
        email: '',
        name: '',
        lastname: '',
        password: '',
        confirm: ''
    }

    initialValues.email = location.state?.email ? location.state.email : ''

    function handleFormSubmit(values: typeof initialValues) {
        setEmailError(false)
        setEmailInUse(false)
        if (toLogin) {
            navigate('/login', { state: { from: location, email: values.email } })
            return
        }
        loader.on()
        progress.set(15)
        check({ email: values.email })
            .unwrap()
            .then(async res => {
                console.log(res)

                if ((res as CheckEmailResponse).predicate === 'EXIST') {
                    setEmailInUse(true)
                }
                else if ((res as CheckEmailResponse).predicate === 'INCORRECT') {
                    setEmailError(true)
                }
            })
            .catch(async (err) => {
                await register({
                    _id: '',
                    email: values.email,
                    name: values.name,
                    lastName: values.lastname,
                    avatar_url: 'https://omgapp.pp.ua/api/storage/default.png',
                    avatar_min_url: 'https://omgapp.pp.ua/api/storage/default_min.png'
                },
                    values.password)
                    .then(res => {
                        toast.success('Registration successfull,now you can login!')
                        setToLogin(true)
                    })
                    .catch(err => toast.error(`Someting went wrong: ${(err as AuthErrorResponse).message}`))
            })
            .finally(() => {
                loader.off()
                progress.done()
            })
    }


    return (

        <div className={styles.container}>
            <h1 className="mb-3">Register</h1>
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
                                controlId="emailInput"
                                label="Email"
                                className={styles.label}>
                                <Form.Control
                                    type="email"
                                    placeholder="name@example.com"
                                    className={styles.input}
                                    name="email"
                                    value={values.email}
                                    onBlur={e => {
                                        setEmailError(false)
                                        setEmailInUse(false)
                                        handleBlur(e)
                                    }}
                                    onChange={handleChange}
                                    isValid={touched.email && !errors.email && !emailError && !emailInUse}
                                    isInvalid={(touched.email && !!errors.email) || emailError || emailInUse} />
                                <Form.Control.Feedback type="invalid">
                                    {emailError ? 'Invalid email' : emailInUse ? 'Email already in use!' : errors.email}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="nameInput"
                                label="Name"
                                className={styles.label}>
                                <Form.Control
                                    type="text"
                                    placeholder="name"
                                    className={styles.input}
                                    name="name"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                    isValid={touched.name && !errors.name}
                                    isInvalid={touched.name && !!errors.name} />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="lastNameInput"
                                label="Last Name"
                                className={styles.label}>
                                <Form.Control
                                    type="text"
                                    placeholder="lastname"
                                    className={styles.input}
                                    name="lastname"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.lastname}
                                    isValid={touched.lastname && !errors.lastname}
                                    isInvalid={touched.lastname && !!errors.lastname} />
                                <Form.Control.Feedback type='invalid'>
                                    {errors.lastname}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </FloatingLabel>
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
                                <Form.Control.Feedback type='invalid'>
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
                                    isInvalid={touched.confirm && (!!errors.confirm || (values.confirm !== values.password))} />
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
                                    navigate('/auth', { state: { from: location } })
                                }}
                            >
                                Back
                            </Button>
                            <Button variant="primary" type="submit" className={styles.button}>
                                {toLogin ? 'Login' : 'Register'}
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

export default RegisterForm