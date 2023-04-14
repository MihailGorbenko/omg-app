import { Container, Row, Button } from "react-bootstrap"
import styles from '../styles/Auth/AuthLayout.module.css'
import { useLocation, useNavigate } from "react-router"



const AuthActions: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Container className={styles['auth-actions-container']}>
            <Row style={{ justifyContent: "center", gap: '2em' }}>
                <Button
                    className={styles['login-button']}
                    variant="success"
                    onClick={() => {
                        navigate('/login', { state: { from:location } })
                    }
                    }>Login</Button>
                <Button
                    className={styles['register-button']}
                    variant="success"
                    onClick={() => {
                        navigate('/register', { state: { from:location } })
                    }}>Register</Button>
            </Row>
        </Container>
    )
}

export default AuthActions