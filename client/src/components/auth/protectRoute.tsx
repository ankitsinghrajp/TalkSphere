import React, { type ReactNode } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

type protectRouteProps = {
    children?: ReactNode;
    user: unknown | null;
    redirect?: string;
}

const ProtectedRoute: React.FC<protectRouteProps> = ({children, user, redirect='/login'}) => {

    if(!user) return <Navigate to={redirect}/>
       
    return children?children: <Outlet/>
}

export default ProtectedRoute