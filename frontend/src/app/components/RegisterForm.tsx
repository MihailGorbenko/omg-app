import { Form,FloatingLabel, Button, Row } from "react-bootstrap"

import styles from '../styles/Form/AuthForm.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router"


const RegisterForm:React.FC = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [passwordVisible, setPasswordVisible] = useState(false)

    return (
        
        <div className={styles.container}>
            <h1 className="mb-3">Register</h1>
            <Form>
                <Form.Group className="mb-3">
                    <FloatingLabel
                        controlId="emailInput"
                        label="Email"
                        className={styles.label}>
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            className={styles.input}
                            name="email" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="nameInput"
                        label="Name"
                        className={styles.label}>
                        <Form.Control
                            type="text"
                            placeholder="name"
                            className={styles.input}
                            name="name" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="lastNameInput"
                        label="Last Name"
                        className={styles.label}>
                        <Form.Control
                            type="text"
                            placeholder="lastname"
                            className={styles.input}
                            name="lastname" />
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="passwordInput"
                        label="Password"
                        className={styles.label}>
                        <Form.Control
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="password"
                            name="password"/>
                        <div onClick={() => { setPasswordVisible(!passwordVisible) }}
                            className={styles['password-icon']}>
                            {passwordVisible
                                ?
                                <FontAwesomeIcon icon={["fas", "eye"]} />
                                :
                                <FontAwesomeIcon icon={["fas", "eye-slash"]} />}
                        </div>
                    </FloatingLabel>
                    <FloatingLabel
                        controlId="confirmPasswordInput"
                        label="Confirm password"
                        className={styles.label}>
                        <Form.Control
                            type={passwordVisible ? 'text' : 'password'}
                            placeholder="confirm password"
                            name="confirm"
                        />
                        <div onClick={() => { setPasswordVisible(!passwordVisible) }}
                            className={styles['password-icon']}>
                            {passwordVisible
                                ?
                                <FontAwesomeIcon icon={["fas", "eye"]} />
                                :
                                <FontAwesomeIcon icon={["fas", "eye-slash"]} />}
                        </div>
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
                        Register
                    </Button>
                </Row>
            </Form>

        </div>
    )
}

export default RegisterForm