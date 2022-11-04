import React, { useContext } from "react";

import { Flex, Heading, Button } from "@chakra-ui/react";

import { BiAddToQueue } from "react-icons/bi";

import EngagementsBancaires from "./EngagementsBancaires";
import RenseignementsBancaires from "./RenseignementsBancaires";

import { CreditContext } from 'context/CreditContext'

const DonneesBanquaires = () => {
  const { donneesBancaires, setDonneesBancaires } = useContext(CreditContext)

  const handleDonneesBancairesChange = (event,section) => {
      event.preventDefault()
      
    var fieldName = event.target.getAttribute("name")
    var fieldValue = event.target.value
    
    const newFormDonnesBancaires = { ...donneesBancaires }

    newFormDonnesBancaires[section][fieldName] = fieldValue

    setDonneesBancaires(newFormDonnesBancaires)
    console.log(donneesBancaires)
  }

  return (
    <Flex
      flexDir={"column"}
      justifyContent="space-around"
      alignContent={"space-between"}
    >
      <Flex justifyContent="space-between" alignItems={"center"}>
        <Heading as="h5" size="sm" my={3}>
          Renseignements Bancaires
        </Heading>
        <Button
          leftIcon={<BiAddToQueue />}
          color={"#ff7659"}
          variant="outline"
          size="sm"
          border={"none"}
        >
          Add New
        </Button>
      </Flex>

      <RenseignementsBancaires 
        handleDonneesBancairesChange={handleDonneesBancairesChange}
        />

      <Flex justifyContent="space-between" alignItems={"center"}>
        <Heading as="h5" size="sm" my={3}>
          Engagements Bancaires
        </Heading>
        <Button
          leftIcon={<BiAddToQueue />}
          color={"#ff7659"}
          variant="outline"
          size="sm"
          border={"none"}
        >
          Add New
        </Button>
      </Flex>
      <EngagementsBancaires 
        handleDonneesBancairesChange={handleDonneesBancairesChange}
        />
    </Flex>
  );
};

export default DonneesBanquaires;
