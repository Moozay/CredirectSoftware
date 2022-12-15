import React, { useContext, useState, useMemo, useEffect } from "react";

import {
  Stack,
  VStack,
  HStack,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  InputGroup,
  RadioGroup,
  Radio,
  Select,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import Calendar from "react-calendar";
import "react-datepicker/dist/react-datepicker.css";
import "react-calendar/dist/esm/Calendar";
import { AiOutlineCalendar } from "react-icons/ai";
import "../Stepper/stepper.css";
import countryList from "react-select-country-list";
import { AiFillCaretDown } from "react-icons/ai";
import { CreditContext } from "context/CreditContext";

const Emprunteur = ({
  hasCoEmprunteur,
  setHasCoEmprunteur,
  tabIndex,
  setTabIndex,
  handleDonnesPersonnellesChange,
  handleAdresseChange,
  error
}) => {
  const options = useMemo(() => countryList().getData(), []);
  const { donneesPersonelles, setDonneesPersonelles } =
    useContext(CreditContext);
  const { datenaissance, setDateNaissance } = useContext(CreditContext);
  const { datembauche, setDatembauche } = useContext(CreditContext);
  const [section, setSection] = useState("emprunteur");

  const handleDateNaissanceChange = (date) => {
    const newDateNaissance = { ...datenaissance };
    newDateNaissance["emprunteur_date"] = date;
    setDateNaissance(newDateNaissance);

    const newFormDonneesPersonelles = { ...donneesPersonelles };

    newFormDonneesPersonelles[section]["datenaissance"] = new Date(
      date
    ).toISOString();

    setDonneesPersonelles(newFormDonneesPersonelles);
  };

  const handleDateEmbauche = (date) => {
    const newDateEmbauche = { ...datembauche };
    newDateEmbauche["emprunteur_date"] = date;
    setDatembauche(newDateEmbauche);
    const newFormDonneesPersonelles = { ...donneesPersonelles };

    newFormDonneesPersonelles[section]["datembauche"] = new Date(
      date
    ).toISOString();

    setDonneesPersonelles(newFormDonneesPersonelles);
  };
  const handleRadioChange = (data) => {
    const newFormDonneesPersonelles = { ...donneesPersonelles };

    newFormDonneesPersonelles[section]["hasCoEmprunteur"] = data;
    setDonneesPersonelles(newFormDonneesPersonelles);
    setHasCoEmprunteur(data);
    setDonneesPersonelles({
      ...donneesPersonelles,
      "co_emprunteur":{}
    })
    if (data == "true") {
      setTabIndex(1);
    } else {
      setTabIndex(0);
    }
  };
  useEffect(() => {
    console.log();
  }, [hasCoEmprunteur, tabIndex, donneesPersonelles]);
  return (
    <Flex flexDir={"row"} justifyContent="space-between">
      <VStack alignItems={"flex-start"} w="100%" mx="3">
        <HStack w="100%" my={4}>
          <FormControl isRequired={true} variant="floating" my={3}>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["nom"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Nom
            </FormLabel>
            <Input
              size="sm"
              name="nom"
              _placeholder={{ color: "gray.500" }}
              defaultValue={donneesPersonelles[section]["nom"]}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              type="text"
            />
          </FormControl>
          <FormControl my={3} isRequired variant="floating">
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["prenom"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Prenom
            </FormLabel>
            <Input
              name="prenom"
              size="sm"
              _placeholder={{ color: "gray.500" }}
              defaultValue={donneesPersonelles[section]["prenom"]}
              type="text"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
            />
          </FormControl>
        </HStack>
        <HStack my={4} w="100%">
          <FormControl my={3} isRequired variant="floating">
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["lieunaissance"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Lieu de naissance
            </FormLabel>
            <Input
              required
              name="lieunaissance"
              size="sm"
              _placeholder={{ color: "gray.500" }}
              type="text"
              defaultValue={donneesPersonelles[section]["lieunaissance"]}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
            />
          </FormControl>
          <FormControl my={3} variant="floating" isRequired>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["nationalite"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Nationalité
            </FormLabel>
            <Input
              name="nationalite"
              size="sm"
              _placeholder={{ color: "gray.500" }}
              type="text"
              defaultValue={donneesPersonelles[section]["nationalite"]}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
            />
          </FormControl>
        </HStack>
        <HStack my={4} w="100%">
          <FormControl my={3} variant="floating" isRequired>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["telephone"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Telephone
            </FormLabel>
            <Input
              name="telephone"
              size="sm"
              defaultValue={donneesPersonelles[section]["telephone"]}
              _placeholder={{ color: "gray.500" }}
              type="text"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
            />
          </FormControl>
          <FormControl my={3} variant="floating" isRequired>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["rs_employeur"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              R.S. Employeur
            </FormLabel>
            <Input
              name="rs_employeur"
              size="sm"
              defaultValue={donneesPersonelles[section]["rs_employeur"]}
              _placeholder={{ color: "gray.500" }}
              type="text"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
            />
          </FormControl>
        </HStack>
        <HStack my={4} w="100%">
          <FormControl my={3} variant="floating" isRequired>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["profession"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Profession
            </FormLabel>
            <Input
              name="profession"
              size="sm"
              defaultValue={donneesPersonelles[section]["profession"]}
              _placeholder={{ color: "gray.500" }}
              type="text"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
            />
          </FormControl>
          <FormControl my={3} variant="floating" isRequired>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["situation"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Situation Familiale
            </FormLabel>
            <Select
              size="sm"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              name="situation"
              defaultValue={donneesPersonelles[section]["situation"]}
            >
              <option></option>
              <option value="Célibataire" key="Célibataire">
                Célibataire
              </option>
              <option value="Marié(e)" key="Marié(e)">
                Marié(e)
              </option>
              <option value="Veuf(ve)" key="Veuf(ve)">
                Veuf(e)
              </option>
              <option value=" Divorcé(e)" key="Divorcé(e)">
                Divorcé(e)
              </option>
            </Select>
          </FormControl>
        </HStack>
        <HStack my={4} w="100%">
          <FormControl my={3} variant="floating">
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                datembauche["emprunteur_date"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Date D'embauche
            </FormLabel>
            <InputGroup>
              <DatePicker
                id="customDatePicker"
                selected={datembauche["emprunteur_date"]}
                onChange={handleDateEmbauche}
                name="datembauche"
                showMonthDropdown
                dateFormat="dd/MM/yy"
                showYearDropdown
                dropdownMode="select"
                required
              />
              <InputRightElement children={<AiOutlineCalendar />} pb={2} />
            </InputGroup>
          </FormControl>
          <FormControl my={3} variant="floating" isRequired>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["revenue"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Revenus Mensuel
            </FormLabel>
            <Input
              size="sm"
              _placeholder={{ color: "gray.500" }}
              type="number"
              name="revenue"
              defaultValue={donneesPersonelles[section]["revenue"]}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
            />
          </FormControl>
        </HStack>
        <HStack my={4} w="50%">
          <FormControl my={3} variant="floating" isRequired>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["participation"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Part de participation
            </FormLabel>
            <InputGroup>
              <Input
              isDisabled={hasCoEmprunteur}
                size="sm"
                _placeholder={{ color: "gray.500" }}
                type="number"
                name="participation"
                defaultValue={donneesPersonelles[section]["participation"]}
                onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              />
              <InputRightElement children="%" pb={2} />
            </InputGroup>
          </FormControl>
        </HStack>
      </VStack>
      <VStack alignItems={"flex-start"} w="100%" mx="3">
        <HStack my={4} w="100%">
          <FormControl my={3} variant="floating" isRequired>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["cin_sejour"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              N. Cin/Sejour {error?.msg}`
            </FormLabel>
            <Input
              isInvalid={error?.status}
              size="sm"
              _placeholder={{ color: "gray.500" }}
              type="text"
              defaultValue={donneesPersonelles[section]["cin_sejour"]}
              name="cin_sejour"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
            />
          </FormControl>
          <FormControl my={3} isRequired variant="floating">
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                datenaissance["emprunteur_date"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Date de naissance
            </FormLabel>
            <InputGroup>
              <DatePicker
                id="customDatePicker"
                selected={datenaissance["emprunteur_date"]}
                onChange={handleDateNaissanceChange}
                name="datenaissance"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                required
              />
              <InputRightElement children={<AiOutlineCalendar />} pb={2} />
            </InputGroup>
          </FormControl>
        </HStack>
        <HStack my={4} w="100%">
          <FormControl my={3} variant="floating" isRequired>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles.emprunteur.adresse?.adresse1
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Adresse
            </FormLabel>
            <Input
              size="sm"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="adresse1"
              defaultValue={donneesPersonelles.emprunteur.adresse?.adresse1}
              onChange={(e) => handleAdresseChange(e, section)}
            />
          </FormControl>
          <FormControl my={3} variant="floating" isRequired>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles.emprunteur.adresse?.ville
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Ville de residence
            </FormLabel>
            <Input
              size="sm"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="ville"
              defaultValue={donneesPersonelles.emprunteur.adresse?.ville}
              onChange={(e) => handleAdresseChange(e, section)}
            />
          </FormControl>
        </HStack>
        <HStack my={4} w="100%">
          <FormControl my={3} variant="floating" isRequired>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles.emprunteur.adresse?.pays
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Pays
            </FormLabel>
            <Select
              size="sm"
              name="pays"
              onChange={(e) => handleAdresseChange(e, section)}
              icon={<AiFillCaretDown />}
              w="100%"
              defaultValue={donneesPersonelles.emprunteur.adresse?.pays}
            >
              <option></option>
              {options.map((country) => {
                return (
                  <option
                    key={country.label}
                    value={country.label}
                    css={{ width: "100%" }}
                  >
                    {country.label}
                  </option>
                );
              })}
            </Select>
          </FormControl>
        </HStack>
        <HStack my={4}>
          <FormControl my={3} isRequired>
            <FormLabel>Co-Emprunteur</FormLabel>
            <RadioGroup
              onChange={handleRadioChange}
              value={donneesPersonelles[section]["hasCoEmprunteur"]}
              name="hasCoEmprunteur"
              selected={
                donneesPersonelles[section]["hasCoEmprunteur"] == "true"
                  ? "true"
                  : "false"
              }
            >
              <Stack direction="column">
                <Radio value="true">Oui</Radio>
                <Radio value="false">Non</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default Emprunteur;
