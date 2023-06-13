import { useEffect, useState, createContext } from "react";
import axiosInstance from "services/axios";

export const CreditContext = createContext([]);

export const CreditProvider = (props) => {
  /* eslint sort-keys: 0 */
  const [demandeCredit, setDemandeCredit] = useState([]);
  const [donneesPersonelles, setDonneesPersonelles] = useState({
    emprunteur: {
      hasCoEmprunteur: "false",
      participation: "100",
      adresse: {
        pays: "Morocco",
      },
    },
    co_emprunteur: {},
  });

  const [hasCoEmprunteur, setHasCoEmprunteur] = useState(
    donneesPersonelles.emprunteur?.hasCoEmprunteur
  );

  const [existingRecord, setExistingRecord] = useState({
    existing : false,
    prospect_id : null
  });

  const [donneesBancaires, setDonneesBancaires] = useState({
    engagements_bancaires: [],
    renseignements_bancaires: [
      { nom: "", prenom: "", banque: "", solde: "", cmc: "" },
    ],
  });
  const [credit, setCredit] = useState({
    mensualite: "0.00",
    prospect_revenue: "0.00",
  });
  const [banquEnvoye, setBanquEnvoye] = useState([
    {
      banque: "",
      date_envoi: "",
      interlocuteur: "",
      agence: "",
    },
  ]);

  const handleCreditDataChange = (event) => {
    var fieldName = event.target.getAttribute("name");
    var fieldValue = event.target.value;
    var newFormCredit = { ...credit };
    switch (fieldValue) {
      case "consommation":
        newFormCredit = {
          prospect_revenue: credit.prospect_revenue,
          montant: credit.montant,
          duree_credit: credit.duree_credit,
          frequence: credit.frequence,
          taux: credit.taux,
          taux_demande: credit.taux_demande,
          mensualite: credit.mensualite,
          franchise: credit.franchise,
          taux_endt: credit.taux_endt,
          teg: credit.teg,
          commentaires: credit.commentaires,
        };
        newFormCredit.qot_financement = "0.00";
        newFormCredit[fieldName] = fieldValue;
        setCredit(newFormCredit);
        console.log(credit);
        break;
      case "immobilier":
        if (newFormCredit.garanties != null) {
          newFormCredit.garanties = [...newFormCredit.garanties];
        } else newFormCredit.garanties = [];
        break;
      case "hypothecaire":
        if (newFormCredit.garanties != null) {
          newFormCredit.garanties = [...newFormCredit.garanties];
        } else newFormCredit.garanties = [];
        break;
      
        case "leasing":
          newFormCredit = {
            type_credit: credit.type_credit,
            prospect_revenue: credit.prospect_revenue,
            montant: credit.montant,
            duree_credit: credit.duree_credit,
            frequence: credit.frequence,
            taux: credit.taux,
            taux_demande: credit.taux_demande,
            mensualite: credit.mensualite,
            franchise: credit.franchise,
            taux_endt: credit.taux_endt,
            teg: credit.teg,
            commentaires: credit.commentaires,
          };
          newFormCredit.qot_financement = "0.00";
          newFormCredit[fieldName] = fieldValue;
          setCredit(newFormCredit);
          console.log(credit);
          break;
          case "participatif":
            newFormCredit = {
              type_credit: credit.type_credit,
              prospect_revenue: credit.prospect_revenue,
              montant: credit.montant,
              duree_credit: credit.duree_credit,
              frequence: credit.frequence,
              taux: credit.taux,
              taux_demande: credit.taux_demande,
              mensualite: credit.mensualite,
              franchise: credit.franchise,
              taux_endt: credit.taux_endt,
              teg: credit.teg,
              commentaires: credit.commentaires,
            };
            newFormCredit.qot_financement = "0.00";
            newFormCredit[fieldName] = fieldValue;
            setCredit(newFormCredit);
            console.log(credit);
            break;

        default:
          console.log(credit);
          break;
    }
    switch (fieldName) {
      case "montant":
        newFormCredit[fieldName] = fieldValue;
        var qot = calculateQot(newFormCredit);
        newFormCredit.qot_financement = qot;
        setCredit(newFormCredit);
        if (fieldValue !== "") {
          calculateMensualite(newFormCredit);
        }
        break;
      case "taux":
        newFormCredit[fieldName] = fieldValue;
        setCredit(newFormCredit);
        if (fieldValue !== "") {
          calculateMensualite(newFormCredit);
        }
        break;
        case "prospect_revenue":
          newFormCredit[fieldName] = fieldValue;
          setCredit(newFormCredit);
          if (fieldValue !== "") {
            calculateMensualite(newFormCredit);
          }
          break;
      case "duree_credit":
        newFormCredit[fieldName] = fieldValue;
        setCredit(newFormCredit);
        if (fieldValue !== "") {
          calculateMensualite(newFormCredit);
        }
        break;
      case "montant_acte":
        newFormCredit[fieldName] = fieldValue;
        var qot = calculateQot(newFormCredit);
        newFormCredit.qot_financement = qot;
        setCredit(newFormCredit);
        console.log(credit);
        break;
      case "montant_travaux":
        newFormCredit[fieldName] = fieldValue;
        var qot = calculateQot(newFormCredit);
        newFormCredit.qot_financement = qot;
        setCredit(newFormCredit);
        console.log(credit);
        break;
      default:
        newFormCredit[fieldName] = fieldValue;
        setCredit(newFormCredit);
        console.log(credit);
        break;
    }
  };


  const createNewRecord = async (prospect) => {
    const response = await axiosInstance.get(
      `/credits/last_credit/${prospect.prospect_id}`
    );
    setExistingRecord({
      existing : true,
      prospect_id : prospect["prospect_id"]
    })
    console.log(response.data);
    const data = response.data.pop();
    const newEngagements_bancaires = {
      nom: prospect["nom"],
      prenom: prospect["prenom"],
      nature_credit: data["type_credit"],
      echeance: data["mensualite"].replace(".", ","),
      organisme: data["banque"],
      duree: data["duree_credit"],
      rat: "Non",
    };
    const newDonneesPersonelles = { ...donneesPersonelles };
    for (const[key, value] of Object.entries(prospect)){
      if ((!Array.isArray(value))&&value !== null) {
        newDonneesPersonelles["emprunteur"][key] = value
      }
    }
    newDonneesPersonelles["emprunteur"]["hasCoEmprunteur"] = "false";
    newDonneesPersonelles["emprunteur"]["participation"] = "100";
    const newDonneesBancaires = {
      engagements_bancaires: [],
      renseignements_bancaires: [],
    };
    newDonneesBancaires.renseignements_bancaires =
      prospect["renseignements_bancaires"];
    newDonneesBancaires.engagements_bancaires = [
      ...data["engagements_bancaires"],
      newEngagements_bancaires,
    ];
    const newDateNaissance = {};
    const newDateEmbauche = {};
    newDateNaissance["emprunteur_date"] = new Date(prospect.datenaissance);
    newDateEmbauche["emprunteur_date"] = new Date(prospect.datembauche);
    setDonneesPersonelles(newDonneesPersonelles);
    setDateNaissance(newDateNaissance);
    setDatembauche(newDateEmbauche);
    setDonneesBancaires(newDonneesBancaires);
  };
  const [date_envoi, setDatenvoi] = useState([]);
  const changeStringToFloat = (str) => {
    const str1 = str.replaceAll(" ", "");
    const str2 = str1.replaceAll(",", ".");
    return parseFloat(str2, 10);
  };

  const calculateTeg = (mensualite, engBan) => {
    var sum = 0;
    for (let index = 0; index < engBan.length; index++) {
      if (engBan[index].rat == "Non") {
        sum = sum + changeStringToFloat(engBan[index].echeance);
        console.log("yes");
      }
    }
    sum = sum + changeStringToFloat(mensualite);
    var r1 = credit["prospect_revenue"]
    var r2 =
      hasCoEmprunteur === "true"
        ? donneesPersonelles.co_emprunteur.revenue
        : "0";
    r1 = changeStringToFloat(r1);
    r2 = changeStringToFloat(r2);
    var revenue = r1 + r2;
    var teg = (sum / revenue) * 100;
    console.log(revenue);
    teg = teg.toFixed(2);
    return teg;
  };

  const calculateQot = (newFormCredit) => {
    var montant = newFormCredit.montant;
    var montant_acte = newFormCredit.montant_acte;
    var montant_travaux = newFormCredit.montant_travaux;
    var qot = 0;
    if (
      montant !== undefined &&
      montant_acte !== undefined &&
      newFormCredit["type_credit"] !== "consommation"
    ) {
      var montant = changeStringToFloat(newFormCredit.montant);
      var montant_acte = changeStringToFloat(newFormCredit.montant_acte);
      var montant_travaux =
        newFormCredit.montant_travaux == null ||
        newFormCredit.montant_travaux == ""
          ? changeStringToFloat("0")
          : changeStringToFloat(newFormCredit.montant_travaux);
      qot = (montant / (montant_acte + montant_travaux)) * 100;
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
      var r1 = credit["prospect_revenue"]
      var r2 =
        hasCoEmprunteur === "true"
          ? donneesPersonelles.co_emprunteur.revenue
          : "0";
      r1 = changeStringToFloat(r1);
      r2 = changeStringToFloat(r2);
      var revenue = r1 + r2;
      var taux_endt = calculateTauxEndt(mensualite, revenue);
      var teg = calculateTeg(
        newFormCredit.mensualite.toString(),
        donneesBancaires.engagements_bancaires
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
    setCredit(newFormCredit);
  };
  const calculateTauxEndt = (mensualite, revenue) => {
    var taux_endt = (mensualite / revenue) * 100;
    if (isNaN(taux_endt)) {
      taux_endt = 0;
    }
    return taux_endt.toFixed(2);
  };
  // Additions variable forms
  const [datenaissance, setDateNaissance] = useState({
    emprunteur_date: null,
    co_emprunteur_date: null,
  });
  const [datembauche, setDatembauche] = useState({
    emprunteur_date: null,
    co_emprunteur_date: null,
  });

  const banqueList = [
    "ATTIJARIWAFA BANK",
    "AL BARID BANK",
    "ARAB BANK",
    "BP",
    "BANK OF AFRICA",
    "BMCI",
    "CDM",
    "CREDIT AGRICOLE",
    "CIH",
    "CFG",
    "SGMB",
    "CDG CAPITAL",
    "UMB",
    "BANK ASSAFA",
    "AL AKHDAR BANK",
    "BANK AL YOUSR",
    "BTI BANK",
    "UMNIA BANK",
    "BANK ARREDA",
    "DAR AL AMANE",
    "ETRANGER",
  ];

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
    "DAR AL AMANE",
    "ETRANGER",
  ];

  const resetForm = () => {
    setDonneesPersonelles({
      emprunteur: {
        hasCoEmprunteur: "false",
        participation: "100",
        adresse: {
          pays: "Morocco",
        },
      },
      co_emprunteur: {},
    });
    setHasCoEmprunteur("false");
    setDonneesBancaires({
      engagements_bancaires: [],
      renseignements_bancaires: [
        { nom: "", prenom: "", banque: "", solde: "", cmc: "" },
      ],
    });
    setCredit({ mensualite: "0.00" });
    setDateNaissance({
      emprunteur_date: null,
      co_emprunteur_date: null,
    });
    setDatembauche({
      emprunteur_date: null,
      co_emprunteur_date: null,
    });
    setDatenvoi([]);
    setBanquEnvoye([
      {
        banque: "",
        date_envoi: "",
        interlocuteur: "",
        agence: "",
      },
    ]);
  };

  useEffect(() => {}, []);

  return (
    <CreditContext.Provider
      value={{
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
        banquEnvoye,
        setBanquEnvoye,
        date_envoi,
        setDatenvoi,
        organismes,
        changeStringToFloat,
        calculateTeg,
        hasCoEmprunteur,
        setHasCoEmprunteur,
        calculateMensualite,
        calculateTauxEndt,
        calculateQot,
        createNewRecord,
        existingRecord,
        setExistingRecord,
        handleCreditDataChange
      }}
    >
      {props.children}
    </CreditContext.Provider>
  );
};
