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
  Textarea,
} from "@chakra-ui/react";
import { CreditContext } from "context/CreditContext";
import CurrencyFormat from "react-currency-format";
import { useContext } from "react";
const  ViewCaracteristicsCredit = ({handleCreditDataChange,credit, index}) => {
  return (
    <VStack>
      <HStack justifyContent={"space-between"} w="100%" pt={4}>
        <FormControl isRequired variant="floatingDown">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={credit["montant"] ? "scale(0.85) translateY(29px)" : ""}
          >
            Montant
          </FormLabel>
          <InputGroup size="sm">
            <CurrencyFormat
              name="montant"
              value={credit["montant"]}
              customInput={Input}
              decimalSeparator=","
              thousandSeparator=" "
              decimalScale={2}
              fixedDecimalScale={true}
              onChange={(e) => handleCreditDataChange(e, index)}
            />
            <InputRightAddon children="د.م" />
          </InputGroup>
        </FormControl>
        <FormControl isRequired variant="floatingDown" mt={2}>
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit["duree_credit"] ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Durée
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="duree_credit"
              value={credit["duree_credit"]}
              onChange={(e) => handleCreditDataChange(e, index)}
            />
            <InputRightAddon children="mois" />
          </InputGroup>
        </FormControl>
        <FormControl isRequired variant="floatingDown" mt={2}>
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit["frequence"] ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Fréquence de remboursement
          </FormLabel>
          <Select
            placeholder=""
            size="sm"
            name="frequence"
            value={credit["frequence"]}
            onChange={(e) => handleCreditDataChange(e, index)}
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
      <FormControl isRequired variant="floatingDown" mt={2}>
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={credit["taux"] ? "scale(0.85) translateY(29px)" : ""}
          >
            Taux souhaité
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="taux"
              value={credit["taux"]}
              onChange={(e) => handleCreditDataChange(e, index)}
            />
            <InputRightAddon children="%" />
          </InputGroup>
        </FormControl>
        <FormControl isRequired variant="floatingDown">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit["mensualite"] ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Mensualité TTC
          </FormLabel>
          <InputGroup size="sm">
            <CurrencyFormat
              name="mensualite"
              value={credit["mensualite"]}
              customInput={Input}
              decimalSeparator=","
              thousandSeparator=" "
              decimalScale={2}
              fixedDecimalScale={true}
              displayType="input"
              isDisabled
              isNumericString
              onChange={(e) => handleCreditDataChange(e, index)}
            />
            <InputRightAddon children="د.م" />
          </InputGroup>
        </FormControl>
       

        <FormControl isRequired variant="floatingDown">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit["franchise"] ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Durée de Franchise
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="franchise"
              value={credit["franchise"]}
              onChange={(e) => handleCreditDataChange(e, index)}
            />
            <InputRightAddon children="mois" />
          </InputGroup>
        </FormControl>
      </HStack>
      <HStack justifyContent={"space-between"} w="100%" pt={4}>
        <FormControl isRequired variant="floatingDown">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit["taux_endt"] ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Taux D'endet. projet
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="taux_endt"
              value={credit["taux_endt"]}
              isDisabled
              onChange={(e) => handleCreditDataChange(e, index)}
            />
            <InputRightAddon children="%" />
          </InputGroup>
        </FormControl>
        <FormControl isRequired variant="floatingDown" mt={2}>
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={credit["teg"] ? "scale(0.85) translateY(29px)" : ""}
          >
            TEG
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="teg"
              onChange={(e) => handleCreditDataChange(e, index)}
              value={credit["teg"]}
              isDisabled
            />
            <InputRightAddon children="%" />
          </InputGroup>
        </FormControl>
        <FormControl isRequired variant="floatingDown" mt={2}>
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit["qot_financement"] ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Quotité financement
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="qot_financement"
              value={credit["qot_financement"]}
              isDisabled
              onChange={(e) => handleCreditDataChange(e, index)}
            />
            <InputRightAddon children="%" />
          </InputGroup>
        </FormControl>
      </HStack>
      <HStack justifyContent={"space-between"} w="100%" pt={4}>
        <FormControl isRequired mt={2}>
        <FormLabel
            fontSize={"sm"}
            fontWeight="normal">
            Commentaires
          </FormLabel>
          <Textarea w="33%" h="10%" name="commentaires" 
          onChange={(e) => handleCreditDataChange(e, index)}
          value={credit.commentaires}>

          </Textarea>
        </FormControl>
      </HStack>
    </VStack>
  );
};

export default  ViewCaracteristicsCredit;
