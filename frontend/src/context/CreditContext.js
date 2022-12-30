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
      adresse:{
        pays: 'Morocco'
      }
    },
    co_emprunteur: {
  
    },
  });

  const [hasCoEmprunteur, setHasCoEmprunteur] = useState(
    donneesPersonelles.emprunteur?.hasCoEmprunteur
  );

  const [donneesBancaires, setDonneesBancaires] = useState({
    engagements_bancaires: [
      {
        nom: "",
        prenom: "",
        nature_credit: "",
        organisme: "",
        echeance: "",
        encours: "",
        duree: "",
        rat: "",
      },
    ],
    renseignements_bancaires: [
      { nom: "", prenom: "", banque: "", solde: "", cmc: "" },
    ],
  });
  const [credit, setCredit] = useState({
    mensualite: "0.00",
  });

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
    var r1 = donneesPersonelles.emprunteur.revenue;
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
      var r1 = donneesPersonelles.emprunteur.revenue;
      var r2 =
        hasCoEmprunteur === "true"
          ? donneesPersonelles.co_emprunteur.revenue
          : "0";
      r1 = changeStringToFloat(r1);
      r2 = changeStringToFloat(r2);
      var revenue = r1 + r2;
      var taux_endt = calculateTauxEndt(mensualite, revenue);
      var teg = calculateTeg(newFormCredit.mensualite.toString(),donneesBancaires.engagements_bancaires);
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
  ];

  const resetForm = () => {
    setDonneesPersonelles({
      emprunteur: {
        hasCoEmprunteur: false,
      },
      co_emprunteur: {},
    });
    setDonneesBancaires({
      engagements_bancaires: [
        {
          nom: "",
          prenom: "",
          nature_credit: "",
          organisme: "",
          echeance: "",
          encours: "",
          duree: "",
          rat: "",
        },
      ],
      renseignements_bancaires: [
        { nom: "", prenom: "", banque: "", solde: "", cmc: "" },
      ],
    });
    setCredit({});
    setDateNaissance({
      emprunteur_date: null,
      co_emprunteur_date: null,
    });
    setDatembauche({
      emprunteur_date: null,
      co_emprunteur_date: null,
    });
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
        organismes,
        changeStringToFloat,
        calculateTeg,
        hasCoEmprunteur,
        setHasCoEmprunteur,
        calculateMensualite,
        calculateTauxEndt,
        calculateQot
      }}
    >
      {props.children}
    </CreditContext.Provider>
  );
};
