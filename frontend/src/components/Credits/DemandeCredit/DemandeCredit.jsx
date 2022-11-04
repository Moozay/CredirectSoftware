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
      return response.data
  }
  const handleCreateCoemp = async (data) => {

  }

  const handleCreateCredit = async (data) => {
    const response = await axiosInstance.post("credits/create",data)
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
    const prospect = {...donneesPersonelles.emprunteur}
    Object.entries(donneesBancaires).map(([k, v]) => {
      prospect[k] = [v]
    })
    const coemp_id = prospect["hasCoEmprunteur"] == "true" ? uuidv4() : null
    
    if(coemp_id != null){
      const coemp_in = donneesPersonelles.co_emprunteur
      coemp_in["coemp_id"] = coemp_id
      coemp_in["prospect_id"] = prospect_id
      await axiosInstance.post("coemps/create",coemp_in)
    }
    const creditCreate = {...credit}
    creditCreate["credit_id"] = credit_id

    prospect["prospect_id"] = prospect_id
    prospect["coemp_id"] = coemp_id
    prospect["agent_id"] = agent_id
    prospect["credits"] = [creditCreate]
 
    // Create Credit Record
    creditCreate["prospect_id"] = prospect_id
    

    // Create DemandeCredit Record
    const demandeCredit = {}
    demandeCredit["prospect"] = prospect
    demandeCredit["credit"] = creditCreate

    // fill donnees bancaires
    // const coemp = {...donneesPersonelles.co_emprunteur}
    // const credit = {...credit}

   
    await handleCreateDemandeCredit(demandeCredit)
    toast({
      title: `Demande Created successfully`,
      status: "success",
      isClosable: true,
      duration: 1500
    })
    navigate('/dashboard/metrics', {replace: true, state: { from: location }})
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
      label: "Preview & Validation",
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
