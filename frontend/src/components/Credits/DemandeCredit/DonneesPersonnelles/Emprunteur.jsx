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
  Heading,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import Calendar from "react-calendar";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineCalendar } from "react-icons/ai";
import "../Stepper/stepper.css";
import countryList from "react-select-country-list";
import { AiFillCaretDown } from "react-icons/ai";
import { CreditContext } from "context/CreditContext";
import { Country, State } from "country-state-city";

const Emprunteur = ({
  hasCoEmprunteur,
  setHasCoEmprunteur,
  tabIndex,
  setTabIndex,
  handleDonnesPersonnellesChange,
  handleAdresseChange,
  error,
}) => {
  const options = useMemo(() => countryList().getData(), []);
  const [countryId, setCountryId] = useState("MA");
  const countries = useMemo(() => Country.getAllCountries(), []);
  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: { name: country.name, id: country.isoCode },
    ...country,
  }));

  const updatedState = () =>
    State.getStatesOfCountry(countryId).map((state) => ({
      label: state.name,
      value: { name: state.name },
      ...state,
    }));
  const { donneesPersonelles, setDonneesPersonelles } =
    useContext(CreditContext);
  const { datenaissance, setDateNaissance } = useContext(CreditContext);
  const { handleCreditDataChange,credit } = useContext(CreditContext);
  const { datembauche, setDatembauche } = useContext(CreditContext);
  const [section, setSection] = useState("emprunteur");

  const handleDateNaissanceChange = (date) => {
    const newDateNaissance = { ...datenaissance };
    newDateNaissance["emprunteur_date"] = date;
    setDateNaissance(newDateNaissance);
    console.log(date);
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
  const handleParticipation = (data) => {
    if (data == "false") {
      const newFormDonneesPersonelles = { ...donneesPersonelles };
      newFormDonneesPersonelles.emprunteur.participation = "100";
      setDonneesPersonelles(newFormDonneesPersonelles);
    } else {
      const newFormDonneesPersonelles = { ...donneesPersonelles };
      newFormDonneesPersonelles.emprunteur.participation = "";
      setDonneesPersonelles(newFormDonneesPersonelles);
    }
  };

  const handleRadioChange = (data) => {
    const newFormDonneesPersonelles = { ...donneesPersonelles };

    newFormDonneesPersonelles[section]["hasCoEmprunteur"] = data;
    if (data === "false") {
      newFormDonneesPersonelles.co_emprunteur = {};
    }
    handleParticipation(data);
    setDonneesPersonelles(newFormDonneesPersonelles);
    setHasCoEmprunteur(data);
    console.log(data);
  };
  useEffect(() => {
    console.log();
  }, [hasCoEmprunteur, tabIndex, donneesPersonelles]);
  return (
    <HStack alignItems={"flex-start"} mb="5">
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
              _placeholder={""}
              value={donneesPersonelles[section]["nom"]||""}
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
              value={donneesPersonelles[section]["prenom"] ||""}
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
              value={donneesPersonelles[section]["lieunaissance"]||""}
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
              value={donneesPersonelles[section]["nationalite"] ||""}
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
              value={donneesPersonelles[section]["telephone"]||""}
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
                donneesPersonelles[section]["type_profession"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Type Profession
            </FormLabel>
            <Select
              size="sm"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              name="type_profession"
              value={donneesPersonelles[section]["type_profession"] ||""}
            >
              <option></option>
              <option value="Salarié" key="Salairé">
                Salarié
              </option>
              <option value="Fonctionnaire" key="Fonctionnaire">
                Fonctionnaire
              </option>
              <option value="Profession Libérale" key="Profession Libérale">
                Profession Libérale
              </option>
              <option value="Retraité" key="Retraité">
                Retraité
              </option>
              <option value="Commerçant" key="Commerçant">
                Commerçant
              </option>
              <option value="Gérant de Societé" key="Gérant de Societé">
                Gérant de Societé
              </option>
            </Select>
          </FormControl>
        </HStack>
        <HStack my={4} w="100%">
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
            isRequired
              size="sm"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              name="situation"
              value={donneesPersonelles[section]["situation"]||""}
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
          <FormControl
            my={3}
            variant="floating"
            isRequired
            isDisabled={
              donneesPersonelles.emprunteur.type_profession === "Retraité"
                ? true
                : false
            }
          >
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
              value={donneesPersonelles[section]["profession"]||""}
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
                donneesPersonelles[section]["participation"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Part de participation
            </FormLabel>
            <InputGroup>
              <Input
                isDisabled={hasCoEmprunteur == "true" ? false : true}
                size="sm"
                _placeholder={{ color: "gray.500" }}
                type="number"
                name="participation"
                min={0}
                max={100}
                value={donneesPersonelles[section]["participation"]}
                onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              />
              <InputRightElement children="%" pb={2} />
            </InputGroup>
          </FormControl>
          <FormControl my={3} variant="floating" isRequired>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["source"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Source
            </FormLabel>
            <Select
              size="sm"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              name="source"
              value={donneesPersonelles[section]["source"]||""}
            >
              <option></option>
              <option value="E-mail" key="E-mail">
                E-mail
              </option>
              <option value="Contact Direct" key="Contact Direct">
                Contact Direct
              </option>
              <option value="Réseaux" key="Réseaux">
                Réseaux
              </option>
              <option value="Agent" key="Agent">
                Agent
              </option>
              <option value="Parrainage" key="Parrainage">
                Parrainage
              </option>
            </Select>
          </FormControl>
        </HStack>
        {donneesPersonelles.emprunteur.source === "Parrainage" && (
          <HStack my={4} w="50%">
            <FormControl my={3} variant="floating" isRequired>
              <FormLabel
                fontSize={"sm"}
                fontWeight="normal"
                transform={
                  donneesPersonelles[section]["parrainage"]
                    ? "scale(0.85) translateY(-35px)"
                    : ""
                }
              >
                Parrainage
              </FormLabel>
              <InputGroup>
                <Input
                  size="sm"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  name="parrainage"
                  value={donneesPersonelles[section]["parrainage"] ||""}
                  onChange={(e) => handleDonnesPersonnellesChange(e, section)}
                />
              </InputGroup>
            </FormControl>
          </HStack>
        )}
        {donneesPersonelles.emprunteur.source === "Agent" && (
          <HStack my={4} w="50%">
            <FormControl my={3} variant="floating" isRequired>
              <FormLabel
                fontSize={"sm"}
                fontWeight="normal"
                transform={
                  donneesPersonelles[section]["agent"]
                    ? "scale(0.85) translateY(-35px)"
                    : ""
                }
              >
                Agent
              </FormLabel>
              <InputGroup>
                <Input
                  size="sm"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  name="agent"
                  value={donneesPersonelles[section]["agent"]||""}
                  onChange={(e) => handleDonnesPersonnellesChange(e, section)}
                />
              </InputGroup>
            </FormControl>
          </HStack>
        )}
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
              value={donneesPersonelles[section]["cin_sejour"]||""}
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
                dateFormat="dd/MM/yyyy"
                dropdownMode="select"
                required
                portalId="root-portal"
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
              onChange={(e) => {
                var countryId = e.target.selectedOptions[0].id;
                console.log(countryId);
                setCountryId(countryId);
                handleAdresseChange(e, section);
              }}
              icon={<AiFillCaretDown />}
              w="100%"
              defaultValue={donneesPersonelles.emprunteur.adresse?.pays}
            >
              <option></option>
              {updatedCountries.map((country) => {
                return (
                  <option
                    id={country.value.id}
                    key={country.label}
                    value={country.value.name}
                    css={{ width: "100%" }}
                  >
                    {country.label}
                  </option>
                );
              })}
            </Select>
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
            <Select
              size="sm"
              name="ville"
              onChange={(e) => handleAdresseChange(e, section)}
              icon={<AiFillCaretDown />}
              w="100%"
              value={donneesPersonelles.emprunteur.adresse?.ville ||""}
            >
              <option></option>
              {updatedState(countryId).map((state) => {
                return (
                  <option
                    key={state.label}
                    value={state.label}
                    css={{ width: "100%" }}
                  >
                    {state.label}
                  </option>
                );
              })}
            </Select>
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
              value={donneesPersonelles.emprunteur.adresse?.adresse1||""}
              onChange={(e) => handleAdresseChange(e, section)}
            />
          </FormControl>
        </HStack>
        <HStack my={4} w="100%">
          <FormControl
            my={3}
            variant="floating"
            isRequired={
              donneesPersonelles.emprunteur.type_profession !== "Retraité"
                ? true
                : false
            }
          >
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
              value={donneesPersonelles[section]["rs_employeur"]||""}
              _placeholder={{ color: "gray.500" }}
              type="text"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
            />
          </FormControl>
          <FormControl
            my={3}
            variant="floating"
            isDisabled={
              donneesPersonelles.emprunteur.type_profession === "Retraité"
                ? false
                : true
            }
            isRequired={
              donneesPersonelles.emprunteur.type_profession === "Retraité"
                ? true
                : false
            }
          >
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["caisse"]
                  ? "scale(0.85) translateY(-35px)"
                  : ""
              }
            >
              Caisse
            </FormLabel>
            <Select
              size="sm"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              name="caisse"
              value={donneesPersonelles[section]["caisse"]||""}
            >
              <option></option>
              <option value="CIMR" key="CIMR">
                CIMR
              </option>
              <option value="CMR" key="CMR">
                CMR
              </option>
              <option value="RCAR" key="RCAR">
                RCAR
              </option>
              <option value="CNSS" key="CNSS">
                CNSS
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
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                dropdownMode="select"
                required
                portalId="root-portal"
              />
              <InputRightElement children={<AiOutlineCalendar />} pb={2} />
            </InputGroup>
          </FormControl>
          <FormControl my={3} variant="floating" isRequired>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                credit["prospect_revenue"]
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
              name="prospect_revenue"
              value={credit["prospect_revenue"]||""}
              onChange={handleCreditDataChange}
            />
          </FormControl>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default Emprunteur;
