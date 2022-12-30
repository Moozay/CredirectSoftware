import React, { useContext, useMemo } from "react";
import {
  Flex,
  VStack,
  HStack,
  FormLabel,
  Input,
  FormControl,
  Code,
  InputGroup,
  InputRightAddon,
  Select,
} from "@chakra-ui/react";
import { AiFillCaretDown } from "react-icons/ai";
import countryList from "react-select-country-list";
import CurrencyFormat from "react-currency-format";
import { UpdateContext } from "context/UpdateContext";
import { useColorMode } from "@chakra-ui/color-mode";
const ViewObjetCredit = ({
  credit,
  index,
  handleAdresseChange,
  handleCreditDataChange,
}) => {
  const options = useMemo(() => countryList().getData(), []);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isEditing } = useContext(UpdateContext);

  const Garanties = [
    "Hypotheque en 1er rang sur le TF objet du credit",
    "Nantissement sur le fonds de commerce",
    "Caution personnelle et solidaire",
    "Caution hypothecaire",
    "Domiciliation de salaire",
    "Engagement de domiciliation des revenus",
  ];
  return (
    <>
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
            pointerEvents={isEditing ? "" : "none"}
            defaultValue={credit["objet_credit"]}
            onChange={(e) => handleCreditDataChange(e, index)}
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
            pointerEvents={isEditing ? "" : "none"}
            name="nature_bien"
            onChange={(e) => handleCreditDataChange(e, index)}
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
            pointerEvents={isEditing ? "" : "none"}
            defaultValue={credit["etat_bien"]}
            placeholder=""
            onChange={(e) => handleCreditDataChange(e, index)}
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
            pointerEvents={isEditing ? "" : "none"}
            defaultValue={credit["usage_bien"]}
            onChange={(e) => handleCreditDataChange(e, index)}
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
        <FormControl id="Nom" isRequired variant="floatingDown">
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
              value={credit["montant_travaux"]? credit["montant_travaux"]:""}
              customInput={Input}
              onChange={(e) => handleCreditDataChange(e, index)}
              decimalSeparator=","
              thousandSeparator=" "
              isReadOnly={!isEditing}
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
            isReadOnly={!isEditing}
            size="sm"
            name="adresse1"
            _placeholder={{ color: "gray.500" }}
            defaultValue={credit.adresse_bien?.adresse1}
            type="text"
            onChange={(e) => handleAdresseChange(e, index)}
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
            isReadOnly={!isEditing}
            _placeholder={{ color: "gray.500" }}
            defaultValue={credit.adresse_bien?.ville}
            type="text"
            onChange={(e) => handleAdresseChange(e, index)}
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
            icon={<AiFillCaretDown />}
            w="100%"
            onChange={(e) => handleAdresseChange(e, index)}
            defaultValue={credit.adresse_bien?.pays}
            pointerEvents={isEditing ? "" : "none"}
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
              value={credit["montant_acte"]?credit["montant_acte"]:""}
              decimalSeparator=","
              thousandSeparator=" "
              isReadOnly={!isEditing}
              onChange={(e) => handleCreditDataChange(e, index)}
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
              value={credit["montant_venal"]? credit["montant_venal"]:""}
              customInput={Input}
              onChange={(e) => handleCreditDataChange(e, index)}
              decimalSeparator=","
              thousandSeparator=" "
              decimalScale={2}
              isReadOnly={!isEditing}
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
              defaultValue={credit["superficie"]}
              isReadOnly={!isEditing}
              onChange={(e) => handleCreditDataChange(e, index)}
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
              defaultValue={credit["titre_foncier"]}
              isReadOnly={!isEditing}
              onChange={(e) => handleCreditDataChange(e, index)}
            />
          </InputGroup>
        </FormControl>
      </HStack>
      <HStack alignItems={"flex-start"} mb="9">
        <FormControl id="Nom" isRequired variant="floatingDown" w="25%">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={
              credit["garanties"] ? "scale(0.85) translateY(29px)" : ""
            }
          >
            Garanties
          </FormLabel>
          <Select
            name="garanties"
            defaultValue={credit["garanties"]}
            placeholder=""
            size="sm"
            onChange={(e) => handleCreditDataChange(e, index)}
            pointerEvents={isEditing ? "" : "none"}
          >
            <option></option>
            {Garanties.map((garanties, index) => (
              <option value={garanties} key={index}>
                {garanties}
              </option>
            ))}
          </Select>
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
                onChange={(e) => handleCreditDataChange(e, index)}
                value={credit["promoteur"]}
                size="sm"
                pointerEvents={isEditing ? "" : "none"}

              >
                <option></option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </Select>
            </FormControl>

            {credit["promoteur"] === "Oui" && <FormControl
              id="Nom"
              //isReadOnly={credit["promoteur"] === "Oui" ? false : true}
              isRequired
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
                  onChange={(e) => handleCreditDataChange(e, index)}
                  defaultValue={credit["promoteur_nom"]}
                  isReadOnly={!isEditing}

                />
              </InputGroup>
            </FormControl>}
          </>
        )}
      </HStack>
    </>
  );
};

export default ViewObjetCredit;
