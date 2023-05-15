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
import { UpdateContext } from "context/UpdateContext";
import { Country, State } from "country-state-city";

const ViewCoEmprunteur = ({
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
      value: { name: state.name },
      ...state,
    }));
  const { datenaissance, datembauche, setDateNaissance, setDatembauche } =
    useContext(UpdateContext);
  const [section, setSection] = useState("co_emprunteur");
  const { donneesPersonnelles, Pays, isEditing, setDonneesPersonnelles } =
    useContext(UpdateContext);

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
    console.log(donneesPersonnelles);
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
    console.log("files loaded");
    for (let index = 0; index < countries.length; index++) {
      if (Pays.co_emprunteur == countries[index].name) {
        setCountryId(countries[index].isoCode);
        console.log(countryId);
      }
    }
  }, [Pays]);
  return (
    <HStack alignItems={"flex-start"} mb={5}>
      <VStack alignItems={"flex-start"} w="100%" mx={3}>
        <HStack w={"100%"} my={4}>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Nom
            </FormLabel>
            <Input
              defaultValue={donneesPersonnelles.co_emprunteur?.nom}
              readOnly={!isEditing}
              size={"sm"}
              name="nom"
              type={"text"}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Prenom
            </FormLabel>
            <Input
              defaultValue={donneesPersonnelles.co_emprunteur?.prenom}
              readOnly={!isEditing}
              size={"sm"}
              name="prenom"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
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
              defaultValue={donneesPersonnelles.co_emprunteur?.lieunaissance}
              readOnly={!isEditing}
              size={"sm"}
              name="lieunaissance"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              type={"text"}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Nationalite
            </FormLabel>
            <Input
              defaultValue={donneesPersonnelles.co_emprunteur?.nationalite}
              readOnly={!isEditing}
              size={"sm"}
              name="nationalite"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
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
              defaultValue={donneesPersonnelles.co_emprunteur?.telephone}
              readOnly={!isEditing}
              size={"sm"}
              name="telephone"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              type={"text"}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              R.S. Employeur
            </FormLabel>
            <Input
              defaultValue={donneesPersonnelles.co_emprunteur?.rs_employeur}
              readOnly={!isEditing}
              size={"sm"}
              name="rs_employeur"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              type={"text"}
            />
          </FormControl>
        </HStack>
        <HStack w={"100%"} my={4}>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Profession
            </FormLabel>
            <Input
              defaultValue={donneesPersonnelles.co_emprunteur?.profession}
              readOnly={!isEditing}
              size={"sm"}
              name="profession"
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              type={"text"}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Situation Familiale
            </FormLabel>
            <Select
              pointerEvents={isEditing ? "" : "none"}
              value={donneesPersonnelles.co_emprunteur?.situation}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              name="situation"
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
        </HStack>
        <HStack w={"100%"} my={4}>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Date d'embauche
            </FormLabel>
            <InputGroup>
              <DatePicker
                selected={datembauche.co_emprunteur}
                id="customDatePicker"
                name="datembauche"
                showMonthDropdown
                onChange={handleDateEmbauche}
                showYearDropdown
                dropdownMode="select"
                required
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
              defaultValue={donneesPersonnelles.co_emprunteur?.revenue}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              size={"sm"}
              name="revenue"
              type={"number"}
              readOnly={!isEditing}
            />
          </FormControl>
        </HStack>
        <HStack w={"50%"} my={4}>
          <FormControl isRequired>
            <FormLabel fontSize={"sm"} fontWeight="normal">
              Part de partipation
            </FormLabel>
            <Input
              value={donneesPersonnelles.co_emprunteur?.participation}
              onChange={(e) => handleDonnesPersonnellesChange(e, section)}
              readOnly
              size={"sm"}
              name="participation"
              type={"text"}
            />
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
              defaultValue={donneesPersonnelles.co_emprunteur?.cin_sejour}
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
                selected={datenaissance.co_emprunteur}
                id="customDatePicker"
                name="datenaissance"
                showMonthDropdown
                onChange={handleDateNaissanceChange}
                showYearDropdown
                dropdownMode="select"
                required
                readOnly={!isEditing}
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
              pointerEvents={isEditing ? "" : "none"}
              size="sm"
              name="pays"
              value={donneesPersonnelles.co_emprunteur?.adresse?.pays}
              icon={<AiFillCaretDown />}
              w="100%"
              onChange={(e) => {
                var countryId = e.target.selectedOptions[0].id;
                console.log(e);
                setCountryId(countryId);
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
              pointerEvents={isEditing ? "" : "none"}
              size="sm"
              name="pays"
              value={donneesPersonnelles.co_emprunteur?.adresse?.ville}
              icon={<AiFillCaretDown />}
              w="100%"
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
              readOnly={!isEditing}
              onChange={(e) => handleAdresseChange(e, section)}
              defaultValue={
                donneesPersonnelles.co_emprunteur?.adresse?.adresse1
              }
              size={"sm"}
              name="adresse1"
              type={"text"}
            />
          </FormControl>
        </HStack>
      </VStack>
    </HStack>
  );
};

export default ViewCoEmprunteur;
