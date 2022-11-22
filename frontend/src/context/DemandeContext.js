import { useEffect, useState, createContext, useRef } from 'react'
import axiosInstance from 'services/axios'

export const DemandeContext = createContext([])

export const DemandeProvider = (props) => {
    /* eslint sort-keys: 0 */   
    const [ demandes, setDemandes ] = useState([])
    const [ reload, setReload ] = useState(true)
    const isMounted = useRef(false)

    useEffect(() => {
        if(reload){
            isMounted.current = false
        }
        if( isMounted.current == true) return
        const initialize = async () => {
            const response = await axiosInstance.get("/credits/all")
            setDemandes(response.data)
            setReload(false)
        }
        initialize()
        isMounted.current = true
    },[demandes, reload])
    
    return (
        <DemandeContext.Provider value={{
            demandes,
            setDemandes,
            reload,
            setReload
            }}>
            {props.children}
        </DemandeContext.Provider>
    )
}

