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

const DonneesPersonnelles = ({tabIndex, setTabIndex}) => {
    const {donneesPersonelles, setDonneesPersonelles, resetForm} = useContext(CreditContext)
    const [hasCoEmprunteur, setHasCoEmprunteur] = useState(donneesPersonelles["emprunteur"]["hasCoEmprunteur"])
    const handleTabsChange = (index) => {
        if(tabIndex == 0){
          setTabIndex(1)
        }else{
          setTabIndex(0)
        }
      }

    const handleDonnesPersonnellesChange = (event,section) => {
      
      var fieldName = event.target.getAttribute("name")
      
      var fieldValue = event.target.value
      
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
            />
          </TabPanel>
          <TabPanel >
            <CoEmprunteur 
            handleDonnesPersonnellesChange={handleDonnesPersonnellesChange}
            hasCoEmprunteur={hasCoEmprunteur == 'true' ? true : false} />
          </TabPanel>
        </TabPanels>
      </Tabs>
  )
}

export default DonneesPersonnelles