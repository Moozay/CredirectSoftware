import React, { useContext, useState } from "react";

import { BiAddToQueue } from "react-icons/bi";

import {
  Radio,
  Stack,
  Flex,
  HStack,
  FormLabel,
  Input,
  FormControl,
  Code,
  InputGroup,
  InputRightAddon,
  Select,
  useColorMode,
  Button,
  RadioGroup,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import CurrencyFormat from "react-currency-format";
import { CreditContext } from "context/CreditContext";
import { UpdateContext } from "context/UpdateContext";
import Index from "components/Index";
const ViewEngagements  = ({ handleEngChange, isEditing }) => {
  const {organismes } = useContext(CreditContext);
  const [section, setSection] = useState("engagements_bancaires");
  const {donneesPersonnelles,calculateTeg,setDonneesPersonnelles} = useContext(UpdateContext)




  const addField = () => {
    let newField = {
      nom: "",
      prenom: "",
      nature_credit: "",
      organisme: "",
      echeance: "",
      encours: "",
      duree: "",
      rat: ""
    };
    const data = [...donneesPersonnelles.emprunteur.engagements_bancaires, newField]
    handleEngChange(data)
  };

  const handleFormChange = (index, event) => {
    let data = [...donneesPersonnelles.emprunteur.engagements_bancaires];
    data[index][event.target.name] = event.target.value;
    handleEngChange(data);
    if (event.target.name == "echeance" || event.target.name == "rat") {
      const newRecord  = [...donneesPersonnelles.credits]
      for (let index = 0; index < newRecord.length; index++) {
        newRecord[index].teg = calculateTeg(newRecord[index].mensualite,data)
      }
      setDonneesPersonnelles({
        ...donneesPersonnelles,
        "credits" :newRecord
      })
    }
  }

  const removeField = (index) => {
    let data = [...donneesPersonnelles.emprunteur.engagements_bancaires];
    data.splice(index, 1);
    handleEngChange(data);
    var credits = [...donneesPersonnelles.credits]
    for (let index = 0; index < credits.length; index++) {
      credits[index].teg = calculateTeg(credits[index].mensualite,data)
    }
    console.log("removed", index, data);
  };
  const { colorMode } = useColorMode();
  return (
    <>
      <Button
        leftIcon={<BiAddToQueue />}
        color={"#ff7659"}
        variant="outline"
        size="sm"
        border={"none"}
        onClick={addField}
        mt={4}
        w="100%"
        disabled={!isEditing}
      >
        Add New
      </Button>
      <HStack direction="row" justifyContent={"space-between"} my={2}>
        <Code
          bgColor={colorMode == "light" ? "#efefef" : ""}
          children="Bénéficiare"
          p={1}
          w="100%"
          textAlign={"center"}
        />
        <Code
          bgColor={colorMode == "light" ? "#efefef" : ""}
          children="Nature Crédit"
          p={1}
          w="48%"
          textAlign={"center"}
        />
        <Code
          bgColor={colorMode == "light" ? "#efefef" : ""}
          children="Organisme"
          p={1}
          w="48%"
          textAlign={"center"}
        />
        <Code
          bgColor={colorMode == "light" ? "#efefef" : ""}
          children="Echéance"
          p={1}
          w="48%"
          textAlign={"center"}
        />
        <Code
          bgColor={colorMode == "light" ? "#efefef" : ""}
          children="Encours"
          p={1}
          w="48%"
          textAlign={"center"}
        />
        <Code
          bgColor={colorMode == "light" ? "#efefef" : ""}
          children="Durée"
          p={1}
          w="48%"
          textAlign={"center"}
        />
        <Code
          bgColor={colorMode == "light" ? "#efefef" : ""}
          children="RAT"
          p={1}
          w="50%"
          textAlign={"center"}
        />
        <Code
          bgColor={colorMode == "light" ? "#efefef" : ""}
          children="Action"
          p={1}
          w="48%"
          textAlign={"center"}
        />
      </HStack>
      {donneesPersonnelles.emprunteur.engagements_bancaires.map((input, index) => {
        return (
          <HStack
            alignItems={"flex-start"}
            my={6}
            key={index}
            direction="row"
            justifyContent={"space-between"}
          >
            <FormControl isRequired variant="floating">
              <FormLabel
                fontSize={"sm"}
                fontWeight="normal"
                transform={input.nom ? "scale(0.85) translateY(-30px)" : ""}
              >
                Nom
              </FormLabel>
              <Input
                size="sm"
                name="nom"
                _placeholder={{ color: "gray.500" }}
                value={input.nom}
                isReadOnly={!isEditing}
                type="text"
                onChange={(e) => handleFormChange(index, e)}
              />
            </FormControl>
            <FormControl isRequired variant="floating">
              <FormLabel
                fontSize={"sm"}
                fontWeight="normal"
                transform={input.prenom ? "scale(0.85) translateY(-30px)" : ""}
              >
                Prénom
              </FormLabel>
              <Input
                size="sm"
                value={input.prenom}
                _placeholder={{ color: "gray.500" }}
                name="prenom"
                type="text"
                isReadOnly={!isEditing}
                onChange={(e) => handleFormChange(index, e)}
              />
            </FormControl>
            <FormControl isRequired>
              <Select
                placeholder="-Select-"
                size="sm"
                name="nature_credit"
                value={input.nature_credit}
                pointerEvents={isEditing? "":"none"}
                textAlign="center"
                onChange={(e) => handleFormChange(index, e)}

              >
                <option value="immobilier">Immobilier</option>
                <option value="hypothecaire">Hypothécaire</option>
                <option value="consommation">Consommation</option>
              </Select>
            </FormControl>
            <FormControl isRequired variant="floating">
            <Select
                placeholder="-Select-"
                size="sm"
                name="organisme"
                value={input.organisme}
                textAlign="center"
                pointerEvents={isEditing? "":"none"}
                onChange={(e) => handleFormChange(index, e)}
              >
                {organismes.map((organisme,index)=>
                <option value={organisme} key={index}>{organisme}</option>
                )}
              </Select>
            </FormControl>
            <FormControl isRequired>
              <InputGroup size="sm">
                <CurrencyFormat
                  customInput={Input}
                  decimalSeparator=","
                  thousandSeparator=" "
                  decimalScale={2}
                  isReadOnly={!isEditing}
                  fixedDecimalScale={true}
                  name="echeance"
                  value={input.echeance}
                  placeholder="# ### ###.##"
                  onChange={(e) => handleFormChange(index, e)}
                />
                <InputRightAddon children="د.م" />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup size="sm">
                <CurrencyFormat
                  customInput={Input}
                  isReadOnly={!isEditing}
                  decimalSeparator=","
                  thousandSeparator=" "
                  decimalScale={2}
                  fixedDecimalScale={true}
                  name="encours"
                  value={input.encours}
                  placeholder="# ### ###.##"
                  onChange={(e) => handleFormChange(index, e)}
                />
                <InputRightAddon children="د.م" />
              </InputGroup>
            </FormControl>
            <FormControl isRequired variant="floating">
              <Input
                name="duree"
                isReadOnly={!isEditing}
                size="sm"
                value={input.duree}
                _placeholder={{ color: "gray.500" }}
                type="text"
                onChange={(e) => handleFormChange(index, e)}
              />
            </FormControl>
            <FormControl isRequired  my={3}>
            <Select
                placeholder="-Select-"
                size="sm"
                name="rat"
                value={input.rat}
                pointerEvents={isEditing? "":"none"}
                textAlign="center"
                onChange={(e) => handleFormChange(index, e)}
              >
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </Select>
            </FormControl>
            <FormControl variant="floating">
              <Button
                leftIcon={<DeleteIcon />}
                color={"#ff7659"}
                variant="outline"
                size="sm"
                border={"none"}
                disabled={!isEditing}
                onClick={() => removeField(index)}
              >
                Supprime
              </Button>
            </FormControl>
          </HStack>
        );
      })}
    </>
  );
};

export default ViewEngagements ;
