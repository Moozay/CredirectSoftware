import { useEffect, useState, createContext, useRef } from 'react'
import axiosInstance from 'services/axios'

export const DemandeContext = createContext([])

export const DemandeProvider = (props) => {
    /* eslint sort-keys: 0 */   
    const [ demandes, setDemandes ] = useState([])
    const [ reloadDemandes, setReloadDemandes ] = useState(true)
    const isMounted = useRef(false)

    useEffect(() => {
        if(reloadDemandes){
            isMounted.current = false
        }
        if( isMounted.current == true) return
        const initialize = async () => {
            const response = await axiosInstance.get("/credits/all")
            setDemandes(response.data)
            setReloadDemandes(false)
        }
        initialize()
        isMounted.current = true
    },[demandes, reloadDemandes])
    
    return (
        <DemandeContext.Provider value={{
            demandes,
            setDemandes,
            reloadDemandes,
            setReloadDemandes
            }}>
            {props.children}
        </DemandeContext.Provider>
    )
}

