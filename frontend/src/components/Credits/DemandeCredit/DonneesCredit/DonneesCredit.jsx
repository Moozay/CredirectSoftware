import React, { useContext, useEffect } from "react";
import {
  Flex,
  FormLabel,
  Heading,
  Select,
  HStack,
  FormControl,
  Input,
  VStack,
  Button,
} from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";
import { CreditContext } from "context/CreditContext";
import ObjetCredit from "./ObjetCredit";
import CaracteristicsCredit from "./CaracteristicsCredit";
import { useColorMode } from "@chakra-ui/react";
import { m } from "framer-motion";
const DonneesCredit = (handlelick) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { credit, setCredit, hasCoEmprunteur } = useContext(CreditContext);
  const { donneesPersonelles, changeStringToFloat, calculateTeg } =
    useContext(CreditContext);
  
  const {calculateMensualite, calculateQot} = useContext(CreditContext)

  const handleAdresseChange = (event) => {
    var fieldName = event.target.getAttribute("name");
    var fieldValue = event.target.value;
    var adresse = credit["adresse_bien"];
    adresse = { ...adresse, [fieldName]: fieldValue };
    const newFormCredit = { ...credit };
    newFormCredit["adresse_bien"] = adresse;
    setCredit(newFormCredit);
  };

  const handleCreditDataChange = (event) => {
    var fieldName = event.target.getAttribute("name");
    var fieldValue = event.target.value;
    var newFormCredit = { ...credit }
    switch (fieldName) {
      case "montant":
        newFormCredit[fieldName] = fieldValue;
        var qot = calculateQot(newFormCredit);
        newFormCredit.qot_financement = qot;
        setCredit(newFormCredit);
        if (fieldValue !== "") {
          calculateMensualite(newFormCredit);
        }
        break;
      case "taux":
        newFormCredit[fieldName] = fieldValue;
        setCredit(newFormCredit);
        if (fieldValue !== "") {
          calculateMensualite(newFormCredit);
        }
        break;
      case "duree_credit":
        newFormCredit[fieldName] = fieldValue;
        setCredit(newFormCredit);
        if (fieldValue !== "") {
          calculateMensualite(newFormCredit);
        }
        break;
      case "montant_acte":
        newFormCredit[fieldName] = fieldValue;
        var qot = calculateQot(newFormCredit);
        newFormCredit.qot_financement = qot;
        setCredit(newFormCredit);
        console.log(credit);
        break;
      default:
        newFormCredit[fieldName] = fieldValue;
        setCredit(newFormCredit);
        console.log(credit);
        break;
    }
    if (fieldValue == "consommation") {
      newFormCredit = {
        montant: credit.montant,
        duree_credit: credit.duree_credit,
        frequence: credit.frequence,
        taux: credit.taux,
        mensualite: credit.mensualite,
        franchise: credit.franchise,
        taux_endt: credit.taux_endt,
        teg: credit.teg,
        commentaires: credit.commentaires,
      };
      newFormCredit.qot_financement = "0.00";
      newFormCredit[fieldName] = fieldValue;
      setCredit(newFormCredit);
      console.log(credit);
    }
  };

 
  useEffect(() => {
    console.log(credit);
  }, [credit]);

  return (
    <Flex
      flexDir={"column"}
      justifyContent="space-around"
      alignContent={"space-between"}
    >
      <HStack alignItems="center" m={2}>
        <FormLabel w="15%">Type de Crédit</FormLabel>
        <FormControl id="Prenom" isRequired w="20%">
          <Select
            name="type_credit"
            onChange={handleCreditDataChange}
            defaultValue={credit["type_credit"]}
            placeholder="-Select-"
            size="sm"
          >
            <option value="immobilier">Immobilier</option>
            <option value="hypothecaire">Hypothécaire</option>
            <option value="consommation">Consommation</option>
          </Select>
        </FormControl>
      </HStack>
      {(credit.type_credit == "immobilier" ||
        credit.type_credit == "hypothecaire") && (
        <>
          <Flex
            justifyContent="space-between"
            alignItems={"center"}
            px="2"
            mb="2"
            bgColor={colorMode == "light" ? "#efefef" : ""}
            w="100%"
          >
            <Heading as="h5" size="sm">
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
            handleAdresseChange={handleAdresseChange}
          />
        </>
      )}
      <Flex justifyContent="space-between" alignItems={"center"}>
        <Heading
          as="h5"
          size="sm"
          p="2"
          mb="2"
          bgColor={colorMode == "light" ? "#efefef" : ""}
          w="100%"
        >
          Caractéristiques Du Crédit
        </Heading>
      </Flex>
      <CaracteristicsCredit handleCreditDataChange={handleCreditDataChange} />
    </Flex>
  );
};

export default DonneesCredit;
