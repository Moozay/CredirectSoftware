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
  Stack,
  CheckboxGroup,
  Checkbox,
  Select,
  Textarea,
} from "@chakra-ui/react";
import { CreditContext } from "context/CreditContext";
import CurrencyFormat from "react-currency-format";
import { useContext } from "react";

const CaracteristicsCredit = ({ handleCreditDataChange }) => {
  const { credit, setCredit,banquEnvoye, setBanquEnvoye } = useContext(CreditContext);
  const handleBanqueEnvoyeChange = (e) => {
    const newBanquEnvoye = banquEnvoye
    const status = e.target.checked
    const value = e.target.value
    if (status) {
      newBanquEnvoye.push(value)
      setBanquEnvoye(newBanquEnvoye)
    }
    else{
      const index = newBanquEnvoye.indexOf(value)
      if (index>-1){
        newBanquEnvoye.splice(index,1)
      }
      setBanquEnvoye(newBanquEnvoye)
    }
    console.log(banquEnvoye);
  };
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
              onChange={handleCreditDataChange}
              value={credit["montant"]}
              customInput={Input}
              decimalSeparator=","
              thousandSeparator=" "
              decimalScale={2}
              fixedDecimalScale={true}
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
              onChange={handleCreditDataChange}
              value={credit["duree_credit"]}
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
            onChange={handleCreditDataChange}
            value={credit["frequence"]}
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
            transform={credit["taux_demande"] ? "scale(0.85) translateY(29px)" : ""}
          >
            Taux demandé
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="taux_demande"
              onChange={handleCreditDataChange}
              value={credit["taux_demande"]}
            />
            <InputRightAddon children="%" />
          </InputGroup>
        </FormControl>
        <FormControl isRequired variant="floatingDown" mt={2}>
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={credit["taux"] ? "scale(0.85) translateY(29px)" : ""}
          >
            Taux appliqué
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="taux"
              onChange={handleCreditDataChange}
              value={credit["taux"]}
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
              onChange={handleCreditDataChange}
              value={credit["mensualite"]}
              customInput={Input}
              decimalSeparator=","
              thousandSeparator=" "
              decimalScale={2}
              fixedDecimalScale={true}
              displayType="input"
              isDisabled
              isNumericString
            />
            <InputRightAddon children="د.م" />
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
              onChange={handleCreditDataChange}
              value={credit["taux_endt"]}
              isDisabled
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
              onChange={handleCreditDataChange}
              value={credit["teg"]}
              isDisabled
            />
            <InputRightAddon children="%" />
          </InputGroup>
        </FormControl>
        <FormControl  variant="floatingDown">
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
              onChange={handleCreditDataChange}
              value={credit["franchise"]}
            />
            <InputRightAddon children="mois" />
          </InputGroup>
        </FormControl>
       
      </HStack>
      <HStack w="100%" pt={4}>
      <FormControl w={"33%"} isRequired variant="floatingDown" mt={2}>
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
              onChange={handleCreditDataChange}
              value={credit["qot_financement"]}
              isDisabled
            />
            <InputRightAddon children="%" />
          </InputGroup>
        </FormControl>
      </HStack>
      <HStack justifyContent={"space-around"} w="100%" pt={4}>
        <FormControl >
        <FormLabel
            fontSize={"sm"}
            fontWeight="normal">
            Commentaires
          </FormLabel>
          <Textarea rows={7} w={"33%"} name="commentaires" value={credit.commentaires} onChange={handleCreditDataChange}/>
        </FormControl>
      </HStack>
      
      
    </VStack>
  );
};

export default CaracteristicsCredit;
