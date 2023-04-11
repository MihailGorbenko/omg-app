import { ProtectedRoute } from "../components/ProtectedRoute"
import Home from "./Home"



const Index: React.FC = () => {
    return (
        <ProtectedRoute>
            <Home />
        </ProtectedRoute>
    )
}

export default Index