import { useLocation, Navigate, Outlet } from "react-router-dom";
import React, {useContext, useState, useEffect} from 'react'
import { UserContext } from "context/UserContext";
import { AuthContext } from "context/JWTAuthContext";

const AuthRoute = ({ allowedRoles })=>{
    const { user } = useContext(AuthContext)
     const location = useLocation()
    
    return user==null?(<Navigate to="/auth/login"/>) : allowedRoles.find((role) => user.role.includes(role))?(
        <Outlet/>
    ) : (
        <Navigate to="/dashboard/metrics"  replace/>
    )
}

export default AuthRoute