import { useEffect, useState, createContext, useRef } from 'react'
import axiosInstance from 'services/axios'

export const ProspectContext = createContext([])

export const ProspectProvider = (props) => {
    /* eslint sort-keys: 0 */   
    const [ prospects, setProspects ] = useState([])
    const [ reload, setReload ] = useState(true)
    const isMounted = useRef(false)

    useEffect(() => {
        if(reload){
            isMounted.current = false
        }
        if( isMounted.current == true) return
        const initialize = async () => {
            const response = await axiosInstance.get("/prospects/all")
            setProspects(response.data)
            setReload(false)
        }
        initialize()
        isMounted.current = true
        
    },[prospects, reload])
    
    return (
        <ProspectContext.Provider value={{
            prospects,
            setProspects,
            reload,
            setReload
            }}>
            {props.children}
        </ProspectContext.Provider>
    )
}

