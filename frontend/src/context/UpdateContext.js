import { useEffect, useState, createContext, useRef, useContext } from "react";
import axiosInstance from "services/axios";

export const UpdateContext = createContext([]);

export const UpdateProvider = (props) => {
  const [demande, setDemande] = useState({});
  const [donneesPersonnelles, setDonneesPersonnelles] = useState({
    emprunteur: {
      adresse: {
        adresse1: "",
        ville: "",
        pays: "",
      },
      agent_id: "",
      cin_sejour: "",
      coemp_id: "",
      credits: [],
      datembauche: "",
      engagements_bancaires: [],
      has_coemp: "",
      lieunaissance: "",
      nationalite: "",
      nom: "",
      participation: "",
      prenom: "",
      profession: "",
      prospect_id: "",
      renseignements_bancaires: [],
      revenue: "",
      rs_employeur: "",
      situation: "",
      telephone: "",
    },
    co_emprunteur: {
      adresse: {
        adresse1: "",
        ville: "",
        pays: "",
      },
      cin_sejour: "",
      coemp_id: "",
      datembauche: "",
      datenaissance: "",
      lieunaissance: "",
      nationalite: "",
      nom: "",
      participation: "",
      prenom: "",
      profession: "",
      prospect_id: "",
      revenue: "",
      rs_employeur: "",
      situation: "",
      telephone: "",
    },
  });
  const [record, setRecord] = useState({});
  const [recordDatenaissance, setRecordDatenaissance] = useState({});
  const [recordDatEmbauche, setRecordDatEmbauche] = useState({});

  const [isEditing, setIsEditing] = useState(false);
  const [Pays, setPays] = useState({});

  const [date_envoi, setDatenvoi] = useState([])
  
  const [datenaissance, setDateNaissance] = useState({
    emprunteur_date: null,
    co_emprunteur_date: null,
  });
  const [datembauche, setDatembauche] = useState({
    emprunteur_date: null,
    co_emprunteur_date: null,
  });

  const changeStringToFloat = (str) => {
    const str1 = str.replaceAll(" ", "");
    const str2 = str1.replaceAll(",", ".");
    return parseFloat(str2, 10);
  };

  const calculateQot = (newFormCredit) => {
    var montant = newFormCredit.montant;
    var montant_acte = newFormCredit.montant_acte;
    var montant_travaux = newFormCredit.montant_travaux
    var qot = 0;
    if (montant !== undefined && montant_acte !== undefined && newFormCredit["type_credit"] !== "consommation")  {
      var montant = changeStringToFloat(newFormCredit.montant);
      var montant_acte = changeStringToFloat(newFormCredit.montant_acte);
      var montant_travaux = newFormCredit.montant_travaux == null || newFormCredit.montant_travaux == ""? changeStringToFloat("0"):changeStringToFloat(newFormCredit.montant_travaux)
      qot = (montant / (montant_acte + montant_travaux))  * 100;
    }
    if (isNaN(qot)) {
      qot = 0;
      console.log("invalid");
    }

    return qot.toFixed(2);
  };

  const calculateMensualite = (newFormCredit) => {
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
      var r1 = donneesPersonnelles.credit.prospect_revenue;
      var r2 =
        donneesPersonnelles.emprunteur.has_coemp === "true"
          ? donneesPersonnelles.co_emprunteur.revenue
          : "0";
      r1 = changeStringToFloat(r1);
      r2 = changeStringToFloat(r2);
      var revenue = r1 + r2;
      var taux_endt = calculateTauxEndt(mensualite, revenue);
      var teg = calculateTeg(
        newFormCredit.mensualite.toString(),
        donneesPersonnelles.credit.engagements_bancaires
      );
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
    newRecord.credit = newFormCredit;
    setDonneesPersonnelles(newRecord);
  };
  const calculateTauxEndt = (mensualite, revenue) => {
    var taux_endt = (mensualite / revenue) * 100;
    if (isNaN(taux_endt)) {
      taux_endt = 0;
    }
    return taux_endt.toFixed(2);
  };

  const calculateTeg = (mensualite, engBan) => {
    var sum = 0;
    for (let index = 0; index < engBan.length; index++) {
      if (engBan[index].rat == "Non" && engBan[index]) {
        sum = sum + changeStringToFloat(engBan[index].echeance);
      }
    }
    sum = sum + changeStringToFloat(mensualite);
    var r1 = donneesPersonnelles.credit.prospect_revenue;
    var r2 =
      donneesPersonnelles.emprunteur.has_coemp === "true"
        ? donneesPersonnelles.co_emprunteur.revenue
        : "0";
    r1 = changeStringToFloat(r1);
    r2 = changeStringToFloat(r2);
    var revenue = r1 + r2;
    var teg = (sum / revenue) * 100;
    console.log(revenue);
    teg = teg.toFixed(2);
    return teg;
  };
  

  const handleCreditDataChange = (event) => {
    var fieldName = event.target.getAttribute("name");
    var fieldValue = event.target.value;
    var newFormCredit = donneesPersonnelles["credit"];
    switch (fieldName) {
      case "montant":
        newFormCredit[fieldName] = fieldValue;
        var qot = calculateQot(newFormCredit);
        newFormCredit.qot_financement = qot;
        if (fieldValue !== "") {
          calculateMensualite(newFormCredit);
        }
        break;
      case "taux":
        newFormCredit[fieldName] = fieldValue;
        if (fieldValue !== "") {
          calculateMensualite(newFormCredit);
        }
        break;
      case "duree_credit":
        newFormCredit[fieldName] = fieldValue;
        if (fieldValue !== "") {
          calculateMensualite(newFormCredit);
        }
        break;
      case "montant_acte":
        newFormCredit[fieldName] = fieldValue;
        var qot = calculateQot(newFormCredit);
        newFormCredit.qot_financement = qot;
        break;
      case "montant_travaux":
        newFormCredit[fieldName] = fieldValue;
        var qot = calculateQot(newFormCredit);
        newFormCredit.qot_financement = qot;
        break;
      case "montant_travaux":
        newFormCredit[fieldName] = fieldValue;
        var qot = calculateQot(newFormCredit);
        newFormCredit.qot_financement = qot;
        break;
      case "prospect_revenue":
        newFormCredit[fieldName] = fieldValue;
        calculateMensualite(newFormCredit);
        break;
      default:
        newFormCredit[fieldName] = fieldValue;
        break;
    }
    if (fieldName == "promoteur" && fieldValue === "Non") {
      newFormCredit["promoteur_nom"] = "";
      newFormCredit[fieldName] = fieldValue;
    }

    if (fieldValue == "consommation") {
      newFormCredit = {
        ...newFormCredit,
        ...consommation_data,
      };
      newFormCredit.qot_financement = "0.00";
      newFormCredit[fieldName] = fieldValue;
    }
    const newRecord = { ...donneesPersonnelles };
    newRecord.credit = newFormCredit;
    setDonneesPersonnelles(newRecord);
    console.log(newRecord);
  };

  const consommation_data = {
    objet_credit: null,
    nature_bien: null,
    etat_bien: null,
    usage_bien: null,
    montant_bien: null,
    montant_acte: null,
    montant_travaux: null,
    montant_venal: null,
    adresse_bien: {},
    superficie: null,
    titre_foncier: null,
    garanties: null,
  };


  return (
    <UpdateContext.Provider
      value={{
        demande,
        setDemande,
        donneesPersonnelles,
        setDonneesPersonnelles,
        record,
        setRecord,
        recordDatEmbauche,
        recordDatenaissance,
        setRecordDatEmbauche,
        setRecordDatenaissance,
        Pays,
        setPays,
        isEditing,
        setIsEditing,
        datenaissance,
        datembauche,
        date_envoi,
        setDatenvoi,
        changeStringToFloat,
        setDateNaissance,
        setDatembauche,
        calculateTeg,
        calculateMensualite,
        calculateTauxEndt,
        calculateQot,
        handleCreditDataChange
      }}
    >
      {props.children}
    </UpdateContext.Provider>
  );
};
