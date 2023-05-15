import React from "react";
import {
  HStack,
  VStack,
  Text,
  Stack,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightAddon,
  Input,
  Select,
  Textarea,
  Checkbox,
  CheckboxGroup
} from "@chakra-ui/react";
import { UpdateContext } from "context/UpdateContext";
import CurrencyFormat from "react-currency-format";
import { useContext } from "react";
const ViewCaracteristicsCredit = ({
  handleCreditDataChange,

}) => {
  const {isEditing,donneesPersonnelles ,setDonneesPersonnelles} = useContext(UpdateContext)

  const banques = [
    "SGMB",
    "BP",
    "CDM",
    "BMCI",
    "SOFAC",
    "EQDOM",
    "WAFASALAF",
  ]

  return (
    <VStack>
      <HStack justifyContent={"space-between"} w="100%" pt={4}>
        <FormControl isRequired >
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
          >
            Montant
          </FormLabel>
          <InputGroup size="sm">
            <CurrencyFormat
              name="montant"
              value={donneesPersonnelles["credit"]["montant"]}
              customInput={Input}
              decimalSeparator=","
              thousandSeparator=" "
              decimalScale={2}
              isReadOnly={!isEditing}
              fixedDecimalScale={true}
              onChange={(e) => handleCreditDataChange(e)}
            />
            <InputRightAddon children="د.م" />
          </InputGroup>
        </FormControl>
        <FormControl isRequired  mt={2}>
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            
          >
            Durée
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="duree_credit"
              readOnly={!isEditing}
              value={donneesPersonnelles["credit"]["duree_credit"]}
              onChange={(e) => handleCreditDataChange(e)}
            />
            <InputRightAddon children="mois" />
          </InputGroup>
        </FormControl>
        <FormControl isRequired  mt={2}>
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            
          >
            Fréquence de remboursement
          </FormLabel>
          <Select
            placeholder=""
            size="sm"
            name="frequence"
            value={donneesPersonnelles["credit"]["frequence"]}
            pointerEvents={isEditing? "":"none"}
            onChange={(e) => handleCreditDataChange(e)}
          >
            <option></option>
            <option value="mensuelle">Mensuelle</option>
            <option value="trimestrielle">Trimestrielle</option>
            <option value="semestielle">Semestielle</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>
      </HStack>
      <HStack justifyContent={"space-between"} w="100%" pt={4}>
        <FormControl isRequired  mt={2}>
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
          >
            Taux demandé
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="taux_demande"
              readOnly={!isEditing}
              value={donneesPersonnelles["credit"]["taux_demande"]}
              onChange={(e) => handleCreditDataChange(e)}
            />
            <InputRightAddon children="%" />
          </InputGroup>
        </FormControl>
        <FormControl isRequired  mt={2}>
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
          >
            Taux appliqué
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="taux"
              readOnly={!isEditing}
              value={donneesPersonnelles["credit"]["taux"]}
              onChange={(e) => handleCreditDataChange(e)}
            />
            <InputRightAddon children="%" />
          </InputGroup>
        </FormControl>
        <FormControl isRequired >
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
           
          >
            Mensualité TTC
          </FormLabel>
          <InputGroup size="sm">
            <CurrencyFormat
              name="mensualite"
              value={donneesPersonnelles["credit"]["mensualite"]}
              customInput={Input}
              decimalSeparator=","
              thousandSeparator=" "
              decimalScale={2}
              fixedDecimalScale={true}
              displayType="input"
              isDisabled
              isNumericString
              onChange={(e) => handleCreditDataChange(e)}
            />
            <InputRightAddon children="د.م" />
          </InputGroup>
        </FormControl>

       
      </HStack>
      <HStack justifyContent={"space-between"} w="100%" pt={4}>
        <FormControl isRequired >
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            
          >
            Taux D'endet. projet
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="taux_endt"
              value={donneesPersonnelles["credit"]["taux_endt"]}
              isDisabled
              onChange={(e) => handleCreditDataChange(e)}
            />
            <InputRightAddon children="%" />
          </InputGroup>
        </FormControl>
        <FormControl isRequired  mt={2}>
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
          >
            TEG
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="teg"
              onChange={(e) => handleCreditDataChange(e)}
              value={donneesPersonnelles["credit"]["teg"]}
              isDisabled
            />
            <InputRightAddon children="%" />
          </InputGroup>
        </FormControl>
        <FormControl >
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            
          >
            Durée de Franchise
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="franchise"
              readOnly={!isEditing}
              value={donneesPersonnelles["credit"]["franchise"]}
              onChange={(e) => handleCreditDataChange(e)}
            />
            <InputRightAddon children="mois" />
          </InputGroup>
        </FormControl>
      </HStack>
      <HStack justifyContent={"space-between"} w="100%" pt={4}>
      <FormControl isRequired w={"33%"}  mt={2}>
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            
          >
            Quotité financement
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="qot_financement"
              readOnly={!isEditing}
              value={donneesPersonnelles["credit"]["qot_financement"]}
              isDisabled
              onChange={(e) => handleCreditDataChange(e)}
            />
            <InputRightAddon children="%" />
          </InputGroup>
        </FormControl>
      </HStack>
      <HStack justifyContent={"space-between"} w="100%" pt={4} mt={2}>
        <FormControl mt={2}>
          <FormLabel fontSize={"sm"} fontWeight="normal">
            Commentaires
          </FormLabel>
          <Textarea
            w="33%"
            rows={7}
            name="commentaires"
            readOnly={!isEditing}
            onChange={(e) => handleCreditDataChange(e)}
            value={donneesPersonnelles["credit"].commentaires}
          ></Textarea>
        </FormControl>
      </HStack>
    </VStack>
  );
};

export default ViewCaracteristicsCredit;
