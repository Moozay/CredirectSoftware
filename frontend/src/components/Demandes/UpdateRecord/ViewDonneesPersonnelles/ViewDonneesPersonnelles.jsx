import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  ButtonGroup,
  Stack,
  Heading,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import ViewEmprunteur from "./ViewEmprunteur";
import { Link } from "react-router-dom";
import { UpdateContext } from "context/UpdateContext";
import ViewCoEmprunteur from "./ViewCoEmprunteur";
const ViewDonneesPersonnelles = ({}) => {
  const {
    isEditing,
    donneesPersonnelles,
    setDonneesPersonnelles,
    calculateMensualite,
  } = useContext(UpdateContext);

  const handleAdresseChange = (event, section) => {
    var fieldName = event.target.getAttribute("name");
    var fieldValue = event.target.value;
    var adresse = donneesPersonnelles[section]["adresse"];
    adresse = { ...adresse, [fieldName]: fieldValue };
    const newFormDonneesPersonelles = { ...donneesPersonnelles };
    newFormDonneesPersonelles[section]["adresse"] = adresse;
    setDonneesPersonnelles(newFormDonneesPersonelles);
  };

  const calculateParticipation = (data) => {
    const newFormDonneesPersonelles = { ...donneesPersonnelles };
    var part_coEmp = "";
    if (data != "") {
      part_coEmp = 100 - parseFloat(data);
    }
    console.log("fff", newFormDonneesPersonelles);
    newFormDonneesPersonelles.co_emprunteur.participation = String(part_coEmp);
    setDonneesPersonnelles(newFormDonneesPersonelles);
  };

  const handleDonnesPersonnellesChange = (event, section) => {
    var fieldName = event.target.getAttribute("name");

    var fieldValue = event.target.value;
    if (fieldName == "participation" && section == "emprunteur") {
      calculateParticipation(fieldValue);
    }
    const newFormDonneesPersonelles = { ...donneesPersonnelles };
    newFormDonneesPersonelles[section][fieldName] = fieldValue;
    if (fieldName === "type_profession" && fieldValue != "Retraité") {
      newFormDonneesPersonelles.emprunteur.caisse = "";
      newFormDonneesPersonelles.emprunteur.profession = null;
    }
    if (fieldName === "type_profession" && fieldValue === "Retraité") {
      newFormDonneesPersonelles.emprunteur.profession = null;
    }
    if (fieldName === "source" && fieldValue != "Parrainage") {
      newFormDonneesPersonelles.emprunteur.parrainage = null;
    }
    if (fieldName === "source" && fieldValue != "Agent") {
      newFormDonneesPersonelles.emprunteur.agent = null;
    }
    setDonneesPersonnelles(newFormDonneesPersonelles);
    if (fieldName === "revenue") {
      const newRecord = [...donneesPersonnelles.credits];
      for (let index = 0; index < newRecord.length; index++) {
        calculateMensualite(newRecord[index], index);
      }
    }

    console.log(donneesPersonnelles);
  };

  return (
    <>
      <Flex>
        <Heading as="h5" size="sm">
          Emprunteur Données
        </Heading>
        <Spacer />
      </Flex>
      <ViewEmprunteur
        isEditing={isEditing}
        handleAdresseChange={handleAdresseChange}
        handleDonnesPersonnellesChange={handleDonnesPersonnellesChange}
      />
      {donneesPersonnelles.emprunteur?.has_coemp == "true" && (
        <>
          <Heading as="h5" size="sm" mt={3}>
            Co-Emprunteur Données
          </Heading>
          <ViewCoEmprunteur
            isEditing={isEditing}
            handleAdresseChange={handleAdresseChange}
            handleDonnesPersonnellesChange={handleDonnesPersonnellesChange}
          />
        </>
      )}
    </>
  );
};

export default ViewDonneesPersonnelles;
