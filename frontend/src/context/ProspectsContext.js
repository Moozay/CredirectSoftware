import { useEffect, useState, createContext, useRef, useContext } from 'react'
import axiosInstance from 'services/axios'
import { UserContext } from './UserContext'
export const ProspectContext = createContext([])

export const ProspectProvider = (props) => {
    /* eslint sort-keys: 0 */   
    const [ prospects, setProspects ] = useState([])
    const { user } = useContext(UserContext)
    const [ reloadProspects, setReloadProspects ] = useState(true)
    const isMounted = useRef(false)

    useEffect(() => {
        if(reloadProspects){
            isMounted.current = false
        }
        if( isMounted.current == true) return
        const initialize = async () => {
            const response = await axiosInstance.get("/prospects/all")
            setProspects(response.data)
            setReloadProspects(false)
        }
        initialize()
        isMounted.current = true
        console.log("api reloaded")
    },[prospects, reloadProspects])
    
    return (
        <ProspectContext.Provider value={{
            prospects,
            setProspects,
            reloadProspects,
            setReloadProspects
            }}>
            {props.children}
        </ProspectContext.Provider>
    )
}

