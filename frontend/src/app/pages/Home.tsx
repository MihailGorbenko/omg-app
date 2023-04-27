import { Card, Container, Row, Image } from "react-bootstrap"
import { Outlet } from "react-router"
import { useTypedSelector } from "../store/store"
import { selectAuth } from "../features/authentication/authSlice"
import styles from '../styles/Home/Home.module.css'


const Home: React.FC = () => {
    const user = useTypedSelector(selectAuth).user

    return (
        <Container style={{ padding: '0 2em' }}>
            <Row className="justify-content-center ">
                <Card className={styles.card}>
                    <Image
                        roundedCircle
                        src={user?.avatar_url.toString()}
                        className={styles['profile-image']} />
                    <Card.Body>
                        <h1>{user?.name.toUpperCase() + ' ' + user?.lastName.toUpperCase()}</h1>
                        <hr />
                        <h3>{user?.email}</h3>
                    </Card.Body>
                </Card>
            </Row>
            <Outlet />
        </Container>
    )
}

export default Home