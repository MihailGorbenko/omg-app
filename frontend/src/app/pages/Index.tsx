import { useNavigate } from "react-router"
import { ProtectedRoute } from "../components/ProtectedRoute"
import Home from "./Home"
import { useEffect } from "react"



const Index: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/home')
    })
    
    return <></>
}

export default Index