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
import {v4 as uuidv4} from 'uuid';
import { useToast } from '@chakra-ui/react'
import { UpdateContext } from "context/UpdateContext";
import { ProspectContext } from "context/ProspectsContext";

const ViewProspect = () => {
  const toast = useToast()
  const { setReloadProspects } = useContext(ProspectContext)
  const [tabIndex, setTabIndex] = useState(0)
  const {
    isEditing,
    setIsEditing,
    donneesPersonnelles,
    setDonneesPersonnelles,
    setDonneesBancaires,
  } = useContext(UpdateContext);
  const { datembauche, datenaissance, setDateNaissance, setDatembauche } =
    useContext(UpdateContext);
  const location = useLocation();
  const id = location.state.id;

  const handleEdit = (status) => {
    setIsEditing(status);
  };

  const submit = () =>{
    const emp_in = {...donneesPersonnelles.emprunteur}
    const credits_in = donneesPersonnelles.credits
    delete emp_in.has_coemp
    if (donneesPersonnelles.emprunteur.has_coemp === "true" && donneesPersonnelles.emprunteur.coemp_id === null) {
      const coemp_id = uuidv4()
      const coemp_in = donneesPersonnelles.co_emprunteur
      coemp_in.coemp_id = coemp_id
      emp_in.coemp_id = coemp_id
      coemp_in.prospect_id = donneesPersonnelles.emprunteur.prospect_id
      console.log("creating new coemp", coemp_in);
      axiosInstance.post("coemps/create",coemp_in)
        .then((response)=>{
          toast({
            title: `Co_Emprunteur créée avec succès`,
            status: "success",
            isClosable: true,
            duration: 1500
          })
        })
        .catch((error)=>{
          toast({
            title: `Co_emprunteur créée avec succès`,
            status: error,
            isClosable: true,
            duration: 1500
          })
        })
    }
    if (donneesPersonnelles.emprunteur.has_coemp === "true" && donneesPersonnelles.emprunteur.coemp_id != null) {
      const coemp_in = donneesPersonnelles.co_emprunteur
      console.log("updating coemp", coemp_in);
      axiosInstance.post("coemps/record",coemp_in)
        .then((response)=>{
          toast({
            title: `Co_Emprunteur mis a jour avec succès`,
            status: "success",
            isClosable: true,
            duration: 1500
          })
        })
        .catch((error)=>{
          toast({
            title: `Co_emprunteur non mis à jours`,
            status: error,
            isClosable: true,
            duration: 1500
          })
        })
    }
    const payLoad = {"prospect":emp_in, "credits":credits_in}
    axiosInstance.post("credits/record",payLoad)
        .then((response)=>{
          toast({
            title: `Enregistrement mis à jour avec succès`,
            status: "success",
            isClosable: true,
            duration: 1500
          })
        })
        .catch((error)=>{
          toast({
            title: `Enregistrement non mis à jours`,
            status: error,
            isClosable: true,
            duration: 1500
          })
        })
        setIsEditing(false)
  }


  const handleSubmit=()=>{
    const form = document.getElementsByTagName("form")
    if (form[0].checkValidity() == true) {
      submit()
    }else{
      const item = form[0].querySelector(':invalid')
      item.focus({focusVisible: true})
    }
  }

  const handleCancel = () =>{
    const form = document.getElementsByTagName("form")
    if (form[0].checkValidity() == true) {
      setIsEditing(false)
    }else{
      const item = form[0].querySelector(':invalid')
      item.focus({focusVisible: true})
    }
  }

  const switchTabs = (index) =>{
    const form = document.getElementsByTagName("form")
    if (form[0].checkValidity() == true) {
      setTabIndex(index)
    }else{
      const item = form[0].querySelector(':invalid')
      item.focus({focusVisible: true})
    }
    
  }
  const handleClose = (status) => {
    setIsEditing(status);
    setReloadProspects(true)
    setDonneesPersonnelles({});
  };

  const validate = (e) => {
    e.preventDefault()
    console.log("valid");
  }

  useEffect(() => {
    const initialize = async () => {
      axiosInstance.get(`/credits/record/${id}`).then((response) => {
        const newDonneesPersonnelles = {
          emprunteur: response.data.prospect,
          co_emprunteur: response.data.co_emp,
          credits: response.data.credits,
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
            newDonneesPersonnelles.emprunteur.engagement_bancaires,
        };
        console.log(newDonneesPersonnelles);
        setDatembauche(newDateEmbauche);
        setDateNaissance(newDateNaissance);
        setDonneesPersonnelles(newDonneesPersonnelles);
        setDonneesBancaires(donneesBancaires);
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
              <Link
                onClick={() => handleClose(false)}
                to="/dashboard/prospects"
              >
                <Button colorScheme="red" variant="outline">
                  Fermer
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </Flex>
      <Tabs isFitted isLazy index={tabIndex} onChange={(index)=>{
        switchTabs(index)
      }}>
        <TabList mb="1em">
          <Tab>Donnees Personnelles</Tab>
          <Tab>Donnees Bancaires</Tab>
          <Tab>Donnees Credit</Tab>
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
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ViewProspect;
