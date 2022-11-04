import React from "react";
import {
  HStack,
  VStack,
  Text,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightAddon,
  Input,
  Select,
} from "@chakra-ui/react";
import { CreditContext } from "context/CreditContext";
import { useContext } from "react";
const CaracteristicsCredit = ({handleCreditDataChange}) => {
  const {credit, SetCredit} = useContext(CreditContext)
  return (
    <VStack>
      <HStack justifyContent={"space-between"} w="100%" pt={4}>
        <FormControl  isRequired variant="floatingDown"     >
          <FormLabel 
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                credit["montant"] ? "scale(0.85) translateY(29px)" : ""
              }>Montant</FormLabel>
          <InputGroup size="sm">
            <Input name="montant"
                  onChange={handleCreditDataChange}
                  defaultValue={credit["montant"]} />
            <InputRightAddon children="د.م" />
          </InputGroup>
        </FormControl>
        <FormControl  isRequired variant="floatingDown" mt={2} >
          <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["duree_credit"] ? "scale(0.85) translateY(29px)" : ""
              }>Durée</FormLabel>
          <InputGroup size="sm">
            <Input name="duree_credit"
                  onChange={handleCreditDataChange}
                  defaultValue={credit["duree_credit"]} />
                  <InputRightAddon children="mois" />
          </InputGroup>
        </FormControl>
        <FormControl  isRequired variant="floatingDown" mt={2} >
          <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["frequence"] ? "scale(0.85) translateY(29px)" : ""
              }>Fréquence de remboursement</FormLabel>
          <Select placeholder="" size="sm"name="frequence"
                  onChange={handleCreditDataChange}
                  defaultValue={credit["frequence"]} >
            <option></option>
            <option value="mensuelle">Mensuelle</option>
            <option value="trimestrielle">Trimestrielle</option>
            <option value="semestielle">Semestielle</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>
        
       
      </HStack>
      <HStack justifyContent={"space-between"} w="100%" pt={4} >
      <FormControl  isRequired variant="floatingDown"  >
          <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["mensualite"] ? "scale(0.85) translateY(29px)" : ""
              }>Mensualité TTC</FormLabel>
          <InputGroup size="sm">
            <Input name="mensualite"
                  onChange={handleCreditDataChange}
                  defaultValue={credit["mensualite"]} />
            <InputRightAddon children="د.م" />
          </InputGroup>
        </FormControl>
        <FormControl  isRequired variant="floatingDown" mt={2} >
          <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["taux"] ? "scale(0.85) translateY(29px)" : ""
              }>Taux souhaité</FormLabel>
          <InputGroup size="sm">
            <Input name="taux"
                  onChange={handleCreditDataChange}
                  defaultValue={credit["taux"]} />
            <InputRightAddon children="%" />
          </InputGroup>
        </FormControl>
        
        <FormControl  isRequired variant="floatingDown" >
          <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["franchise"] ? "scale(0.85) translateY(29px)" : ""
              }>Durée de Franchise</FormLabel>
          <InputGroup size="sm">
            <Input name="franchise"
                  onChange={handleCreditDataChange}
                  defaultValue={credit["franchise"]} />
                  <InputRightAddon children="mois" />
          </InputGroup>
        </FormControl>
      </HStack>
      <HStack justifyContent={"space-between"} w="100%" pt={4}>
      <FormControl  isRequired variant="floatingDown"  >
          <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["taux_endt"] ? "scale(0.85) translateY(29px)" : ""
              }>Taux D'endet. projet</FormLabel>
          <InputGroup size="sm">
            <Input name="taux_endt"
                  onChange={handleCreditDataChange}
                  defaultValue={credit["taux_endt"]} />
            <InputRightAddon children="%" />
          </InputGroup>
        </FormControl>
        <FormControl  isRequired variant="floatingDown" mt={2} >
          <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["teg"] ? "scale(0.85) translateY(29px)" : ""
              }>TEG</FormLabel>
          <InputGroup size="sm">
            <Input name="teg"
                  onChange={handleCreditDataChange}
                  defaultValue={credit["teg"]} />
            <InputRightAddon children="%" />
          </InputGroup>
        </FormControl>
        <FormControl  isRequired variant="floatingDown" mt={2} >
          <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["qot_financement"] ? "scale(0.85) translateY(29px)" : ""
              }>Quotité financement</FormLabel>
          <InputGroup size="sm">
            <Input name="qot_financement"
                  onChange={handleCreditDataChange}
                  defaultValue={credit["qot_financement"]}/>
            <InputRightAddon children="%" />
          </InputGroup>
        </FormControl>
      </HStack>
    </VStack>
  );
};

export default CaracteristicsCredit;
