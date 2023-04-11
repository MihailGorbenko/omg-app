import { useParams } from "react-router"


const ResetPassword:React.FC = () => {
    const params = useParams()
    console.log(params.token);
    
    return <h1>Reset Paassword Page</h1>
}

export default ResetPassword