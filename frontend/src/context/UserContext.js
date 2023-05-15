import { useEffect, useState, createContext, useRef } from "react"
import axiosInstance from 'services/axios';

export const UserContext = createContext([])

export const UserProvider = (props) => {
    const [user, setUser] = useState([])
    
    const isMounted = useRef(false)
    
    useEffect(()=>{
        if( isMounted.current == true ) return
        const initialize = async () => {
            const response = await axiosInstance.get("/users/me")
            setUser(response.data)
            console.log(user);
        }
        initialize()
        console.log(user);
        isMounted.current = true
    },[])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}