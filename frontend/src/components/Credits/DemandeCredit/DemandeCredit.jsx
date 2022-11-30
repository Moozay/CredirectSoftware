import React, {useContext, useState, useEffect} from 'react'

import Stepper from 'components/Credits/DemandeCredit/Stepper/Stepper'
import DonneesPersonnelles from './DonneesPersonnelles/DonneesPersonnelles'
import DonneesCredit from './DonneesCredit/DonneesCredit'
import DonneesBanquaires from './DonneesBancaires/DonneesBancaires'
import Validation from './Validation'
import { CreditContext } from 'context/CreditContext'
import {v4 as uuidv4} from 'uuid';
import axiosInstance from 'services/axios'
import { useToast } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'
const DemandeCredit = () => {

  const [ currentStep, setCurrentStep ] = useState(1)
  const { DemandeCredit, setDemandeCredit } = useContext(CreditContext)
  const { donneesPersonelles, setdonneesPersonelles } = useContext(CreditContext)
  const { donneesBancaires, setDonneesBancaires } = useContext(CreditContext)
  const { credit, setCredit } = useContext(CreditContext)
  var createdCredit
  var createdProspect

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

  const handleSubmit = async (event) => {
    event.preventDefault()
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
    if(coemp_id != null){
      const coemp_in = donneesPersonelles.co_emprunteur
      coemp_in["coemp_id"] = coemp_id
      coemp_in["prospect_id"] = prospect_id
      coemp_in["adresse"] = {
        "adresse1" : donneesPersonelles.co_emprunteur.adresse,
        "ville": donneesPersonelles.co_emprunteur.ville,
        "pays" : donneesPersonelles.co_emprunteur.pays
      }
      handleCreateCoemp(coemp_in)
    }
    const creditCreate = {...credit}
    creditCreate["credit_id"] = credit_id
    
    //fill prospect records
    prospect["prospect_id"] = prospect_id
    prospect["coemp_id"] = coemp_id
    prospect["agent_id"] = agent_id
    prospect["credits"] = [credit_id]
    prospect["adresse"] = {
      "adresse1" : donneesPersonelles.emprunteur.adresse,
      "ville": donneesPersonelles.emprunteur.ville,
      "pays" : donneesPersonelles.emprunteur.pays
    }
 
    // Create Credit Record
    creditCreate["prospect_id"] = prospect.prospect_id
    creditCreate["adresse_bien"] = {
      "adresse1" : credit.adresse,
      "ville": credit.ville,
      "pays" : credit.pays
    }
    handleCreateCredit(creditCreate)
   /*  // Create DemandeCredit Record
    const demandeCredit = {}
    demandeCredit["prospect"] = prospect
    demandeCredit["credit"] = creditCreate */


    // fill donnees bancaires
    // const coemp = {...donneesPersonelles.co_emprunteur}
    // const credit = {...credit}

    
    handleCreateProspect(prospect)
   
    //await handleCreateDemandeCredit(demandeCredit)
    toast({
      title: `Demande Created successfully`,
      status: "success",
      isClosable: true,
      duration: 1500
    })
    navigate('/dashboard/demandeCredit', {replace: true, state: { from: location }})
    window.location.reload(false)
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
      label: "résumé",
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
        return <DonneesPersonnelles/>
      case 2:
        return <DonneesBanquaires/>
      case 3:
        return <DonneesCredit/>
      case 4:
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
          />
  )
}

export default DemandeCredit
