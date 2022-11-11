import { useEffect, useState, createContext } from 'react'
import axiosInstance from 'services/axios'

export const CreditContext = createContext([])

export const CreditProvider = (props) => {
    /* eslint sort-keys: 0 */   
    const [demandeCredit, setDemandeCredit] = useState([])
    
    const [donneesPersonelles, setDonneesPersonelles] = useState({
        "emprunteur":{
            "hasCoEmprunteur":false,
        },
        "co_emprunteur":{}
    })
    
    const [ donneesBancaires, setDonneesBancaires ] = useState({
        "engagements_bancaires":[{
            nom: "",
            prenom: "",
            nature_credit: "",
            organisme: "",
            echeance: "",
            encours: "",
            duree: "",
            rat: ""
    
          }],
        "renseignements_bancaires":[{nom:"",prenom:"",banque:"",solde:"",cmc:""}]
    })
    const [ credit, setCredit ] = useState({
       
    })

    // Additions variable forms
    const [datenaissance, setDateNaissance] = useState({
        "emprunteur_date":null,
        "co_emprunteur_date":null
    })
    const [datembauche, setDatembauche] = useState({
        "emprunteur_date":null,
        "co_emprunteur_date":null
    })

    useEffect(() => {
        
    },[])
    
    return (
        <CreditContext.Provider value={{
            demandeCredit, 
            setDemandeCredit,
            donneesPersonelles, 
            setDonneesPersonelles,
            donneesBancaires, 
            setDonneesBancaires,
            credit, 
            setCredit,
            datenaissance, 
            setDateNaissance,
            datembauche, 
            setDatembauche
            }}>
            {props.children}
        </CreditContext.Provider>
    )
}

