import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const token = localStorage.getItem('token');
    const isAuthenticated = token != undefined && token.length !=0;
    return(
        isAuthenticated ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes