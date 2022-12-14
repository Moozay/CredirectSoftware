import React, {useEffect, useState, useContext} from 'react'
import CoEmprunteur from './CoEmprunteur'
import Emprunteur from './Emprunteur';
import { CreditContext } from 'context/CreditContext'

import {
    Tab,
    TabList,
    Tabs,
    TabPanels,
    TabPanel
  } from "@chakra-ui/react";
import { ProspectContext } from 'context/ProspectsContext';

const DonneesPersonnelles = ({tabIndex, setTabIndex}) => {
    const {donneesPersonelles, setDonneesPersonelles, resetForm} = useContext(CreditContext)
    const {prospects} = useContext(ProspectContext)
    
    const [hasCoEmprunteur, setHasCoEmprunteur] = useState(donneesPersonelles["emprunteur"]["hasCoEmprunteur"])
    const handleTabsChange = (index) => {
        if(tabIndex == 0){
          setTabIndex(1)
        }else{
          setTabIndex(0)
        }
      }

      const [error, setError] = useState({
        status: false,
        msg: ''
      })

      const cin_sejourChecker = (cin_sejour) =>{
        const checkCin_sejour = obj => obj.cin_sejour === cin_sejour
        if (prospects.some(checkCin_sejour)) {
          setError({
            status: true,
            msg: 'existe déjà'
          })
        }
        else{
          setError({
            status: false,
            msg: ''
          })
        }
      }
      const handleAdresseChange = (event, section) =>{
        var fieldName = event.target.getAttribute("name")
        var fieldValue = event.target.value
        var adresse = donneesPersonelles[section]["adresse"]
        adresse = {...adresse, [fieldName]:fieldValue}
        const newFormDonneesPersonelles = { ...donneesPersonelles }
        newFormDonneesPersonelles[section]["adresse"] = adresse
        setDonneesPersonelles(newFormDonneesPersonelles)

      }

    const handleDonnesPersonnellesChange = (event,section) => {
      
      var fieldName = event.target.getAttribute("name")
      
      var fieldValue = event.target.value
      if (fieldName == 'cin_sejour') {
        cin_sejourChecker(fieldValue)
      }
      const newFormDonneesPersonelles = { ...donneesPersonelles }
        newFormDonneesPersonelles[section][fieldName] = fieldValue

      setDonneesPersonelles(newFormDonneesPersonelles)
    }
    useEffect(()=>{
      console.log(donneesPersonelles)
    },[donneesPersonelles])

  return (
    <Tabs  index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab>Emprunteur</Tab>
          <Tab isDisabled={hasCoEmprunteur == 'true' ? false : true}>Co-Emprunteur</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Emprunteur 
                hasCoEmprunteur={hasCoEmprunteur} 
                setHasCoEmprunteur={setHasCoEmprunteur}
                setTabIndex={setTabIndex}
                tabIndex={tabIndex}
                handleDonnesPersonnellesChange={handleDonnesPersonnellesChange}
                handleAdresseChange={handleAdresseChange}
                error={error}
            />
          </TabPanel>
          <TabPanel >
            <CoEmprunteur 
            handleDonnesPersonnellesChange={handleDonnesPersonnellesChange}
            hasCoEmprunteur={hasCoEmprunteur == 'true' ? true : false}
            handleAdresseChange={handleAdresseChange} />
          </TabPanel>
        </TabPanels>
      </Tabs>
  )
}

export default DonneesPersonnelles