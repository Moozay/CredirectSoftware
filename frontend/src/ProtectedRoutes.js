import React, { useContext } from 'react'

import { Navigate, Outlet} from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { GlobalContext } from 'context/GlobalContext'

const useAuth = (token) => {
    return token != null
}

const ProtectedRoutes = () => {
    return <Outlet/>
}

export default ProtectedRoutes