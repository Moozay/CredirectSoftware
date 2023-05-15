import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stack,
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import ViewDonneesPersonnelles from "./ViewDonneesPersonnelles/ViewDonneesPersonnelles";
import ViewDonneesCredit from "./ViewDonneesCredit/ViewDonneesCredit";
import ViewDonneesBancaires from "./ViewDonneesBancaires/ViewDonneesBancaires";
import axiosInstance from "services/axios";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@chakra-ui/react";
import { UpdateContext } from "context/UpdateContext";
import ViewDonneesEnvoyer from "./ViewDonneesEnvoyer/ViewDonneesEnvoyer";
import { ProspectContext } from "context/ProspectsContext";

const ViewProspect = () => {
  const toast = useToast();
  const { setReloadProspects } = useContext(ProspectContext);
  const [tabIndex, setTabIndex] = useState(0);
  const {
    isEditing,
    setIsEditing,
    donneesPersonnelles,
    setDonneesPersonnelles,
    setDonneesBancaires,
  } = useContext(UpdateContext);
  const {
    record,
    setRecord,
    date_envoi,
    setDatenvoi,
    recordDatenaissance,
    recordDatEmbauche,
    setRecordDatenaissance,
    setRecordDatEmbauche,
  } = useContext(UpdateContext);
  const { Pays, setPays, setDateNaissance, setDatembauche } =
    useContext(UpdateContext);
  const location = useLocation();
  const id = location.state.id;
  const return_link = location.state.return_link;
  const handleEdit = (status) => {
    setIsEditing(status);
  };
  const submit = () => {
    const emp_in = { ...donneesPersonnelles.emprunteur };
    const credit = donneesPersonnelles.credit;
    delete emp_in.has_coemp;
    if (
      donneesPersonnelles.emprunteur.has_coemp === "true" &&
      donneesPersonnelles.emprunteur.coemp_id === null
    ) {
      const coemp_id = uuidv4();
      const coemp_in = donneesPersonnelles.co_emprunteur;
      coemp_in.coemp_id = coemp_id;
      emp_in.coemp_id = coemp_id;
      coemp_in.prospect_id = donneesPersonnelles.emprunteur.prospect_id;
      console.log("creating new coemp", coemp_in);
      axiosInstance
        .post("coemps/create", coemp_in)
        .then((response) => {
          toast({
            title: `Co_Emprunteur créée avec succès`,
            status: "success",
            isClosable: true,
            duration: 1500,
          });
        })
        .catch((error) => {
          toast({
            title: `Co_emprunteur créée avec succès`,
            status: error,
            isClosable: true,
            duration: 1500,
          });
        });
    }
    if (
      donneesPersonnelles.emprunteur.has_coemp === "true" &&
      donneesPersonnelles.emprunteur.coemp_id != null
    ) {
      const coemp_in = donneesPersonnelles.co_emprunteur;
      console.log("updating coemp", coemp_in);
      axiosInstance
        .post("coemps/record", coemp_in)
        .then((response) => {
          toast({
            title: `Co_Emprunteur mis a jour avec succès`,
            status: "success",
            isClosable: true,
            duration: 1500,
          });
        })
        .catch((error) => {
          toast({
            title: `Co_emprunteur non mis à jours`,
            status: error,
            isClosable: true,
            duration: 1500,
          });
        });
    }
    const payLoad = { prospect: emp_in, credit: credit };
    axiosInstance
      .post("credits/record", payLoad)
      .then((response) => {
        toast({
          title: `Enregistrement mis à jour avec succès`,
          status: "success",
          isClosable: true,
          duration: 1500,
        });
      })
      .catch((error) => {
        toast({
          title: `Enregistrement non mis à jours`,
          status: error,
          isClosable: true,
          duration: 1500,
        });
      });
    setIsEditing(false);
  };

  const handleSubmit = () => {
    const form = document.getElementsByTagName("form");
    if (form[0].checkValidity() == true) {
      submit();
    } else {
      const item = form[0].querySelector(":invalid");
      item.focus({ focusVisible: true });
    }
  };

  const handleCancel = () => {
    console.log("cancelled");
    setDonneesPersonnelles(structuredClone(record));
    setDatembauche(structuredClone(recordDatEmbauche));
    setDateNaissance(structuredClone(recordDatenaissance));
    setIsEditing(false);
    console.log(donneesPersonnelles);
  };

  const handleChangeDateFormat = (credit) => {
    console.log(credit);
      const NewDate_envoi = [];
      credit["banque_envoye"].map((value, index) => {
        NewDate_envoi.push((new Date(value["date_envoi"])));
        
      });
      console.log(NewDate_envoi);
    setDatenvoi(NewDate_envoi);
  };

  const switchTabs = (index) => {
    const form = document.getElementsByTagName("form");
    if (form[0].checkValidity() == true) {
      setTabIndex(index);
    } else {
      const item = form[0].querySelector(":invalid");
      item.focus({ focusVisible: true });
    }
  };
  const handleClose = (status) => {
    setIsEditing(status);
    setReloadProspects(true);
    setPays({});
    setDonneesPersonnelles({});
  };

  const validate = (e) => {
    e.preventDefault();
    console.log("valid");
  };

  useEffect(() => {
    const initialize = async () => {
      axiosInstance.get(`/credits/record/${id}`).then((response) => {
        const newDonneesPersonnelles = {
          emprunteur: response.data.prospect,
          co_emprunteur: response.data.co_emp,
          credit: response.data.credit,
        };
        newDonneesPersonnelles.emprunteur.has_coemp = "false";
        const newDateNaissance = {};
        const newDateEmbauche = {};
        newDateNaissance["emprunteur"] = new Date(
          newDonneesPersonnelles.emprunteur.datenaissance
        );
        newDateEmbauche["emprunteur"] = new Date(
          newDonneesPersonnelles.emprunteur.datembauche
        );
        if (newDonneesPersonnelles.co_emprunteur != null) {
          setPays({
            ...Pays,
            co_emprunteur: newDonneesPersonnelles.co_emprunteur.adresse.pays,
          });
          newDonneesPersonnelles.emprunteur.has_coemp = "true";
          newDateNaissance["co_emprunteur"] = new Date(
            newDonneesPersonnelles.co_emprunteur.datenaissance
          );
          newDateEmbauche["co_emprunteur"] = new Date(
            newDonneesPersonnelles.co_emprunteur.datembauche
          );
          
        }
        const donneesBancaires = {
          renseignements_bancaires:
            response.data.prospect.renseignement_bancaires,
          engagements_bancaires:
            newDonneesPersonnelles.credit.engagement_bancaires,
        };
        setPays({
          ...Pays,
          emprunteur: newDonneesPersonnelles.emprunteur.adresse.pays,
          co_emprunteur: newDonneesPersonnelles.co_emprunteur?.adresse.pays,
        });
        console.log(newDonneesPersonnelles["credit"]);
        setDatembauche({ ...newDateEmbauche });
        setDateNaissance({ ...newDateNaissance });
        handleChangeDateFormat(newDonneesPersonnelles["credit"]);
        setDonneesPersonnelles({ ...newDonneesPersonnelles });
        setRecord(structuredClone(newDonneesPersonnelles));
        setRecordDatEmbauche(structuredClone(newDateEmbauche));
        setRecordDatenaissance(structuredClone(newDateNaissance));
      });
    };
    initialize();
  }, []);

  return (
    <>
      <Flex>
        <Spacer />
        <Stack direction="row" mb={6}>
          {isEditing ? (
            <>
              <Button
                colorScheme="green"
                variant="outline"
                onClick={() => handleSubmit()}
              >
                Soumettre
              </Button>
              <Button
                colorScheme="red"
                variant="outline"
                onClick={() => handleCancel()}
              >
                Annuler
              </Button>
            </>
          ) : (
            <>
              <Button
                colorScheme="blue"
                variant="outline"
                onClick={() => handleEdit(true)}
              >
                Modifier
              </Button>
              <Link onClick={() => handleClose(false)} to={return_link}>
                <Button colorScheme="red" variant="outline">
                  Fermer
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </Flex>
      <Tabs
        isFitted
        isLazy
        index={tabIndex}
        onChange={(index) => {
          switchTabs(index);
        }}
      >
        <TabList mb="1em">
          <Tab>Donnees Personnelles</Tab>
          <Tab>Donnees Bancaires</Tab>
          <Tab>Donnees Credit</Tab>
          <Tab>Choix Banque</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <form id="0" onSubmit={validate}>
              <ViewDonneesPersonnelles />
            </form>
          </TabPanel>
          <TabPanel>
            <form id="1" onSubmit={validate}>
              <ViewDonneesBancaires />
            </form>
          </TabPanel>
          <TabPanel>
            <form id="2" onSubmit={validate}>
              <ViewDonneesCredit />
            </form>
          </TabPanel>
          <TabPanel>
            <form id="3" onSubmit={validate}>
              <ViewDonneesEnvoyer />
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ViewProspect;
