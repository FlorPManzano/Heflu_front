import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

function PrivateRoutes() {
    const { authToken } = useAuth()
    if (!authToken) return <Navigate replace to="/" />

    return <Outlet />
}

export default PrivateRoutes
