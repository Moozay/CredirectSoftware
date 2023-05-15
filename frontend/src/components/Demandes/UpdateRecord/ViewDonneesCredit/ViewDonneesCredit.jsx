import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  ButtonGroup,
  Stack,
  Flex,
  Heading,
  HStack,
  FormLabel,
  FormControl,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { UpdateContext } from "context/UpdateContext";
import ViewCaracteristicsCredit from "./ViewCaracteristicsCredit";
import ViewObjetCredit from "./ViewObjetCredit";
import { useColorMode } from "@chakra-ui/color-mode";

const ViewDonneesCredit = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { handleCreditDataChange } = useContext(UpdateContext);
  const { isEditing, donneesPersonnelles, setDonneesPersonnelles } =
    useContext(UpdateContext);
  const handleAdresseChange = (event) => {
    var fieldName = event.target.getAttribute("name");
    var fieldValue = event.target.value;
    var adresse = donneesPersonnelles.credit["adresse_bien"];
    adresse = { ...adresse, [fieldName]: fieldValue };
    const newRecord = { ...donneesPersonnelles };
    newRecord.credit["adresse_bien"] = adresse;
    setDonneesPersonnelles(newRecord);
  };

  return (
    <>
      <Flex
        flexDir={"column"}
        justifyContent="space-around"
        alignContent={"space-between"}
      >
        <Flex justifyContent="space-between" alignItems={"center"}>
          <Heading as="h5" size="md" my={3}>
            Statut : {donneesPersonnelles["credit"]["statusCredit"]}
          </Heading>
        </Flex>
        <HStack alignItems="center" m={2} mb={4}>
          <FormLabel w="15%">Type de Crédit</FormLabel>
          <FormControl id="Prenom" isRequired w="20%">
            <Select
              name="type_credit"
              defaultValue={donneesPersonnelles["credit"]["type_credit"]}
              pointerEvents={isEditing ? "" : "none"}
              onChange={(e) => handleCreditDataChange(e)}
              placeholder="-Select-"
              size="sm"
            >
              <option value="immobilier">Immobilier</option>
              <option value="hypothecaire">Hypothécaire</option>
              <option value="consommation">Consommation</option>
              <option value="leasing">Leasing</option>
              <option value="participatif">Participatif</option>
            </Select>
          </FormControl>
        </HStack>
        {(donneesPersonnelles["credit"].type_credit == "immobilier" ||
          donneesPersonnelles["credit"].type_credit == "hypothecaire") && (
          <>
            <Flex justifyContent="space-between" alignItems={"center"}>
              <Heading
                as="h5"
                size="sm"
                mb={3}
                justifyContent="space-between"
                alignItems={"center"}
                p="2"
                bgColor={colorMode == "light" ? "#efefef" : ""}
                w="100%"
              >
                Objet du Crédit
              </Heading>
            </Flex>

            <ViewObjetCredit
              handleAdresseChange={handleAdresseChange}
              handleCreditDataChange={handleCreditDataChange}
            />
          </>
        )}

        <Flex justifyContent="space-between" alignItems={"center"}>
          <Heading
            as="h5"
            size="sm"
            justifyContent="space-between"
            alignItems={"center"}
            p="2"
            mb="2"
            bgColor={colorMode == "light" ? "#efefef" : ""}
            w="100%"
          >
            Caractéristiques Du Crédit
          </Heading>
        </Flex>

        <ViewCaracteristicsCredit
          handleCreditDataChange={handleCreditDataChange}
        />
      </Flex>
    </>
  );
};

export default ViewDonneesCredit;
