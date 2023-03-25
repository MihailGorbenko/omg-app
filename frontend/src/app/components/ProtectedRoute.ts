import React, {FC, PropsWithChildren} from "react"

interface Props{
    children: JSX.Element; 
}
export const ProtectedRoute:FC<Props> = ({children}) => {

    return children
}