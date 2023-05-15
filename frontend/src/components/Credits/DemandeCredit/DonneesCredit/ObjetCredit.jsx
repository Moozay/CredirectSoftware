import React, { useContext, useMemo } from "react";
import {
  Flex,
  HStack,
  FormLabel,
  Input,
  FormControl,
  Code,
  InputGroup,
  InputRightAddon,
  Select,
  CheckboxGroup,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import { AiFillCaretDown } from "react-icons/ai";
import countryList from "react-select-country-list";
import CurrencyFormat from "react-currency-format";
import { CreditContext } from "context/CreditContext";
import { useColorMode } from "@chakra-ui/color-mode";
import { useState } from "react";
const ObjetCredit = ({ handleCreditDataChange, handleAdresseChange }) => {
  const { credit, setCredit } = useContext(CreditContext);
  const options = useMemo(() => countryList().getData(), []);
  const { colorMode, toggleColorMode } = useColorMode();
  const Garanties = [
    "Hypotheque en 1er rang sur le TF objet du credit",
    "Nantissement sur le fonds de commerce",
    "Caution personnelle et solidaire",
    "Caution hypothecaire",
    "Domiciliation de salaire",
    "Engagement de domiciliation des revenus",
  ];
  const handleGarantiesChange = (e) => {
    const newCredit = credit
    const status = e.target.checked
    const value = e.target.value
    if (status) {
      newCredit.garanties.push(value)
      setCredit(newCredit)
    }
    else{
      const index = newCredit.garanties.indexOf(value)
      if (index>-1){
        newCredit.garanties.splice(index,1)
      }
      setCredit(newCredit)
    }
    console.log(credit);
  };
  return (
    <>
      {/* <HStack direction='row' justifyContent={"space-between"}>
            <Code bgColor={colorMode == "light" ? '#f1f1f1':''} fontWeight="bold"w="98.4%"  borderColor="orange.200" children='Nature du Bien' p={1}  textAlign={"left"} />
            <Code bgColor={colorMode == "light" ? '#f1f1f1':''} fontWeight="bold"w="98.4%"  borderColor="orange.200" children='Etat du Bien' p={1}  textAlign={"left"} />
            <Code bgColor={colorMode == "light" ? '#f1f1f1':''} fontWeight="bold"w="98.4%" borderRight={"4px"} borderRightColor="orange.200" children='Usage du Bien' p={1}  textAlign={"left"} />            
      </HStack> */}

      <HStack alignItems={"flex-start"} mb="8">
        <FormControl id="Nom" isRequired variant="floatingDown">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit["objet_credit"] ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Objet du Crédit
          </FormLabel>
          <Select
            name="objet_credit"
            onChange={handleCreditDataChange}
            defaultValue={credit["objet_credit"]}
            size="sm"
          >
            <option></option>
            <option value="Hypothécaire">Hypothécaire</option>
            <option value="Acquisition">Acquisition</option>
            <option value="Acquisition + aménagement">
              Acquisition + aménagement
            </option>
            <option value="Acquisition + construction">
              Acquisition + Construction
            </option>
            <option value="Acquisition + rachat de crédit">
              Acquisition + rachat de crédit
            </option>
            <option value="Acquisition des parts">Acquisition des parts</option>
            <option value="Acquisition des parts et rachat de crédit">
              Acquisition des parts et rachat de crédit
            </option>
            <option value="Construction">Construction</option>
            <option value="Construction + rachat de crédit">
              Construction + rachat de crédit
            </option>
            <option value="Travaux de finition">Travaux de finition</option>
            <option value="Aménagement">Aménagement</option>
            <option value="Rachat de crédit">Rachat de crédit</option>
            <option value="Relais">Relais</option>
            <option value="In FINE">In FINE</option>
            <option value="Mourabaha">Mourabaha</option>
            <option value="Ijar">Ijar</option>
          </Select>
        </FormControl>
        <FormControl id="Nom" isRequired variant="floatingDown">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit["nature_bien"] ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Nature du Bien
          </FormLabel>
          <Select
            name="nature_bien"
            onChange={handleCreditDataChange}
            defaultValue={credit["nature_bien"]}
            size="sm"
          >
            <option></option>
            <option value="Appartement">Appartement</option>
            <option value="Villa">Villa</option>
            <option value="Maison">Maison</option>
            <option value="Terrain">Terrain</option>
            <option value="Local commercial">Local commercial</option>
            <option value="Bureau">Bureau</option>
            <option value="Bangalow/Pavillion">Bangalow/Pavillion</option>
          </Select>
        </FormControl>
        <FormControl id="Nom" isRequired variant="floatingDown">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit["etat_bien"] ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Etat du Bien
          </FormLabel>
          <Select
            name="etat_bien"
            onChange={handleCreditDataChange}
            defaultValue={credit["etat_bien"]}
            placeholder=""
            size="sm"
          >
            <option></option>
            <option value="Neuf">Neuf</option>
            <option value="Ancien">Ancien</option>
          </Select>
        </FormControl>
        <FormControl id="Nom" isRequired variant="floatingDown">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit["usage_bien"] ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Usage du Bien
          </FormLabel>
          <Select
            name="usage_bien"
            onChange={handleCreditDataChange}
            defaultValue={credit["usage_bien"]}
            size="sm"
          >
            <option></option>
            <option value="Résidence Principale">Résidence Principale</option>
            <option value="Résidence Secondaire">Résidence Secondaire</option>
            <option value="Professionnel">Professionnel</option>
            <option value="Locatif">Locatif</option>
          </Select>
        </FormControl>
      </HStack>

      <HStack alignItems={"flex-start"} mb="5">
        <FormControl id="Nom" variant="floatingDown">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit["montant_travaux"] ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Montant Travaux
          </FormLabel>

          <InputGroup size="sm">
            <CurrencyFormat
              name="montant_travaux"
              onChange={handleCreditDataChange}
              value={credit.montant_travaux}
              customInput={Input}
              decimalSeparator=","
              thousandSeparator=" "
              decimalScale={2}
              fixedDecimalScale={true}
            />
            <InputRightAddon children="د.م" />
          </InputGroup>
        </FormControl>
        <FormControl id="Nom" isRequired variant="floatingDown">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit.adresse_bien?.adresse1
                ? "scale(0.85) translateY(29px)"
                : ""
            }
          >
            Adresse
          </FormLabel>
          <Input
            size="sm"
            name="adresse1"
            _placeholder={{ color: "gray.500" }}
            defaultValue={credit.adresse_bien?.adresse1}
            onChange={handleAdresseChange}
            type="text"
          />
        </FormControl>
        <FormControl id="Nom" isRequired variant="floatingDown">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit.adresse_bien?.ville ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Ville
          </FormLabel>
          <Input
            size="sm"
            name="ville"
            _placeholder={{ color: "gray.500" }}
            defaultValue={credit.adresse_bien?.ville}
            onChange={handleAdresseChange}
            type="text"
          />
        </FormControl>
        <FormControl id="Nom" isRequired variant="floatingDown">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit.adresse_bien?.pays ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Pays
          </FormLabel>
          <Select
            size="sm"
            name="pays"
            onChange={handleAdresseChange}
            icon={<AiFillCaretDown />}
            w="100%"
            defaultValue={credit.adresse_bien?.pays}
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
      {/* <HStack direction='row' justifyContent={"space-between"}>        
          <Code 
          bgColor={colorMode == "light" ? '#f1f1f1':''} 
          fontWeight="bold" 
          children="Montant valeur à l'acte" p={1}  w="98.4%" borderLeft={"4px"} borderBottomRadius={"0%"}borderLeftColor="orange.200" textAlign={"left"} />            
          <Code 
          bgColor={colorMode == "light" ? '#f1f1f1':''} 
          fontWeight="bold" 
          children="Montant valeur vénale" p={1} w="98.4%"  textAlign={"left"} />
          <Code 
          bgColor={colorMode == "light" ? '#f1f1f1':''} 
          fontWeight="bold" 
          children='Superficie' p={1} w="98.4%" borderRight={"4px"} borderRightColor="orange.200" textAlign={"left"} />
      </HStack> */}
      <HStack alignItems={"flex-start"} mb="8">
        <FormControl id="Nom" isRequired variant="floatingDown">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit["montant_acte"] ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Montant valeur à l'acte
          </FormLabel>

          <InputGroup size="sm">
            <CurrencyFormat
              name="montant_acte"
              customInput={Input}
              onChange={handleCreditDataChange}
              value={credit["montant_acte"]}
              decimalSeparator=","
              thousandSeparator=" "
              decimalScale={2}
              fixedDecimalScale={true}
            />
            <InputRightAddon children="د.م" />
          </InputGroup>
        </FormControl>
        <FormControl id="Nom" isRequired variant="floatingDown">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit["montant_venal"] ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Montant valeur vénale
          </FormLabel>
          <InputGroup size="sm">
            <CurrencyFormat
              name="montant_venal"
              onChange={handleCreditDataChange}
              value={credit["montant_venal"]}
              customInput={Input}
              decimalSeparator=","
              thousandSeparator=" "
              decimalScale={2}
              fixedDecimalScale={true}
            />
            <InputRightAddon children="د.م" />
          </InputGroup>
        </FormControl>
        <FormControl id="Nom" isRequired variant="floatingDown">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit["superficie"] ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Superficie
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="superficie"
              onChange={handleCreditDataChange}
              defaultValue={credit["superficie"]}
            />
            <InputRightAddon children="m²" />
          </InputGroup>
        </FormControl>
        <FormControl id="Nom" isRequired variant="floatingDown">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit["titre_foncier"] ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Titre Froncier
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="titre_foncier"
              onChange={handleCreditDataChange}
              defaultValue={credit["titre_foncier"]}
            />
          </InputGroup>
        </FormControl>
      </HStack>
      <HStack alignItems={"flex-start"} mb="5" >
        <FormControl id="Nom" w="24.5%">
          <FormLabel fontSize={"sm"} fontWeight="normal">
            Garanties:
          </FormLabel>
          <CheckboxGroup colorScheme="orange" defaultValue={credit["garanties"]}>
            <Stack spacing={[1, 1]} direction={"column"}>
              {Garanties.map((garanties, index) => (
                <Checkbox size={"sm"} onChange={handleGarantiesChange} value={garanties}>
                  {garanties}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>
        {credit.type_credit === "immobilier" && (
          <>
            <FormControl id="Nom" isRequired variant="floatingDown" w="24.5%">
              <FormLabel
                fontSize={"sm"}
                fontWeight="normal"
                transform={
                  credit["promoteur"] ? "scale(0.85) translateY(29px)" : ""
                }
              >
                Promoteur
              </FormLabel>
              <Select
                name="promoteur"
                onChange={handleCreditDataChange}
                defaultValue={credit["promoteur"]}
                size="sm"
              >
                <option></option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </Select>
            </FormControl>

            <FormControl
              id="Nom"
              isDisabled={credit["promoteur"] === "Oui" ? false : true}
              isRequired={credit["promoteur"] === "Oui" ? true : false}
              variant="floatingDown"
              w="24.5%"
            >
              <FormLabel
                fontSize={"sm"}
                fontWeight="normal"
                transform={
                  credit["promoteur_nom"] ? "scale(0.85) translateY(29px)" : ""
                }
              >
                Promoteur Nom
              </FormLabel>
              <InputGroup size="sm">
                <Input
                  name="promoteur_nom"
                  onChange={handleCreditDataChange}
                  defaultValue={credit["promoteur_nom"]}
                />
              </InputGroup>
            </FormControl>
          </>
        )}
      </HStack>
    </>
  );
};

export default ObjetCredit;
