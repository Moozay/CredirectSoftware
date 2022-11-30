import React, { useEffect, useState } from 'react'
import { useAuth } from 'hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'

const PublicRoute = (props) => {
    const { children } = props
    const auth = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const [isVerified, setIsVerified] = useState(false)

    useEffect(()=>{
        if(auth.isAuthenticated){
            navigate('/dashboard/demandeCredit', {replace: true, state: { from: location }})
        }else{
            setIsVerified(true)
        }
    }, [auth.isAuthenticated, location, navigate])

    if(!isVerified){
        return null
    }
    return <>{children}</>
}

export default PublicRoute