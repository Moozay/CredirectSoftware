import React, {useEffect, useState, useContext} from 'react'
import CoEmprunteur from './CoEmprunteur'
import Emprunteur from './Emprunteur';
import { CreditContext } from 'context/CreditContext'

import {
    Tab,
    TabList,
    Tabs,
    TabPanels,
    TabPanel,
    Heading,
    Flex
  } from "@chakra-ui/react";
import { ProspectContext } from 'context/ProspectsContext';
import { useColorMode } from '@chakra-ui/react';

const DonneesPersonnelles = ({tabIndex, setTabIndex}) => {
    const {donneesPersonelles, setDonneesPersonelles, resetForm} = useContext(CreditContext)
    const {prospects} = useContext(ProspectContext)
    const { colorMode, toggleColorMode } = useColorMode();
    const {hasCoEmprunteur, setHasCoEmprunteur} = useContext(CreditContext)

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

    const calculateParticipation = (data) =>{
      const newFormDonneesPersonelles = {...donneesPersonelles}
      var part_coEmp = ""
      if (data != "") {
        part_coEmp = 100 - parseFloat(data)
      } 
      newFormDonneesPersonelles.co_emprunteur.participation = String(part_coEmp)
      setDonneesPersonelles(newFormDonneesPersonelles)
    }  

    const handleDonnesPersonnellesChange = (event,section) => {
      
      var fieldName = event.target.getAttribute("name")
      
      var fieldValue = event.target.value
      if (fieldName == 'cin_sejour') {
        cin_sejourChecker(fieldValue)
      }
      if (fieldName == "participation" && section == "emprunteur") {
        calculateParticipation(fieldValue)
      }
      const newFormDonneesPersonelles = { ...donneesPersonelles }
        newFormDonneesPersonelles[section][fieldName] = fieldValue

      setDonneesPersonelles(newFormDonneesPersonelles)
    }
    useEffect(()=>{
      console.log(donneesPersonelles)
    },[donneesPersonelles])

  return (
    <Flex flexDir={"column"} justifyContent="space-around" >
      <Flex justifyContent="space-between" alignItems={"center"} m={3} p={1} bgColor={colorMode=='light'?"#efefef":""} w="100%">
      <Heading as="h5" size="sm" >
      Emprunteur Données
        </Heading>
      </Flex>
            <Emprunteur 
                hasCoEmprunteur={hasCoEmprunteur} 
                setHasCoEmprunteur={setHasCoEmprunteur}
                setTabIndex={setTabIndex}
                tabIndex={tabIndex}
                handleDonnesPersonnellesChange={handleDonnesPersonnellesChange}
                handleAdresseChange={handleAdresseChange}
                error={error}
            />
     {(hasCoEmprunteur === "true") &&
      <>
         <Flex justifyContent="space-between" alignItems={"center"} p={1} m={3} bgColor={colorMode=='light'?"#efefef":""} w="100%">
        <Heading as="h5" size="sm" >
        Co-Emprunteur Données
          </Heading>
      </Flex>
            <CoEmprunteur 
            handleDonnesPersonnellesChange={handleDonnesPersonnellesChange}
            hasCoEmprunteur={hasCoEmprunteur == 'true' ? true : false}
            handleAdresseChange={handleAdresseChange} />
      </>
     }
    </Flex>
  )
}

export default DonneesPersonnelles