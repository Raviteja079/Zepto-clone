import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const isAuthenticated = JSON.parse(sessionStorage.getItem("isLoggedIn"))
    console.log(typeof(isAuthenticated))
    let auth = { isAuthenticated: isAuthenticated };
    
    return(
        auth.isAuthenticated ? <Outlet/> : <Navigate to="/"/>
    )
}

export default PrivateRoutes