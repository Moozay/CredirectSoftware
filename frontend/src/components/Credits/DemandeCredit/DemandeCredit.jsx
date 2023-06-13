import React, {useContext, useState, useEffect} from 'react'

import Stepper from 'components/Credits/DemandeCredit/Stepper/Stepper'
import DonneesPersonnelles from './DonneesPersonnelles/DonneesPersonnelles'
import DonneesCredit from './DonneesCredit/DonneesCredit'
import DonneesEnvoyer from './DonneesEnvoyer/DonneesEnvoyer'
import DonneesBanquaires from './DonneesBancaires/DonneesBancaires'
import Validation from './Validation'
import { CreditContext } from 'context/CreditContext'
import { DemandeContext } from 'context/DemandeContext'
import {v4 as uuidv4} from 'uuid';
import axiosInstance from 'services/axios'
import { useToast } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ProspectContext } from 'context/ProspectsContext'
const DemandeCredit = () => {

  const [ currentStep, setCurrentStep ] = useState(1)
  const [tabIndex, setTabIndex] = useState(0)
  const { DemandeCredit, setDemandeCredit } = useContext(CreditContext)
  const { donneesPersonelles, setdonneesPersonelles } = useContext(CreditContext)
  const { donneesBancaires, setDonneesBancaires } = useContext(CreditContext)
  const { credit, setCredit, banquEnvoye } = useContext(CreditContext)
  const { existingRecord, setExistingRecord } = useContext(CreditContext)
  const { resetForm } = useContext(CreditContext)
  const { setReloadDemandes } = useContext(DemandeContext)
  const { setReloadProspects } = useContext(ProspectContext)
  var createdCredit
  var createdProspect = false

  const toast = useToast()
  const navigate = useNavigate()
    const location = useLocation()

  const EmprunteurValidator = () => {

  }
  const CoEmprunteurValidator = () => {

  }
  const RenseignementsBancairesValidator = () => {

  }

  const CreditValidator = () => {

  }

  const getUserId = async () => {
    const response = await axiosInstance.get("/users/me")
    return response.data.user_id
  }
  const handleCreateProspect = async (data) => {
      const response = await axiosInstance.post("prospects/create",data)
      createdProspect = response.data
      return response.data
      
  }
  const handleCreateCoemp = async (data) => {
    await axiosInstance.post("coemps/create",data)
  }

  const handleCreateCredit = async (data) => {
    console.log(data.prospect_id);
    const response = await axiosInstance.post("credits/create",data)
    createdCredit = response.data
    return response.data
  }

  const handleCreateDemandeCredit = async (data) => {
    const response = await axiosInstance.post("credits/demandeCredit",data)
  }

  const test = (event)=>{
    const prospect = {...donneesPersonelles.emprunteur,...donneesBancaires}
    console.log(prospect["revenue"]);

  }
  const addCredit = async(event) =>{
    event.preventDefault()
    const credit_id = uuidv4()
    const coemp_id = donneesPersonelles.emprunteur["hasCoEmprunteur"] == "true" ? uuidv4() : null

    //create coemp record
    if(coemp_id != null){
      const coemp_in = donneesPersonelles.co_emprunteur
      coemp_in["coemp_id"] = coemp_id
      coemp_in["prospect_id"] = existingRecord["prospect_id"]
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
          title: `Co_emprunteur not created`,
          status: error,
          isClosable: true,
          duration: 1500
        })
      })
    }
    // Create Credit Record
    const creditCreate = {...credit}
    creditCreate["prospect_id"] = existingRecord["prospect_id"]
    creditCreate["credit_id"] = credit_id
    creditCreate["banque_envoye"] = banquEnvoye
    creditCreate["coemp"] = coemp_id === null ? null:[coemp_id]
    creditCreate["engagements_bancaires"] = donneesBancaires["engagements_bancaires"]

    axiosInstance.post("credits/add_credit",creditCreate)
      .then((response)=>{
        toast({
          title: `Demande créée avec succès`,
          status: "success",
          isClosable: true,
          duration: 1500
        })
      })
    .catch((error)=>{
      toast({
        title: "Credit not created",
        status: "error",
        isClosable: true,
        duration: 1500
      })
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (existingRecord["existing"] === true) {
      addCredit(event)
    }
    else{
      createCredit(event)
    }
    setReloadProspects(true)
    setReloadDemandes(true)
    setCurrentStep(1)
    resetForm()
  }


  const createCredit = async (event) => {
    event.preventDefault()
    if (existingRecord["exisit"]) {
      
    }
    const prospect_id =  uuidv4();
    const credit_id = uuidv4()
    const agent_id = await getUserId() 

    // Create Prospect record 
    const prospect = {...donneesPersonelles.emprunteur,...donneesBancaires}
    /* Object.entries(donneesBancaires).map(([k, v]) => {
      prospect[k] = [v]
    }) */
    const coemp_id = prospect["hasCoEmprunteur"] == "true" ? uuidv4() : null
    //create Coemp record
/*     if(coemp_id != null){
      const coemp_in = donneesPersonelles.co_emprunteur
      coemp_in["coemp_id"] = coemp_id
      coemp_in["prospect_id"] = prospect_id
      handleCreateCoemp(coemp_in)
    } */
     // Create Credit Record
    const creditCreate = {...credit}
    creditCreate["prospect_id"] = prospect_id
    creditCreate["credit_id"] = credit_id
    creditCreate["banque_envoye"] = banquEnvoye
    creditCreate["coemp"] = coemp_id === null ? null:[coemp_id]
    creditCreate["engagements_bancaires"] = donneesBancaires["engagements_bancaires"]
    creditCreate['agent_id'] = agent_id
    console.log(prospect["revenue"]);

    
    //fill prospect records
    prospect["prospect_id"] = prospect_id
    prospect["coemp_id"] = coemp_id
    prospect["agent_id"] = agent_id
    prospect["credits"] = [credit_id]
   
   /*  // Create DemandeCredit Record
    const demandeCredit = {}
    demandeCredit["prospect"] = prospect
    demandeCredit["credit"] = creditCreate */


    // fill donnees bancaires
    // const coemp = {...donneesPersonelles.co_emprunteur}
    // const credit = {...credit}

    //posting data
    //prospect
    axiosInstance.post("prospects/create",prospect)
    .then((response)=>{
      toast({
        title: `Prospect créée avec succès`,
        status: "success",
        isClosable: true,
        duration: 1500
      })
      if(coemp_id != null){
        const coemp_in = donneesPersonelles.co_emprunteur
        coemp_in["coemp_id"] = coemp_id
        coemp_in["prospect_id"] = prospect_id
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
            title: `Co_emprunteur not created`,
            status: error,
            isClosable: true,
            duration: 1500
          })
        })
      }
      axiosInstance.post("credits/create",creditCreate)
      .then((response)=>{
        toast({
          title: `Demande créée avec succès`,
          status: "success",
          isClosable: true,
          duration: 1500
        })
      })
    })
    .catch((error)=>{
      toast({
        title: "Prospect not created",
        description: error.response.data.detail,
        status: "error",
        isClosable: true,
        duration: 1500
      })
    })

  }

  const steps = [
    {
      label: "Données personelles",
      name: "Emprunteur & Co-Emprunteur",
      content: <DonneesPersonnelles />,
      validator: EmprunteurValidator,
    },
    {
      label: "Données Bancaires",
      name: "Renseignements & Engagements Bancaires ",
      content: <DonneesBanquaires/>,
      validator: CreditValidator
    },{
      label: "Crédit",
      name: "Caracteristiques, Objet & Demande du Crédit",
      content: <DonneesCredit/>,
      validator: RenseignementsBancairesValidator,
      
    },
    {
      label: "Traitement Dossier",
      name: "Choix Banque",
      content: <DonneesCredit/>,
      validator: RenseignementsBancairesValidator,
      
    },
    {
      label: "Résumé",
      name: "Validation",
      content: <>Text </>
    }
  ]

  const handleClick = (direction) => {
    
    let newStep = currentStep
     
    direction === "next" ? newStep++ : newStep--

    //check if steps are within bounds
    newStep > 0 &&  newStep <= steps.length && setCurrentStep(newStep)
  }


  const displayStep = (step) =>{
    switch(step){
      case 1:
        return <DonneesPersonnelles tabIndex={tabIndex} setTabIndex={setTabIndex}/>
      case 2:
        return <DonneesBanquaires/>
      case 3:
        return <DonneesCredit/>
      case 4:
        return <DonneesEnvoyer/>
      case 5:
        return <Validation/>
    }
  }
  useEffect(()=>{

  },[])

  return (
          <Stepper
            steps={steps}
            currentStep={currentStep}
            handleClick={handleClick}
            displayStep={displayStep}
            handleSubmit={handleSubmit}
            tabIndex={tabIndex} 
            setTabIndex={setTabIndex}
            setCurrentStep={setCurrentStep}
          />
  )
}

export default DemandeCredit
