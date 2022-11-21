import React, {useContext, useEffect} from 'react'
import { 
    Flex, 
    FormLabel, 
    Heading,
    Select , 
    HStack, 
    FormControl, 
    Input,
    VStack ,
    Button
} from '@chakra-ui/react'
import { BiAddToQueue } from "react-icons/bi";
import { CreditContext } from 'context/CreditContext';
import ObjetCredit from './ObjetCredit'
import CaracteristicsCredit from './CaracteristicsCredit'
import { useColorMode } from '@chakra-ui/react';
const DonneesCredit = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const {credit, setCredit} = useContext(CreditContext)

  const handleCreditDataChange = (event)=>{
    event.preventDefault()
    var fieldName = event.target.getAttribute("name")
    var fieldValue = event.target.value
    var newFormCredit
    if (fieldValue == "consommation") {
      newFormCredit = {montant:"",
                      duree_credit:"",
                      frequence:"",
                      mensualite:"",
                      taux:"",
                      franchise:"",
                      taux_endt:"",
                      teg:"",
                      qot_financement:""}
    newFormCredit[fieldName] = fieldValue
    setCredit(newFormCredit)
    console.log(credit)
    }
    else{
      newFormCredit = { ...credit }
    newFormCredit[fieldName] = fieldValue
    setCredit(newFormCredit)
    console.log(credit)
    }
    
    
  }
useEffect(()=>{
  console.log(credit)
},[credit])
  
  return (
    <Flex flexDir={"column"} justifyContent="space-around" alignContent={"space-between"}>
        <HStack alignItems="center" m={2}>
            <FormLabel w="15%">Type de Crédit</FormLabel>
            <FormControl id="Prenom" isRequired w="20%">
                <Select 
                  name="type_credit"
                  onChange={handleCreditDataChange}
                  defaultValue={credit["type_credit"]}
                placeholder='-Select-' size='sm'>
                    <option value="immobilier">Immobilier</option>
                    <option value="hypothecaire">Hypothécaire</option>
                    <option value="consommation">Consommation</option>
                </Select>
            </FormControl>
        </HStack>
     {credit.type_credit == "consommation" || "hypothecaire" && 
      <>
       <Flex justifyContent="space-between" alignItems={"center"} px="2"mb="2" bgColor={colorMode=='light'?"#efefef":""} w="100%">
        <Heading as="h5" size="sm" >
            Objet du Crédit
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
      <ObjetCredit 
        handleCreditDataChange={handleCreditDataChange}
        />
      </>
     }
      <Flex justifyContent="space-between" alignItems={"center"}>
        <Heading as="h5" size="sm" p="2"mb="2" bgColor={colorMode=='light'?"#efefef":""} w="100%">
                Caractéristiques Du Crédit
        </Heading>
      </Flex>
      <CaracteristicsCredit 
        handleCreditDataChange={handleCreditDataChange}
        />

    </Flex>
  )
}

export default DonneesCredit