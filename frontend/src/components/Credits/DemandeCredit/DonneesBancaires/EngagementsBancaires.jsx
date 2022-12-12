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
import Index from "components/Index";
const EngagementsBancaires = ({ handleEngChange }) => {
  const { donneesBancaires, organismes, calculateTeg, credit, setCredit } = useContext(CreditContext);
  const [section, setSection] = useState("engagements_bancaires");
  const [inputField, setInputField] = useState([
    {
      nom: "",
      prenom: "",
      nature_credit: "",
      organisme: "",
      echeance: "",
      encours: "",
      duree: "",
    },
  ]);

  const handleFormChange = (index, event) => {
    let data = [...donneesBancaires.engagements_bancaires];
    data[index][event.target.name] = event.target.value;
    handleEngChange(data);
    if (event.target.name == "echeance" || event.target.name == "rat") {
      var newFormCredit = {...credit}
      newFormCredit.teg = calculateTeg(newFormCredit)
      setCredit(newFormCredit)
    }
  };


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
    handleEngChange([...donneesBancaires.engagements_bancaires, newField]);
  };

  const removeField = (index) => {
    let data = [...donneesBancaires.engagements_bancaires];
    data.splice(index, 1);
    handleEngChange(data);
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
      {donneesBancaires.engagements_bancaires.map((input, index) => {
        return (
          <HStack
            alignItems={"flex-start"}
            my={4}
            key={index}
            direction="row"
            justifyContent={"space-between"}
          >
            <FormControl isRequired variant="floating">
              <FormLabel
                fontSize={"sm"}
                fontWeight="normal"
                transform={input.nom ? "scale(0.85) translateY(-35px)" : ""}
              >
                Nom
              </FormLabel>
              <Input
                size="sm"
                name="nom"
                _placeholder={{ color: "gray.500" }}
                onChange={(e) => handleFormChange(index, e)}
                value={input.nom}
                type="text"
              />
            </FormControl>
            <FormControl isRequired variant="floating">
              <FormLabel
                fontSize={"sm"}
                fontWeight="normal"
                transform={input.prenom ? "scale(0.85) translateY(-35px)" : ""}
              >
                Prénom
              </FormLabel>
              <Input
                size="sm"
                value={input.prenom}
                _placeholder={{ color: "gray.500" }}
                onChange={(e) => handleFormChange(index, e)}
                name="prenom"
                type="text"
              />
            </FormControl>
            <FormControl isRequired>
              <Select
                placeholder="-Select-"
                size="sm"
                onChange={(e) => handleFormChange(index, e)}
                name="nature_credit"
                value={input.nature_credit}
                textAlign="center"

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
                onChange={(e) => handleFormChange(index, e)}
                name="organisme"
                value={input.organisme}
                textAlign="center"
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
                  fixedDecimalScale={true}
                  onChange={(e) => handleFormChange(index, e)}
                  name="echeance"
                  value={input.echeance}
                  placeholder="# ### ###.##"
                />
                <InputRightAddon children="د.م" />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <InputGroup size="sm">
                <CurrencyFormat
                  customInput={Input}
                  decimalSeparator=","
                  thousandSeparator=" "
                  decimalScale={2}
                  fixedDecimalScale={true}
                  onChange={(e) => handleFormChange(index, e)}
                  name="encours"
                  value={input.encours}
                  placeholder="# ### ###.##"
                />
                <InputRightAddon children="د.م" />
              </InputGroup>
            </FormControl>
            <FormControl isRequired variant="floating">
              <Input
                onChange={(e) => handleFormChange(index, e)}
                name="duree"
                size="sm"
                value={input.duree}
                _placeholder={{ color: "gray.500" }}
                type="text"
              />
            </FormControl>
            <FormControl isRequired  my={3}>
            <Select
                placeholder="-Select-"
                size="sm"
                onChange={(e) => handleFormChange(index, e)}
                name="rat"
                value={input.rat}
                textAlign="center"
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

export default EngagementsBancaires;
