import { React, useState, useMemo, useEffect } from "react";
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
import { AiOutlineCalendar, AiFillCaretDown } from "react-icons/ai";
import countryList from "react-select-country-list";
import { useContext } from "react";
import { Country, State } from "country-state-city";
import { UpdateContext } from "context/UpdateContext";

const ViewEmprunteur = ({
  handleAdresseChange,
  handleDonnesPersonnellesChange,
}) => {
  const options = useMemo(() => countryList().getData(), []);
  const [countryId, setCountryId] = useState("");
  const countries = useMemo(() => Country.getAllCountries(), []);
  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: { "name": country.name, "id": country.isoCode },
    ...country,
  }));

  const updatedState = () =>
    State.getStatesOfCountry(countryId).map((state) => ({
      label: state.name,
      value: { "name": state.name},
      ...state,
    }));
  const [section, setSection] = useState("emprunteur");
  const { Pays,datenaissance, datembauche, setDateNaissance, setDatembauche } =
    useContext(UpdateContext);
  const { donneesPersonnelles, setDonneesPersonnelles, isEditing, handleCreditDataChange } =
    useContext(UpdateContext);

  const handleRadioChange = (data) => {
    handleParticipation(data);
    const newFormDonneesPersonelles = { ...donneesPersonnelles };
    newFormDonneesPersonelles.co_emprunteur = {};
    newFormDonneesPersonelles.co_emprunteur.participation = "";
    newFormDonneesPersonelles.co_emprunteur.revenue = "0";
    newFormDonneesPersonelles.emprunteur.has_coemp = data;
    setDonneesPersonnelles(newFormDonneesPersonelles);
    console.log(data);
  };

  const handleParticipation = (data) => {
    if (data == "false") {
      console.log("i run");
      const newFormDonneesPersonelles = { ...donneesPersonnelles };
      newFormDonneesPersonelles.emprunteur.participation = "100";
      setDonneesPersonnelles(newFormDonneesPersonelles);
    } else {
      const newFormDonneesPersonelles = { ...donneesPersonnelles };
      newFormDonneesPersonelles.emprunteur.participation = "";
      setDonneesPersonnelles(newFormDonneesPersonelles);
    }
  };

  const handleDateNaissanceChange = (date) => {
    const newDateNaissance = { ...datenaissance };
    newDateNaissance[section] = date;
    setDateNaissance(newDateNaissance);
    console.log(date);
    const newFormDonneesPersonelles = { ...donneesPersonnelles };

    newFormDonneesPersonelles[section]["datenaissance"] = new Date(
      date
    ).toISOString();

    setDonneesPersonnelles(newFormDonneesPersonelles);
    console.log(date);
  };

  const handleDateEmbauche = (date) => {
    const newDateEmbauche = { ...datembauche };
    newDateEmbauche[section] = date;
    setDatembauche(newDateEmbauche);
    const newFormDonneesPersonelles = { ...donneesPersonnelles };

    newFormDonneesPersonelles[section]["datembauche"] = new Date(
      date
    ).toISOString();

    setDonneesPersonnelles(newFormDonneesPersonelles);
  };

  useEffect(() => {
    for (let index = 0; index < countries.length; index++) {
        if (Pays.emprunteur == countries[index].name) {
            setCountryId(countries[index].isoCode)
            console.log(countryId);
        }        
    }
  }, [Pays]);
  return (
    <HStack alignItems={"flex-start"} mb={10}>
      <VStack alignItems={"flex-start"} w="100%" mx={3}>
        <HStack w={"100%"} my={4}>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Nom
            </FormLabel>
            <Input
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              value={donneesPersonnelles.emprunteur?.nom}
              readOnly={!isEditing}
              size={"sm"}
              name="nom"
              type={"text"}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Prenom
            </FormLabel>
            <Input
              defaultValue={donneesPersonnelles.emprunteur?.prenom}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              readOnly={!isEditing}
              size={"sm"}
              name="prenom"
              type={"text"}
            />
          </FormControl>
        </HStack>
        <HStack w={"100%"} my={4}>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Lieu de naissance
            </FormLabel>
            <Input
              defaultValue={donneesPersonnelles.emprunteur?.lieunaissance}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              readOnly={!isEditing}
              size={"sm"}
              name="lieunaissance"
              type={"text"}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Nationalite
            </FormLabel>
            <Input
              defaultValue={donneesPersonnelles.emprunteur?.nationalite}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              readOnly={!isEditing}
              size={"sm"}
              name="nationalite"
              type={"text"}
            />
          </FormControl>
        </HStack>
        <HStack w={"100%"} my={4}>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Telephone
            </FormLabel>
            <Input
              defaultValue={donneesPersonnelles.emprunteur?.telephone}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              readOnly={!isEditing}
              size={"sm"}
              name="telephone"
              type={"text"}
            />
          </FormControl>
          <FormControl my={3} isRequired>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
             
            >
              Type Profession
            </FormLabel>
            <Select
              size="sm"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              name="type_profession"
              value={donneesPersonnelles.emprunteur?.type_profession}
              pointerEvents={isEditing ? "" : "none"}
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
        <HStack w={"100%"} my={4}>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Situation Familiale
            </FormLabel>
            <Select
              value={donneesPersonnelles.emprunteur?.situation}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              name="situatiion"
              pointerEvents={isEditing ? "" : "none"}
              size="sm"
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
        isDisabled={
            donneesPersonnelles.emprunteur?.type_profession === "Retraité"
              ? true
              : false
          }
        >
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Profession
            </FormLabel>
            <Input
              value={donneesPersonnelles.emprunteur?.profession}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              readOnly={!isEditing}
              size={"sm"}
              name="profession"
              type={"text"}
            />
          </FormControl>
        </HStack>
        <HStack w={"100%"} my={4}>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Part de partipation
            </FormLabel>
            <Input
              value={donneesPersonnelles.emprunteur?.participation}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              size={"sm"}
              type="number"
              name="participation"
              min="0"
              max="100"
              readOnly={!isEditing}
              disabled={
                donneesPersonnelles.emprunteur?.has_coemp == "true"
                  ? false
                  : true
              }
            />
          </FormControl>
          <FormControl my={3} isRequired>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
            >
              Source
            </FormLabel>
            <Select
              size="sm"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              name="source"
              value={donneesPersonnelles.emprunteur?.source}
              pointerEvents={isEditing ? "" : "none"}
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
        {donneesPersonnelles.emprunteur?.source === "Parrainage" && (
          <HStack my={4} w="50%">
            <FormControl my={3} isRequired>
              <FormLabel
                fontSize={"sm"}
                fontWeight="normal"
              >
                Parrainage
              </FormLabel>
              <InputGroup>
                <Input
                  size="sm"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  name="parrainage"
                  readOnly={!isEditing}
                  value={donneesPersonnelles.emprunteur?.parrainage}
                  onChange={(e) => handleDonnesPersonnellesChange(e, section)}
                />
              </InputGroup>
            </FormControl>
          </HStack>
        )}
        {donneesPersonnelles.emprunteur?.source === "Agent" && (
          <HStack my={4} w="50%">
            <FormControl my={3} variant="floating" isRequired>
              <FormLabel
                fontSize={"sm"}
                fontWeight="normal"
                transform={
                  donneesPersonnelles[section]["agent"]
                    ? "scale(0.85) translateY(-35px)"
                    : ""
                }
              >
                Agent
              </FormLabel>
              <InputGroup>
                <Input
                  size="sm"
                  readOnly={!isEditing}
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                  name="agent"
                  value={donneesPersonnelles.emprunteur?.agent}
                  onChange={(e) => handleDonnesPersonnellesChange(e, section)}
                />
              </InputGroup>
            </FormControl>
          </HStack>
        )}
        <HStack my={4}>
          <FormControl my={3} isRequired isReadOnly={!isEditing}>
            <FormLabel>Co-Emprunteur</FormLabel>
            <RadioGroup
              name="has_coemp"
              value={donneesPersonnelles.emprunteur?.has_coemp}
              onChange={handleRadioChange}
            >
              <Stack direction="column">
                <Radio value="true">Oui</Radio>
                <Radio value="false">Non</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </HStack>
      </VStack>
      <VStack alignItems={"flex-start"} w="100%" mx={3}>
        <HStack w={"100%"} my={4}>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              N. Cin/Sejour
            </FormLabel>
            <Input
              defaultValue={donneesPersonnelles.emprunteur?.cin_sejour}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              readOnly={!isEditing}
              size={"sm"}
              name="cin_sejour"
              type={"text"}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Date de naissance
            </FormLabel>
            <InputGroup>
              <DatePicker
                selected={datenaissance?.emprunteur}
                id="customDatePicker"
                name="datenaissance"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                required
                readOnly={!isEditing}
                onChange={handleDateNaissanceChange}
                portalId="root-portal"
              />
              <InputRightElement children={<AiOutlineCalendar />} pb={2} />
            </InputGroup>
          </FormControl>
        </HStack>
        <HStack w={"100%"} my={4}>
        <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Pays
            </FormLabel>
            <Select
              size="sm"
              name="pays"
              value={donneesPersonnelles.emprunteur?.adresse.pays}
              icon={<AiFillCaretDown />}
              w="100%"
              pointerEvents={isEditing ? "" : "none"}
              onChange={(e) => {
                var countryId = e.target.selectedOptions[0].id
                console.log(e);
                setCountryId(countryId)
                handleAdresseChange(e, section);
              }}
            >
              <option></option>
              {updatedCountries.map((country) => {
                return (
                  <option
                  id={country.value.id}
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
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Ville
            </FormLabel>
            <Select
              size="sm"
              name="ville"
              value={donneesPersonnelles.emprunteur?.adresse.ville}
              icon={<AiFillCaretDown />}
              w="100%"
              pointerEvents={isEditing ? "" : "none"}
              onChange={(e) => handleAdresseChange(e, section)}
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
        <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Adresse
            </FormLabel>
            <Input
              defaultValue={donneesPersonnelles.emprunteur?.adresse.adresse1}
              onChange={(e) => handleAdresseChange(e, section)}
              readOnly={!isEditing}
              size={"sm"}
              name="adresse1"
              type={"text"}
            />
          </FormControl>
        </HStack>
        <HStack my={4} w="100%">
        <FormControl 
          isRequired={
            donneesPersonnelles.emprunteur?.type_profession !== "Retraité"
              ? true
              : false
          }>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              R.S. Employeur
            </FormLabel>
            <Input
              defaultValue={donneesPersonnelles.emprunteur?.rs_employeur}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              readOnly={!isEditing}
              size={"sm"}
              name="rs_employeur"
              type={"text"}
            />
          </FormControl>
       
          <FormControl
            my={3}
            
            isDisabled={
              donneesPersonnelles.emprunteur?.type_profession === "Retraité"
                ? false
                : true
            }
            isRequired={
              donneesPersonnelles.emprunteur?.type_profession === "Retraité"
                ? true
                : false
            }
          >
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              
            >
              Caisse
            </FormLabel>
            <Select
              size="sm"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              name="caisse"
              value={donneesPersonnelles.emprunteur?.caisse}
              pointerEvents={isEditing ? "" : "none"}
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
        <HStack w={"100%"} my={4}>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Date d'embauche
            </FormLabel>
            <InputGroup>
              <DatePicker
                selected={datembauche["emprunteur"]}
                id="customDatePicker"
                name="datembauche"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                required
                onChange={handleDateEmbauche}
                readOnly={!isEditing}
                portalId="root-portal"
              />
              <InputRightElement children={<AiOutlineCalendar />} pb={2} />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Revenue
            </FormLabel>
            <Input
              value={donneesPersonnelles.credit?.prospect_revenue}
              onChange={handleCreditDataChange}
              size={"sm"}
              name="prospect_revenue"
              type={"text"}
              readOnly={!isEditing}
            />
          </FormControl>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default ViewEmprunteur;
