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
const ViewBanqueList = (index, input, position) => {
  const {
    isEditing,
    donneesPersonnelles,
    setDonneesPersonnelles,
    date_envoi,
    setDatenvoi,
  } = useContext(UpdateContext);
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


  const addField = (position) => {
    const newFormDonneesPersonelles = { ...donneesPersonnelles };
    const field = [
      newFormDonneesPersonelles.credits[position]["banque_envoi"],
      {
        banque: "",
        date_envoi: "",
        interlocuteur: "",
        agence: "",
      },
    ];
    let newDate = [...date_envoi];
    newDate[position] = [...newDate[position], ""];
    newFormDonneesPersonelles.credits[position]["banque_envoi"] = field;
    setDonneesPersonnelles(newFormDonneesPersonelles);
    setDatenvoi(newDate);
  };

  const removeField = (position, index) => {
    const newFormDonneesPersonelles = { ...donneesPersonnelles };
    const field = [newFormDonneesPersonelles.credits[position]["banque_envoi"]];
    const date = [...date_envoi];
    field[position].splice(index, 1);
    date[position].splice(index, 1);
    setDatenvoi(date);
    newFormDonneesPersonelles.credits[position]["banque_envoi"] = field;
    setDonneesPersonnelles(newFormDonneesPersonelles);
  };

  const handleFormChange = (position, index, event) => {
    var fieldName = event.target.getAttribute("name");
    var fieldValue = event.target.value;
    const newFormDonneesPersonelles = { ...donneesPersonnelles };
    newFormDonneesPersonelles["credits"][position]["banque_envoi"][index][
      fieldName
    ] = [fieldValue];
    setDonneesPersonnelles(newFormDonneesPersonelles);
  };

  const handleDateChange = (position, index, date) => {
    let newDate = [...date_envoi];
    newDate[position][index] = date;
    const newFormDonneesPersonelles = { ...donneesPersonnelles };
    newFormDonneesPersonelles["credits"][position]["banque_envoi"][index][
      "date_envoi"
    ] = new Date(date).toISOString();
    setDatenvoi(newDate);
    setDonneesPersonnelles(newFormDonneesPersonelles);
  };

  return (
    <>
                  <HStack alignItems={"flex-start"} my={2} key={index}>
                    <FormControl isRequired variant="floating" w={"30%"}>
                      <Select
                        placeholder="-Select-"
                        size="sm"
                        name="banque"
                        value={input.banque}
                        textAlign="center"
                        onChange={(e) => handleFormChange(position, index, e)}
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
                          selected={date_envoi[position][index]}
                          name="date_envoi"
                          showMonthDropdown
                          dateFormat="dd/MM/yy"
                          showYearDropdown
                          dropdownMode="select"
                          required
                          onChange={(e) => handleDateChange(position, index, e)}
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
                          onChange={(e) => handleFormChange(position, index, e)}
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
                          onChange={(e) => handleFormChange(position, index, e)}
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
                </>)
};

export default ViewBanqueList;
