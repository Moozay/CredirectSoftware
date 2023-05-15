import React, { useContext } from "react";

import {
  Flex,
  Heading,
  Button,
  HStack,
  useColorMode,
  Code,
  FormControl,
  Input,
  InputRightElement,
  InputRightAddon,
  FormLabel,
  Select,
  InputGroup,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import DatePicker from "react-datepicker";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { UpdateContext } from "context/UpdateContext";
const ViewDonneesEnvoyer = () => {
  const {
    isEditing,
    donneesPersonnelles,
    setDonneesPersonnelles,
    date_envoi,
    setDatenvoi,
  } = useContext(UpdateContext);
  const handleDonneesBancairesChange = (event, section) => {};
  const { colorMode } = useColorMode();

  const banqueList = [
    "SGMB",
    "BP",
    "CDM",
    "BMCI",
    "SOFAC",
    "EQDOM",
    "WAFASALAF",
    'NAJMAH',
    'YOUSR',
    'CIH',
    'WAFA Immobilier',
    'CFG',
    'ABB',
  ];


  const addField = () => {
    const newFormDonneesPersonelles = { ...donneesPersonnelles };
    const field = [
      ...newFormDonneesPersonelles.credit["banque_envoye"],
      {
        banque: "",
        date_envoi: "",
        interlocuteur: "",
        agence: "",
      },
    ];
    let newDate = [...date_envoi, ""];
    newFormDonneesPersonelles.credit["banque_envoye"] = field;
    setDonneesPersonnelles(newFormDonneesPersonelles);
    setDatenvoi(newDate);
    console.log(newFormDonneesPersonelles);
  };

  const removeField = (index) => {
    const newFormDonneesPersonelles = { ...donneesPersonnelles };
    const field = [
      ...newFormDonneesPersonelles.credit["banque_envoye"]
    ];
    const date = [...date_envoi];
    field.splice(index, 1);
    date.splice(index, 1);
    setDatenvoi(date);
    newFormDonneesPersonelles.credit["banque_envoye"] = field;
    setDonneesPersonnelles(newFormDonneesPersonelles);
  };

  const handleFormChange = ( index, event) => {
    var fieldName = event.target.getAttribute("name");
    var fieldValue = event.target.value;
    const newFormDonneesPersonelles = { ...donneesPersonnelles };
    const banque_envoye = [
      ...newFormDonneesPersonelles["credit"]["banque_envoye"],
    ];
    banque_envoye[index][fieldName] = fieldValue;
    newFormDonneesPersonelles["credit"]["banque_envoye"] =
      banque_envoye;
    setDonneesPersonnelles(newFormDonneesPersonelles);
    console.log(newFormDonneesPersonelles);
  };

  const handleDateChange = ( index, date) => {
    let newDate = [...date_envoi];
    newDate[index] = date;
    const newFormDonneesPersonelles = { ...donneesPersonnelles };
    newFormDonneesPersonelles["credit"]["banque_envoye"][index][
      "date_envoi"
    ] = new Date(date).toISOString();
    setDatenvoi(newDate);
    setDonneesPersonnelles(newFormDonneesPersonelles);
  };

  return (
    <>
      
 
          <Flex
            flexDir={"column"}
            justifyContent="space-around"
            alignContent={"space-between"}
          >
            <Flex justifyContent="space-between" alignItems={"center"}>
              <Heading as="h5" size="sm" my={3}>
                Choix Banque 
              </Heading>
            </Flex>
            <Button
              leftIcon={<BiAddToQueue />}
              color={"#ff7659"}
              variant="outline"
              size="sm"
              border={"none"}
              onClick={() => {
                addField();
              }}
              isDisabled={isEditing?false:true}
            >
              Ajouter
            </Button>
            <HStack direction="row" justifyContent={"space-between"} my={2}>
              <Code
                bgColor={colorMode == "light" ? "#efefef" : ""}
                children="Banque"
                p={1}
                w="30%"
                textAlign={"center"}
              />
              <Code
                bgColor={colorMode == "light" ? "#efefef" : ""}
                children="Date"
                p={1}
                w="30%"
                textAlign={"center"}
              />
              <Code
                bgColor={colorMode == "light" ? "#efefef" : ""}
                children="Interlocuteur"
                p={1}
                w="48%"
                textAlign={"center"}
              />
              <Code
                bgColor={colorMode == "light" ? "#efefef" : ""}
                children="Agence"
                p={1}
                w="48%"
                textAlign={"center"}
              />
              <Code
                bgColor={colorMode == "light" ? "#efefef" : ""}
                children="Action"
                p={1}
                w="30%"
                textAlign={"center"}
              />
            </HStack>

            {donneesPersonnelles["credit"].banque_envoye?.map((input, index) => {
              return (
                <>
                  <HStack alignItems={"flex-start"} my={2} key={index}>
                    <FormControl isRequired variant="floating" w={"30%"}>
                      <Select
                        placeholder="-Select-"
                        size="sm"
                        name="banque"
                        value={input["banque"]}
                        textAlign="center"
                        onChange={(e) => handleFormChange(index, e)}
                      >
                        {banqueList.map((banque, index) => (
                          <option value={banque} key={index}>
                            {banque}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl isRequired w={"30%"}>
                      <InputGroup>
                        <DatePicker
                          id="customDatePicker"
                          selected={date_envoi[index]}
                          name="date_envoi"
                          showMonthDropdown
                          dateFormat="dd/MM/yy"
                          showYearDropdown
                          dropdownMode="select"
                          required
                          onChange={(e) => handleDateChange(index, e)}
                          portalId="root-portal"
                        />
                        <InputRightElement
                          children={<AiOutlineCalendar />}
                          pb={2}
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired w={"48%"}>
                      <InputGroup size="sm">
                        <Input
                          value={input.interlocuteur}
                          size="sm"
                          onChange={(e) => handleFormChange(index, e)}
                          name="interlocuteur"
                          _placeholder={{ color: "gray.500" }}
                          type="text"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl isRequired w={"48%"}>
                      <InputGroup size="sm">
                        <Input
                          value={input.agence}
                          size="sm"
                          name="agence"
                          onChange={(e) => handleFormChange(index, e)}
                          _placeholder={{ color: "gray.500" }}
                          type="text"
                        />
                      </InputGroup>
                    </FormControl>
                    <FormControl w={"30%"}>
                      <Button
                        leftIcon={<DeleteIcon />}
                        color={"#ff7659"}
                        variant="outline"
                        size="sm"
                        alignContent={"center"}
                        border={"none"}
                        onClick={() => removeField(index)}
                        isDisabled={index === 0 ? true : false}
                      >
                        Supprime
                      </Button>
                    </FormControl>
                  </HStack>
                </>
              );
            })}
          </Flex>
      
    </>
  );
};

export default ViewDonneesEnvoyer;
