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
        "co_emprunteur":{
        }
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
        mensualite:'0.00',
    })

    const changeStringToFloat = (str) =>{
        const str1 = str.replaceAll(" ","")
        const str2 = str1.replaceAll(",",".")
        return parseFloat(str2,10)
      }

    const calculateTeg = (newFormCredit) =>{
    var engBan = donneesBancaires.engagements_bancaires
    var sum = 0
    for (let index = 0; index < engBan.length; index++) {
      if (engBan[index].rat == "Non") {
        sum = sum + changeStringToFloat(engBan[index].echeance)
      }
    }
    sum = sum + changeStringToFloat(newFormCredit.mensualite)
    var revenue = donneesPersonelles.emprunteur.revenue
    var teg = (sum/revenue)*100
    teg = teg.toFixed(2)
    return teg
    }

    // Additions variable forms
    const [datenaissance, setDateNaissance] = useState({
        "emprunteur_date":null,
        "co_emprunteur_date":null
    })
    const [datembauche, setDatembauche] = useState({
        "emprunteur_date":null,
        "co_emprunteur_date":null
    })

    const banqueList = [
        "ATTIJARIWAFA BANK",
        "AL BARID BANK", 
        "ARAB BANK", 
        "BANQUE POPULAIRE", 
        "BANK OF AFRICA", 
        "BMCI", 
        "CDM", 
        "CREDIT AGRICOLE", 
        "CIH", 
        "CFG", 
        "SOGE", 
        "CDG CAPITAL", 
        "UMB", 
        "BANK ASSAFA", 
        "AL AKHDAR BANK", 
        "BANK AL YOUSR", 
        "BTI BANK", 
        "UMNIA BANK", 
        "BANK ARREDA", 
        "DAR AL AMANE"
    ]

    const organismes = [
        "WAFA IMMOBILIER", 
        "ASSALAF AL-AKHDAR", 
        "AXA CREDIT", 
        "BMCI CREDIT CONSO", 
        "DAR SALAF", 
        "FINACRED", 
        "RCI FINANCE", 
        "SALAFIN", 
        "TASLIF", 
        "SOFAC", 
        "FNAC", 
        "EQDOM", 
        "SONAC", 
        "SOREC", 
        "VIVALIS SALAF", 
        "WAFASALAF", 
        "BMCI LEASING", 
        "MAROC LEASING", 
        "CREDIT DU MAROC LEASING", 
        "SOGELEASE MAROC", 
        "MAGHREBAIL", 
        "WAFABAIL", 
        "AL AMANA", 
        "AL KARAMA", 
        "AIMC", 
        "FONDEP", 
        "TAWADA", 
        "INMAA", 
        "ATTIJARIWAFA BANK", 
        "AL BARID BANK", 
        "ARAB BANK", 
        "BANQUE POPULAIRE", 
        "BANK OF AFRICA", 
        "BMCI", 
        "CDM", 
        "CREDIT AGRICOLE", 
        "CIH", 
        "CFG", 
        "SOGE", 
        "CDG CAPITAL", 
        "UMB", 
        "BANK ASSAFA", 
        "AL AKHDAR BANK", 
        "BANK AL YOUSR", 
        "BTI BANK", 
        "UMNIA BANK", 
        "BANK ARREDA", 
        "DAR AL AMANE"
    ]

    const resetForm = () =>{
        setDonneesPersonelles({
            "emprunteur":{
                "hasCoEmprunteur":false,
            },
            "co_emprunteur":{}
        })
        setDonneesBancaires({
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
        setCredit({})
        setDateNaissance({
            "emprunteur_date":null,
            "co_emprunteur_date":null
        })
        setDatembauche({
                "emprunteur_date":null,
                "co_emprunteur_date":null
            })
        
    }

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
            setDatembauche,
            resetForm,
            banqueList,
            organismes,
            changeStringToFloat,
            calculateTeg
            }}>
            {props.children}
        </CreditContext.Provider>
    )
}

