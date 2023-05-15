import React, { useContext, useMemo } from "react";
import {
  Flex,
  VStack,
  HStack,
  FormLabel,
  Input,
  FormControl,
  Code,
  Stack,
  CheckboxGroup,
  Checkbox,
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
  handleAdresseChange,
  handleCreditDataChange,
}) => {
  const options = useMemo(() => countryList().getData(), []);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isEditing, donneesPersonnelles, setDonneesPersonnelles } =
    useContext(UpdateContext);

  const Garanties = [
    "Hypotheque en 1er rang sur le TF objet du credit",
    "Nantissement sur le fonds de commerce",
    "Caution personnelle et solidaire",
    "Caution hypothecaire",
    "Domiciliation de salaire",
    "Engagement de domiciliation des revenus",
  ];
  const handleGarantiesChange = (e) => {
    console.log(e);
    const newRecord = { ...donneesPersonnelles };
    const status = e.target.checked;
    const value = e.target.value;
    if (status) {
      newRecord.credit["garanties"].push(value);
      setDonneesPersonnelles(newRecord);
    } else {
      const position = newRecord.credit["garanties"].indexOf(value);
      if (position > -1) {
        newRecord.credit["garanties"].splice(position, 1);
      }
      setDonneesPersonnelles(newRecord);
    }
  };
  return (
    <>
      <HStack alignItems={"flex-start"} mb="8">
        <FormControl id="Nom" isRequired>
          <FormLabel fontSize={"sm"} fontWeight="normal">
            Objet du Crédit
          </FormLabel>
          <Select
            name="objet_credit"
            pointerEvents={isEditing ? "" : "none"}
            defaultValue={donneesPersonnelles["credit"]["objet_credit"]}
            onChange={(e) => handleCreditDataChange(e)}
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
        <FormControl id="Nom" isRequired>
          <FormLabel fontSize={"sm"} fontWeight="normal">
            Nature du Bien
          </FormLabel>
          <Select
            pointerEvents={isEditing ? "" : "none"}
            name="nature_bien"
            onChange={(e) => handleCreditDataChange(e)}
            defaultValue={donneesPersonnelles["credit"]["nature_bien"]}
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
        <FormControl id="Nom" isRequired>
          <FormLabel fontSize={"sm"} fontWeight="normal">
            Etat du Bien
          </FormLabel>
          <Select
            name="etat_bien"
            pointerEvents={isEditing ? "" : "none"}
            defaultValue={donneesPersonnelles["credit"]["etat_bien"]}
            placeholder=""
            onChange={(e) => handleCreditDataChange(e)}
            size="sm"
          >
            <option></option>
            <option value="Neuf">Neuf</option>
            <option value="Ancien">Ancien</option>
          </Select>
        </FormControl>
        <FormControl id="Nom" isRequired>
          <FormLabel fontSize={"sm"} fontWeight="normal">
            Usage du Bien
          </FormLabel>
          <Select
            name="usage_bien"
            pointerEvents={isEditing ? "" : "none"}
            defaultValue={donneesPersonnelles["credit"]["usage_bien"]}
            onChange={(e) => handleCreditDataChange(e)}
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
        <FormControl id="Nom">
          <FormLabel fontSize={"sm"} fontWeight="normal">
            Montant Travaux
          </FormLabel>

          <InputGroup size="sm">
            <CurrencyFormat
              name="montant_travaux"
              value={donneesPersonnelles["credit"]["montant_travaux"] ? donneesPersonnelles["credit"]["montant_travaux"] : ""}
              customInput={Input}
              onChange={(e) => handleCreditDataChange(e)}
              decimalSeparator=","
              thousandSeparator=" "
              isReadOnly={!isEditing}
              decimalScale={2}
              fixedDecimalScale={true}
            />
            <InputRightAddon children="د.م" />
          </InputGroup>
        </FormControl>
        <FormControl id="Nom" isRequired>
          <FormLabel fontSize={"sm"} fontWeight="normal">
            Adresse
          </FormLabel>
          <Input
            isReadOnly={!isEditing}
            size="sm"
            name="adresse1"
            _placeholder={{ color: "gray.500" }}
            defaultValue={donneesPersonnelles["credit"].adresse_bien?.adresse1}
            type="text"
            onChange={(e) => handleAdresseChange(e)}
          />
        </FormControl>
        <FormControl id="Nom" isRequired>
          <FormLabel fontSize={"sm"} fontWeight="normal">
            Ville
          </FormLabel>
          <Input
            size="sm"
            name="ville"
            isReadOnly={!isEditing}
            _placeholder={{ color: "gray.500" }}
            defaultValue={donneesPersonnelles["credit"].adresse_bien?.ville}
            type="text"
            onChange={(e) => handleAdresseChange(e)}
          />
        </FormControl>
        <FormControl id="Nom" isRequired>
          <FormLabel fontSize={"sm"} fontWeight="normal">
            Pays
          </FormLabel>
          <Select
            size="sm"
            name="pays"
            icon={<AiFillCaretDown />}
            w="100%"
            onChange={(e) => handleAdresseChange(e)}
            defaultValue={donneesPersonnelles["credit"].adresse_bien?.pays}
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
        <FormControl id="Nom" isRequired>
          <FormLabel fontSize={"sm"} fontWeight="normal">
            Montant valeur à l'acte
          </FormLabel>

          <InputGroup size="sm">
            <CurrencyFormat
              name="montant_acte"
              customInput={Input}
              value={donneesPersonnelles["credit"]["montant_acte"] ? donneesPersonnelles["credit"]["montant_acte"] : ""}
              decimalSeparator=","
              thousandSeparator=" "
              isReadOnly={!isEditing}
              onChange={(e) => handleCreditDataChange(e)}
              decimalScale={2}
              fixedDecimalScale={true}
            />
            <InputRightAddon children="د.م" />
          </InputGroup>
        </FormControl>
        <FormControl id="Nom" isRequired>
          <FormLabel fontSize={"sm"} fontWeight="normal">
            Montant valeur vénale
          </FormLabel>
          <InputGroup size="sm">
            <CurrencyFormat
              name="montant_venal"
              value={donneesPersonnelles["credit"]["montant_venal"] ? donneesPersonnelles["credit"]["montant_venal"] : ""}
              customInput={Input}
              onChange={(e) => handleCreditDataChange(e)}
              decimalSeparator=","
              thousandSeparator=" "
              decimalScale={2}
              isReadOnly={!isEditing}
              fixedDecimalScale={true}
            />
            <InputRightAddon children="د.م" />
          </InputGroup>
        </FormControl>
        <FormControl id="Nom" isRequired>
          <FormLabel fontSize={"sm"} fontWeight="normal">
            Superficie
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="superficie"
              defaultValue={donneesPersonnelles["credit"]["superficie"]}
              isReadOnly={!isEditing}
              onChange={(e) => handleCreditDataChange(e)}
            />
            <InputRightAddon children="m²" />
          </InputGroup>
        </FormControl>
        <FormControl id="Nom" isRequired>
          <FormLabel fontSize={"sm"} fontWeight="normal">
            Titre Froncier
          </FormLabel>
          <InputGroup size="sm">
            <Input
              name="titre_foncier"
              defaultValue={donneesPersonnelles["credit"]["titre_foncier"]}
              isReadOnly={!isEditing}
              onChange={(e) => handleCreditDataChange(e)}
            />
          </InputGroup>
        </FormControl>
      </HStack>
      <HStack alignItems={"flex-start"} mb="9">
        <FormControl id="Nom" w="24.5%">
          <FormLabel fontSize={"sm"} fontWeight="normal">
            Garanties:
          </FormLabel>
          <CheckboxGroup colorScheme="orange" value={donneesPersonnelles["credit"]["garanties"]}>
            <Stack spacing={[1, 1]} direction={"column"}>
              {Garanties.map((garantie, position) => (
                <Checkbox
                  key={position}
                  pointerEvents={isEditing ? "" : "none"}
                  size={"sm"}
                  onChange={(e) => {
                    handleGarantiesChange(e);
                  }}
                  value={garantie}
                >
                  {garantie}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
        </FormControl>

        {donneesPersonnelles["credit"].type_credit === "immobilier" && (
          <>
            <FormControl id="Nom" isRequired w="24.5%">
              <FormLabel fontSize={"sm"} fontWeight="normal">
                Promoteur
              </FormLabel>
              <Select
                name="promoteur"
                onChange={(e) => handleCreditDataChange(e)}
                value={donneesPersonnelles["credit"]["promoteur"]}
                size="sm"
                pointerEvents={isEditing ? "" : "none"}
              >
                <option></option>
                <option value="Oui">Oui</option>
                <option value="Non">Non</option>
              </Select>
            </FormControl>

            {donneesPersonnelles["credit"]["promoteur"] === "Oui" && (
              <FormControl
                id="Nom"
                //isReadOnly={donneesPersonnelles["credit"]["promoteur"] === "Oui" ? false : true}
                isRequired
                w="24.5%"
              >
                <FormLabel fontSize={"sm"} fontWeight="normal">
                  Promoteur Nom
                </FormLabel>
                <InputGroup size="sm">
                  <Input
                    name="promoteur_nom"
                    onChange={(e) => handleCreditDataChange(e)}
                    defaultValue={donneesPersonnelles["credit"]["promoteur_nom"]}
                    isReadOnly={!isEditing}
                  />
                </InputGroup>
              </FormControl>
            )}
          </>
        )}
      </HStack>
    </>
  );
};

export default ViewObjetCredit;
