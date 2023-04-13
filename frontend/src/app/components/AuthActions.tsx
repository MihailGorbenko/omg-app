import { Container, Row, Button } from "react-bootstrap"

import styles from '../styles/Auth/AuthLayout.module.css'
import { useNavigate } from "react-router"
import { useAppDispatch } from "../store/store"

export type AuthActionsProps = {
    startTransition: Function,
    ref: React.MutableRefObject<null>
}


const AuthActions: React.FC<AuthActionsProps> = ({ startTransition,ref }) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    return (
        <Container ref={ref} className={styles['auth-actions-container']}>
            <Row style={{ justifyContent: "center", gap: '2em' }}>
                <Button
                    className={styles['login-button']}
                    variant="success"
                    onClick={() => {
                        startTransition()
                        navigate('/auth/login')
                    }
                    }>Login</Button>
                <Button
                    className={styles['register-button']}
                    variant="success"
                    onClick={() => {
                        startTransition()
                        navigate('/auth/register')
                    }}>Register</Button>
            </Row>
        </Container>
    )
}

export default AuthActions