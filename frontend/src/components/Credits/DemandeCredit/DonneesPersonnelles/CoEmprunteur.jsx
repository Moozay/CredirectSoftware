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
  Select
} from "@chakra-ui/react";

import "../Stepper/stepper.css";
import countryList from "react-select-country-list";
import {AiFillCaretDown} from 'react-icons/ai'
import { CreditContext } from 'context/CreditContext'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { AiOutlineCalendar } from "react-icons/ai";

const CoEmprunteur = ({ handleDonnesPersonnellesChange, hasCoEmprunteur }) => {
  const options = useMemo(() => countryList().getData(), [])
  const {donneesPersonelles, setDonneesPersonelles} = useContext(CreditContext)
  const {datenaissance, setDateNaissance} = useContext(CreditContext)
  const {datembauche, setDatembauche} = useContext(CreditContext)
  const [section, setSection] = useState("co_emprunteur")

  const handleDateNaissanceChange = (date) => {
    const newDateNaissance = {...datenaissance}
    newDateNaissance["co_emprunteur_date"] = date
    setDateNaissance(newDateNaissance)

    const newFormDonneesPersonelles = { ...donneesPersonelles }

    newFormDonneesPersonelles[section]["datenaissance"] = new Date(date).toISOString()

    setDonneesPersonelles(newFormDonneesPersonelles)
  };
  const handleDateEmbauche = (date) => {
    const newDateEmbauche = {...datembauche}
    newDateEmbauche["co_emprunteur_date"] = date
    setDatembauche(newDateEmbauche)
    const newFormDonneesPersonelles = { ...donneesPersonelles }

      newFormDonneesPersonelles[section]["datembauche"] = new Date(date).toISOString()

      setDonneesPersonelles(newFormDonneesPersonelles)
  }
  useEffect(() => {
    console.log(hasCoEmprunteur);
  }, [donneesPersonelles]);

  return (
    <Flex flexDir={"row"} justifyContent="space-between">
      <VStack alignItems={"flex-start"} w="100%" mx="3">
        <HStack w="100%" my={4}>
          <FormControl  variant="floating" my={3} isRequired={hasCoEmprunteur}>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["nom"] ? "scale(0.85) translateY(-35px)" : ""
              }
            >
              Nom
            </FormLabel>
            <Input
              size="sm"
              name="nom"
              _placeholder={{ color: "gray.500" }}
              defaultValue={donneesPersonelles[section]["nom"]}
              onChange={(e)=>handleDonnesPersonnellesChange(e,section)}
              type="text"
            />
          </FormControl>
          <FormControl my={3}  variant="floating" isRequired={hasCoEmprunteur}>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              
              transform={
                donneesPersonelles[section]["prenom"] ? "scale(0.85) translateY(-35px)" : ""
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
              onChange={(e)=>handleDonnesPersonnellesChange(e,section)}
            />
          </FormControl>
        </HStack>
        <HStack my={4} w="100%">
         
          <FormControl my={3}  variant="floating" isRequired={hasCoEmprunteur}>
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
              name="lieunaissance"
              size="sm"
              _placeholder={{ color: "gray.500" }}
              type="text"
              defaultValue={donneesPersonelles[section]["lieunaissance"]}
              onChange={(e)=>handleDonnesPersonnellesChange(e,section)}
            />
          </FormControl>
          <FormControl my={3} variant="floating" isRequired={hasCoEmprunteur}>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["nationalite"] ? "scale(0.85) translateY(-35px)" : ""
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
              onChange={(e)=>handleDonnesPersonnellesChange(e,section)}
            />
          </FormControl>
        </HStack>
        <HStack my={4} w="100%">
          <FormControl my={3} variant="floating" isRequired={hasCoEmprunteur}>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["telephone"] ? "scale(0.85) translateY(-35px)" : ""
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
              onChange={(e)=>handleDonnesPersonnellesChange(e,section)}
            />
          </FormControl>  <FormControl my={3} variant="floating"isRequired={hasCoEmprunteur} >
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["telpro"] ? "scale(0.85) translateY(-35px)" : ""
              }
            >
              Téléphone Professionnel
            </FormLabel>
            <Input
              name="telpro"
              size="sm"
              defaultValue={donneesPersonelles[section]["telpro"]}
              _placeholder={{ color: "gray.500" }}
              type="text"
              onChange={(e)=>handleDonnesPersonnellesChange(e,section)}
            />
          </FormControl>

        </HStack>
        <HStack my={4} w="100%">
          <FormControl my={3} variant="floating" isRequired={hasCoEmprunteur}>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["profession"] ? "scale(0.85) translateY(-35px)" : ""
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
              onChange={(e)=>handleDonnesPersonnellesChange(e,section)}
            />
          </FormControl>
          <FormControl my={3} variant="floating" isRequired={hasCoEmprunteur}>
            <FormLabel fontSize={"sm"}fontWeight="normal"
              transform={
                donneesPersonelles[section]["situation"] ? "scale(0.85) translateY(-35px)" : ""
              }>Situation Familiale</FormLabel>
            <Select 
              size="sm" 
              onChange={(e)=>handleDonnesPersonnellesChange(e,section)}
              name="situation"
              defaultValue={donneesPersonelles[section]["situation"]}
              >
              <option ></option>
              <option value="Célibataire" key="Célibataire">Célibataire</option>
              <option value="Marié(e)" key="Marié(e)">Marié(e)</option>
            </Select>
          </FormControl>
        
        </HStack>
        <HStack my={4} w="100%">
          <FormControl my={3} variant="floating" isRequired={hasCoEmprunteur}>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={datembauche["co_emprunteur_date"] ? "scale(0.85) translateY(-35px)" : ""}
            >
              Date D'embauche
            </FormLabel>
            <InputGroup>
              <DatePicker
                id="customDatePicker"
                selected={datembauche["co_emprunteur_date"]}
                onChange={handleDateEmbauche}
                name="datembauche"
              />
              <InputRightElement children={<AiOutlineCalendar />} pb={2} />
            </InputGroup>
          </FormControl>
          <FormControl my={3} variant="floating" isRequired={hasCoEmprunteur}>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["revenue"] ? "scale(0.85) translateY(-35px)" : ""
              }
            >
              Revenus Mensuel
            </FormLabel>
            <Input
              size="sm"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="revenue"
              defaultValue={donneesPersonelles[section]["revenue"]}
              onChange={(e)=>handleDonnesPersonnellesChange(e,section)}
            />
          </FormControl>
        </HStack>
      </VStack>
      <VStack alignItems={"flex-start"} w="100%" mx="3">
        <HStack my={4} w="100%">
          <FormControl my={3} variant="floating" isRequired={hasCoEmprunteur}>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["cin_sejour"] ? "scale(0.85) translateY(-35px)" : ""
              }
            >
              N. Cin/Sejour
            </FormLabel>
            <Input
              size="sm"
              _placeholder={{ color: "gray.500" }}
              type="text"
              defaultValue={donneesPersonelles[section]["cin_sejour"]}
              name="cin_sejour"
              onChange={(e)=>handleDonnesPersonnellesChange(e,section)}
            />
          </FormControl>
          <FormControl my={3}  variant="floating" isRequired={hasCoEmprunteur}>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={datenaissance["co_emprunteur_date"] ? "scale(0.85) translateY(-35px)" : ""}
            >
              Date de naissance
            </FormLabel>
            <InputGroup>
              <DatePicker
                id="customDatePicker"
                selected={datenaissance["co_emprunteur_date"]}
                onChange={handleDateNaissanceChange}
                name="datenaissance"
                dateFormat="dd/MM/yy"
              />
              <InputRightElement children={<AiOutlineCalendar />} pb={2} />
            </InputGroup>
          </FormControl>
        </HStack>
        <HStack my={4} w="100%">
        <FormControl my={3} variant="floating" isRequired={hasCoEmprunteur}>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["adresse"] ? "scale(0.85) translateY(-35px)" : ""
              }
            >
              Adresse
            </FormLabel>
            <Input
              size="sm"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="adresse"
              defaultValue={donneesPersonelles[section]["adresse"]}
              onChange={(e)=>handleDonnesPersonnellesChange(e,section)}
            />
          </FormControl>
          <FormControl my={3} variant="floating" isRequired={hasCoEmprunteur}>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                donneesPersonelles[section]["ville"] ? "scale(0.85) translateY(-35px)" : ""
              }
            >
              Ville de residence
            </FormLabel>
            <Input
              size="sm"
              _placeholder={{ color: "gray.500" }}
              type="text"
              name="ville"
              defaultValue={donneesPersonelles[section]["ville"]}
              onChange={(e)=>handleDonnesPersonnellesChange(e,section)}
            />
          </FormControl>
        </HStack>
        <HStack my={4} w="100%">
          <FormControl my={3} variant="floating" isRequired={hasCoEmprunteur}>
            <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                donneesPersonelles[section]["pays"] ? "scale(0.85) translateY(-35px)" : ""
              }>Pays</FormLabel>
            <Select  
            size='sm' 
            name="pays"
            onChange={(e)=>handleDonnesPersonnellesChange(e,section)}
            icon={<AiFillCaretDown/>}
            w="100%"
            value={donneesPersonelles[section]["pays"]}
            >
                <option></option>
                {
                    options.map( country => {
                        
                    return  (
                        
                        <option key={country.label} value={country.label} css={{"width":"100%"}} >{country.label}</option>
                     )
                    })
                }
                            
        </Select>
          </FormControl>
        </HStack>
        
      </VStack>
    </Flex>
  )
}

export default CoEmprunteur