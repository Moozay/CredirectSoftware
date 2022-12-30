import { useEffect, useState, createContext, useRef, useContext } from 'react'
import axiosInstance from 'services/axios'

export const UpdateContext = createContext([])


export const UpdateProvider = (props) =>{
    const [demande, setDemande] = useState({})
    const [donneesPersonnelles, setDonneesPersonnelles] = useState({
        emprunteur:{
            adresse: {
                adresse1:"",
                ville:"",
                pays:""
            },
            agent_id: "",
            cin_sejour:"",
            coemp_id:"",
            credits:[],
            datembauche:"",
            engagements_bancaires:[],
            has_coemp:"",
            lieunaissance:"",
            nationalite:"",
            nom: "",
            participation:"",
            prenom:"",
            profession:"",
            prospect_id:"",
            renseignements_bancaires:[],
            revenue:"",
            rs_employeur:"",
            situation:"",
            telephone:""
        },
        co_emprunteur:{
            adresse: {
                adresse1:"",
                ville:"",
                pays:""
            },
            cin_sejour:"",
            coemp_id:"",
            datembauche:"",
            datenaissance:"",
            lieunaissance:"",
            nationalite:"",
            nom: "",
            participation:"",
            prenom:"",
            profession:"",
            prospect_id:"",
            revenue:"",
            rs_employeur:"",
            situation:"",
            telephone:""
        }
    })
    const [donneesBancaires, setDonneesBancaires] = useState({})
    const [credit, setCredit] = useState({})
    const [isEditing, setIsEditing] = useState(false)

    const [datenaissance, setDateNaissance] = useState({
        "emprunteur_date":null,
        "co_emprunteur_date":null
    })
    const [datembauche, setDatembauche] = useState({
        "emprunteur_date":null,
        "co_emprunteur_date":null
    })

    const changeStringToFloat = (str) =>{
        const str1 = str.replaceAll(" ","")
        const str2 = str1.replaceAll(",",".")
        return parseFloat(str2,10)
      }

      const calculateQot = (newFormCredit) => {
        var montant = newFormCredit.montant;
        var montant_acte = newFormCredit.montant_acte;
        var qot = 0;
        if (montant !== undefined && montant_acte !== undefined) {
          var montant = changeStringToFloat(newFormCredit.montant);
          var montant_acte = changeStringToFloat(newFormCredit.montant_acte);
          qot = (montant / montant_acte) * 100;
        }
        if (isNaN(qot)) {
          qot = 0;
          console.log("invalid");
        }
    
        return qot.toFixed(2);
      };
    
      const calculateMensualite = (newFormCredit, index) => {
        var montant = newFormCredit.montant;
        var duree = newFormCredit.duree_credit;
        var taux = newFormCredit.taux;
        if (montant !== undefined && duree !== undefined && taux !== undefined) {
          montant = changeStringToFloat(newFormCredit.montant);
          duree = changeStringToFloat(newFormCredit.duree_credit);
          taux = changeStringToFloat(newFormCredit.taux);
          var numerator = montant * ((taux * 1.1) / 1200);
          var denumerator = 1 - (1 + (taux * 1.1) / 1200) ** -duree;
          console.log(numerator, denumerator);
          var mensualite = numerator / denumerator;
          newFormCredit.mensualite = mensualite.toFixed(2);
          var r1 = donneesPersonnelles.emprunteur.revenue;
          var r2 =
            donneesPersonnelles.emprunteur.has_coemp === "true"
              ? donneesPersonnelles.co_emprunteur.revenue
              : "0";
          r1 = changeStringToFloat(r1);
          r2 = changeStringToFloat(r2);
          var revenue = r1 + r2;
          var taux_endt = calculateTauxEndt(mensualite, revenue);
          var teg = calculateTeg(newFormCredit.mensualite.toString(),donneesPersonnelles.emprunteur.engagements_bancaires);
          newFormCredit.teg = teg;
          newFormCredit.taux_endt = taux_endt;
          if (isNaN(mensualite) || isNaN(duree) || duree < 1) {
            newFormCredit.mensualite = "0";
            newFormCredit.taux_endt = "0.00";
            newFormCredit.teg = "0.00";
            console.log("invalid");
          }
        }
        const newRecord = { ...donneesPersonnelles };
          newRecord.credits[index] = newFormCredit;
          setDonneesPersonnelles(newRecord);
      };
      const calculateTauxEndt = (mensualite, revenue) => {
        var taux_endt = (mensualite / revenue) * 100;
        if (isNaN(taux_endt)) {
          taux_endt = 0;
        }
        return taux_endt.toFixed(2);
      };

    const calculateTeg = (mensualite, engBan) =>{
        var sum = 0
        for (let index = 0; index < engBan.length; index++) {
          if (engBan[index].rat == "Non" && engBan[index]) {
            sum = sum + changeStringToFloat(engBan[index].echeance)
          }
        }
        sum = sum + changeStringToFloat(mensualite)
        var r1 = donneesPersonnelles.emprunteur.revenue
        var r2 = donneesPersonnelles.emprunteur.has_coemp === "true"? donneesPersonnelles.co_emprunteur.revenue:"0"
        r1 = changeStringToFloat(r1)
        r2 = changeStringToFloat(r2)
        var revenue = r1 + r2
        var teg = (sum/revenue)*100
        console.log(revenue);
        teg = teg.toFixed(2)
        return teg
        }

  

    return (
        <UpdateContext.Provider value={{
            demande,
            setDemande,
            donneesPersonnelles,
            setDonneesPersonnelles,
            donneesBancaires,
            setDonneesBancaires,
            credit,
            setCredit,
            isEditing,
            setIsEditing,
            datenaissance,
            datembauche,
            setDateNaissance,
            setDatembauche,
            calculateTeg,
            calculateMensualite,
            calculateTauxEndt,
            calculateQot,
        }}>
            {props.children}
        </UpdateContext.Provider>
    )
}