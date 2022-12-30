import React, {useEffect, useState, useContext} from 'react'
import { Button, ButtonGroup, Stack, Flex, Heading,HStack,FormLabel,FormControl,Select } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { UpdateContext } from 'context/UpdateContext'
import ViewCaracteristicsCredit from './ViewCaracteristicsCredit'
import ViewObjetCredit from './ViewObjetCredit'
import { useColorMode } from "@chakra-ui/color-mode";


const ViewDonneesCredit = () =>{
    const { colorMode, toggleColorMode } = useColorMode();
    const { calculateMensualite, calculateQot} = useContext(UpdateContext)
    const {isEditing,donneesPersonnelles ,setDonneesPersonnelles} = useContext(UpdateContext)
    const handleAdresseChange = (event,index) => {
        var fieldName = event.target.getAttribute("name");
        var fieldValue = event.target.value;
        var adresse = donneesPersonnelles.credits[index]["adresse_bien"];
        adresse = { ...adresse, [fieldName]: fieldValue };
        const newRecord = { ...donneesPersonnelles };
        newRecord.credits[index]["adresse_bien"] = adresse;
        setDonneesPersonnelles(newRecord);
      };
    
      const consommation_data = {
        "objet_credit":null,
        "nature_bien":null,
        "etat_bien":null,
        "usage_bien":null,
        "montant_bien":null,
        "montant_acte":null,
        "montant_travaux":null,
        "montant_venal":null,
        "adresse_bien":{},
        "superficie":null,
        "titre_foncier":null,
        "garanties":null,
      }
      
      
      const handleCreditDataChange = (event, index) => {
        var fieldName = event.target.getAttribute("name");
        var fieldValue = event.target.value;
        var newFormCredit = donneesPersonnelles.credits[index]
        switch (fieldName) {
          case "montant":
            newFormCredit[fieldName] = fieldValue;
            var qot = calculateQot(newFormCredit);
            newFormCredit.qot_financement = qot;
            if (fieldValue !== "") {
              calculateMensualite(newFormCredit, index);
            }
            break;
          case "taux":
            newFormCredit[fieldName] = fieldValue;
            if (fieldValue !== "") {
              calculateMensualite(newFormCredit, index);
            }
            break;
          case "duree_credit":
            newFormCredit[fieldName] = fieldValue;
            if (fieldValue !== "") {
              calculateMensualite(newFormCredit, index);
            }
            break;
          case "montant_acte":
            newFormCredit[fieldName] = fieldValue;
            var qot = calculateQot(newFormCredit);
            newFormCredit.qot_financement = qot;
            break;
          default:
            newFormCredit[fieldName] = fieldValue;
            break;
        }
        if (fieldName == "promoteur" && fieldValue === "Non") {
          newFormCredit["promoteur_nom"] = ""
          newFormCredit[fieldName] = fieldValue;
        }

        if (fieldValue == "consommation") {
          newFormCredit = {
            ...newFormCredit,
            ...consommation_data
          };
          newFormCredit.qot_financement = "0.00";
          newFormCredit[fieldName] = fieldValue;
        }
        const newRecord = { ...donneesPersonnelles };
        newRecord.credits[index] = newFormCredit;
        setDonneesPersonnelles(newRecord);
        console.log(newRecord);
      };
    


    return(
        <>
        {donneesPersonnelles?.credits.map((credit,index)=>{
            console.log(credit);
           return(
            <Flex flexDir={"column"} justifyContent="space-around" alignContent={"space-between"}>
            <HStack alignItems="center" m={2} mb={4}>
            <FormLabel w="15%">Type de Crédit</FormLabel>
            <FormControl id="Prenom" isRequired w="20%">
                <Select 
                  name="type_credit"
                  defaultValue={credit["type_credit"]}
                  pointerEvents={isEditing? "":"none"}
                  onChange={(e)=>handleCreditDataChange(e, index)}
                placeholder='-Select-' size='sm'>
                    <option value="immobilier">Immobilier</option>
                    <option value="hypothecaire">Hypothécaire</option>
                    <option value="consommation">Consommation</option>
                </Select>
            </FormControl>
        </HStack>
               {(credit.type_credit == "immobilier" || credit.type_credit == "hypothecaire") && 
               <>
               <Flex  justifyContent="space-between" alignItems={"center"}>
               <Heading as="h5" size="sm"  mb={3} justifyContent="space-between" alignItems={"center"} p="2" bgColor={colorMode=='light'?"#efefef":""} w="100%">
                Objet du Crédit                
                </Heading>
               </Flex>
               
                <ViewObjetCredit credit={credit} index={index}
                 handleAdresseChange={handleAdresseChange}
                 handleCreditDataChange={handleCreditDataChange}/>
               </>
               }
            
            <Flex  justifyContent="space-between" alignItems={"center"}>
            <Heading as="h5" size="sm"  justifyContent="space-between" alignItems={"center"} p="2"mb="2" bgColor={colorMode=='light'?"#efefef":""} w="100%">
                Caractéristiques Du Crédit                
                </Heading>
               </Flex>
               
                <ViewCaracteristicsCredit credit={credit} index={index}
                handleCreditDataChange={handleCreditDataChange}/>
            </Flex>
           )
        })}
        </>)
}

export default ViewDonneesCredit