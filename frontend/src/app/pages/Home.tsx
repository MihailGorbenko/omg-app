import { Outlet } from "react-router"
import { Link } from "react-router-dom"


const Home: React.FC = () => {
    return (
        <>
            <h1>Home Page</h1>
            <Link to='/feed'>Feed</Link>
            <Outlet />
        </>
    )
}

export default Home