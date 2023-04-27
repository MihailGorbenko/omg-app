import { useNavigate } from "react-router"
import { useEffect } from "react"



const Index: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/home')
    })

    return <></>
}

export default Index