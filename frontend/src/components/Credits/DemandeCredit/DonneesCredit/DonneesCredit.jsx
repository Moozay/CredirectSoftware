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
import { m } from 'framer-motion';
const DonneesCredit = (handlelick) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const {credit, setCredit} = useContext(CreditContext)
  const {donneesPersonelles, setDonneesPersonelles} = useContext(CreditContext)
  const handleCreditDataChange = (event)=>{
    var fieldName = event.target.getAttribute("name")
    var fieldValue = event.target.value
    var newFormCredit
    switch (fieldName) {
      case "montant":
        newFormCredit = { ...credit }
        newFormCredit[fieldName] = fieldValue
        var qot = calculateQot(newFormCredit)
        newFormCredit.qot_financement = qot
        calculateMensualite(newFormCredit)
        setCredit(newFormCredit)
        break;
      case "taux":
        newFormCredit = { ...credit }
        newFormCredit[fieldName] = fieldValue
        calculateMensualite(newFormCredit)
        break;
      case "taux":
        newFormCredit = { ...credit }
        newFormCredit[fieldName] = fieldValue
        calculateMensualite(newFormCredit)
        break;
      case "duree_credit":
        newFormCredit = { ...credit }
        newFormCredit[fieldName] = fieldValue
        calculateMensualite(newFormCredit)
        break;
      case "montant_acte":
        newFormCredit = { ...credit }
        newFormCredit[fieldName] = fieldValue
        var qot = calculateQot(newFormCredit)
        newFormCredit.qot_financement = qot
        setCredit(newFormCredit)
        console.log(credit)
        break;
      default:
        newFormCredit = { ...credit }
        newFormCredit[fieldName] = fieldValue
        setCredit(newFormCredit)
        console.log(credit)
        break;
    }
    if (fieldValue == "consommation") {
      newFormCredit = {
        montant : credit.montant,
        duree_credit : credit.duree_credit,
        frequence : credit.frequence,
        taux : credit.taux,
        mensualite : credit.mensualite,
        franchise:credit.franchise,
        taux_endt : credit.taux_endt,
        teg : credit.teg
      }
    newFormCredit.qot_financement = '0.00'
    newFormCredit[fieldName] = fieldValue
    setCredit(newFormCredit)
    console.log(credit)
    }
  }

  const changeStringToFloat = (str) =>{
    const str1 = str.replaceAll(" ","")
    const str2 = str1.replaceAll(",",".")
    return parseFloat(str2,10)
  }

  const calculateQot = (newFormCredit) =>{
    var montant = newFormCredit.montant
    var montant_acte = newFormCredit.montant_acte
    var qot = 0
    if (montant !== undefined && montant_acte !== undefined) {
      var montant = changeStringToFloat(newFormCredit.montant)
      var montant_acte = changeStringToFloat(newFormCredit.montant_acte)
      qot = (montant/montant_acte)*100
    }
    if (isNaN(qot)) {
      qot = 0
      console.log("invalid");
     }

    return qot.toFixed(2)
  }

  const calculateMensualite = (newFormCredit) =>{
    var montant = newFormCredit.montant
    var duree = newFormCredit.duree_credit
    var taux = newFormCredit.taux
    if ( montant !== undefined && duree !== undefined && taux !== undefined) {
     montant = changeStringToFloat(newFormCredit.montant)
     duree = changeStringToFloat(newFormCredit.duree_credit)
     taux = changeStringToFloat(newFormCredit.taux)
     var numerator = montant*((taux*1.1)/1200)
     var denumerator = 1-(1+(taux*1.1/1200))**(-duree)
     console.log(numerator, denumerator);
     var mensualite = numerator / denumerator
     newFormCredit.mensualite = mensualite.toFixed(2)
     var revenue = donneesPersonelles.emprunteur.revenue
     var taux_endt = calculateTauxEndt(mensualite, revenue)
     newFormCredit.taux_endt = taux_endt 
     if (isNaN(mensualite) || isNaN(duree)) {
      newFormCredit.mensualite = "0"
      newFormCredit.taux_endt = "0.00"
      console.log("invalid");
     }
    }
    setCredit(newFormCredit)
    console.log(credit)
    
  }

  const calculateTauxEndt = (mensualite, revenue) =>{
    var mensualite = mensualite
    var revenue = revenue
    var taux_endt = (mensualite/revenue)*100
    if (isNaN(taux_endt)) {
      taux_endt = 0
    }
    return taux_endt.toFixed(2)
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
     {(credit.type_credit == "immobilier" || credit.type_credit == "hypothecaire") && 
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