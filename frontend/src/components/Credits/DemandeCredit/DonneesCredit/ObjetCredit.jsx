import React,  { useContext,useMemo } from 'react'
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
} from '@chakra-ui/react'
import {AiFillCaretDown} from 'react-icons/ai'
import countryList from "react-select-country-list";
import CurrencyFormat from 'react-currency-format';
import { CreditContext } from 'context/CreditContext'
import { useColorMode } from "@chakra-ui/color-mode";
const ObjetCredit = ({handleCreditDataChange, handleAdresseChange}) => {
  const {credit, setCredit} = useContext(CreditContext)
  const options = useMemo(() => countryList().getData(), [])
  const { colorMode, toggleColorMode } = useColorMode();

  const Garanties = [
    "Nantissement_sur_le_fonds_de_commerce",
    "Hypotheque_en_1er_rang_sur_le_TF_objet_du_credit",
    "Caution_personnelle_et_solidaire",
    "Domiciliation_de_salaire",
    "Engagement_de_domiciliation_des_revenus"
  ]
  return (
    <>
      {/* <HStack direction='row' justifyContent={"space-between"}>
            <Code bgColor={colorMode == "light" ? '#f1f1f1':''} fontWeight="bold"w="98.4%"  borderColor="orange.200" children='Nature du Bien' p={1}  textAlign={"left"} />
            <Code bgColor={colorMode == "light" ? '#f1f1f1':''} fontWeight="bold"w="98.4%"  borderColor="orange.200" children='Etat du Bien' p={1}  textAlign={"left"} />
            <Code bgColor={colorMode == "light" ? '#f1f1f1':''} fontWeight="bold"w="98.4%" borderRight={"4px"} borderRightColor="orange.200" children='Usage du Bien' p={1}  textAlign={"left"} />            
      </HStack> */}
      

      <HStack alignItems={"flex-start"} mb="8">
        <FormControl id="Nom" isRequired variant="floatingDown" >
        <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["objet_credit"] ? "scale(0.85) translateY(29px)" : ""
              }>Objet du Crédit</FormLabel>
                    <Select 
                  name="objet_credit"
                  onChange={handleCreditDataChange}
                  defaultValue={credit["objet_credit"]}
                size='sm'>
                  <option ></option>
                    <option value="Hypothécaire">Hypothécaire</option>
                    <option value="Acquisition">Acquisition</option>                    
                    <option value="Acquisition + aménagement">Acquisition + aménagement</option>
                    <option value="Acquisition + construction">Acquisition + Construction</option>
                    <option value="Acquisition + rachat de crédit">Acquisition + rachat de crédit</option>
                    <option value="Acquisition des parts">Acquisition des parts</option>
                    <option value="Acquisition des parts et rachat de crédit">Acquisition des parts et rachat de crédit</option>
                    <option value="Construction">Construction</option>
                    <option value="Construction + rachat de crédit">Construction + rachat de crédit</option>
                    <option value="Travaux de finition">Travaux de finition</option>
                    <option value="Aménagement">Aménagement</option>
                    <option value="Rachat de crédit">Rachat de crédit</option>
                    <option value="Relais">Relais</option>
                    <option value="In FINE">In FINE</option>
                    <option value="Mourabaha">Mourabaha</option>
                    <option value="Ijar">Ijar</option>

                </Select>
                  </FormControl>
                 <FormControl id="Nom" isRequired variant="floatingDown" >
                 <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["nature_bien"] ? "scale(0.85) translateY(29px)" : ""
              }>Nature du Bien</FormLabel>
                    <Select 
                        name="nature_bien"
                        onChange={handleCreditDataChange}
                        defaultValue={credit["nature_bien"]}
                       size='sm'>
                        <option ></option>
                        <option value="Appartement">Appartement</option>
                        <option value="Villa">Villa</option>
                        <option value="Maison">Maison</option>
                        <option value="Terrain">Terrain</option>
                        <option value="Local commercial">Local commercial</option>
                        <option value="Bureau">Bureau</option>
                        <option value="Bangalow/Pavillion">Bangalow/Pavillion</option>
                </Select>
                  </FormControl>
                  <FormControl id="Nom" isRequired variant="floatingDown" >
                 <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["etat_bien"] ? "scale(0.85) translateY(29px)" : ""
              }>Etat du Bien</FormLabel>
                    <Select 
                    name="etat_bien"
                    onChange={handleCreditDataChange}
                    defaultValue={credit["etat_bien"]}
                    placeholder='' size='sm'>
                      <option ></option>
                        <option value="Neuf">Neuf</option>
                        <option value="Ancien">Ancien</option>

                    </Select>
                  </FormControl>
                  <FormControl id="Nom" isRequired variant="floatingDown" >
                 <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["usage_bien"] ? "scale(0.85) translateY(29px)" : ""
              }>Usage du Bien</FormLabel>
                 <Select 
                    name="usage_bien"
                    onChange={handleCreditDataChange}
                    defaultValue={credit["usage_bien"]}
                     size='sm'>
                      <option ></option>
                        <option value="Résidence Principale">Résidence Principale</option>
                        <option value="Résidence Secondaire">Résidence Secondaire</option>
                        <option value="Professionnel">Professionnel</option>
                        <option value="Locatif">Locatif</option>
                    </Select>
                  </FormControl>


        </HStack>
        
        <HStack alignItems={"flex-start"} mb="5">
        <FormControl id="Nom" isRequired variant="floatingDown" >
                 <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["montant_travaux"] ? "scale(0.85) translateY(29px)" : ""
              }>Montant Travaux</FormLabel>
                   
                    <InputGroup size='sm' >
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
                        <InputRightAddon children='د.م' />
                    </InputGroup>
                  </FormControl>
        <FormControl id="Nom" isRequired variant="floatingDown" >
        <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
              transform={
                credit.adresse_bien?.adresse1 ? "scale(0.85) translateY(29px)" : ""
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
          <FormControl id="Nom" isRequired variant="floatingDown" >
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
                  <FormControl id="Nom" isRequired variant="floatingDown" >
                  <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit.adresse_bien?.pays ? "scale(0.85) translateY(29px)" : ""
              }>Pays</FormLabel>
            <Select  
            size='sm' 
            name="pays"
            onChange={handleAdresseChange}
            icon={<AiFillCaretDown/>}
            w="100%"
            defaultValue={credit.adresse_bien?.pays}
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
      
      <FormControl id="Nom" isRequired variant="floatingDown" >
                 <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["montant_acte"] ? "scale(0.85) translateY(29px)" : ""
              }>Montant valeur à l'acte</FormLabel>
                   
                    <InputGroup size='sm' >
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
                        <InputRightAddon children='د.م' />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="Nom" isRequired variant="floatingDown" >
                 <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["montant_venal"] ? "scale(0.85) translateY(29px)" : ""
              }>Montant valeur vénale</FormLabel>
                    <InputGroup size='sm'>
                        <CurrencyFormat name="montant_venal"
                        onChange={handleCreditDataChange}
                        value={credit["montant_venal"]}
                        customInput={Input}
                        decimalSeparator=","
                        thousandSeparator=" "
                        decimalScale={2}
                        fixedDecimalScale={true}  />
                        <InputRightAddon children='د.م' />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="Nom" isRequired variant="floatingDown" >
                 <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["superficie"] ? "scale(0.85) translateY(29px)" : ""
              }>Superficie</FormLabel>
                    <InputGroup size='sm'>
                        <Input 
                        name="superficie"
                        onChange={handleCreditDataChange}
                        defaultValue={credit["superficie"]}
                        
                        />
                        <InputRightAddon children='m²' />
                    </InputGroup>
                  </FormControl>
                  <FormControl id="Nom" isRequired variant="floatingDown" >
                 <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["titre_foncier"] ? "scale(0.85) translateY(29px)" : ""
              }>Titre Froncier</FormLabel>
                    <InputGroup size='sm'>
                        <Input 
                        name="titre_foncier"
                        onChange={handleCreditDataChange}
                        defaultValue={credit["titre_foncier"]}
                        
                        />
                        
                    </InputGroup>
                  </FormControl>
      </HStack>
      <HStack alignItems={"flex-start"} mb="5">
      <FormControl id="Nom" isRequired variant="floatingDown" w="25%">
                 <FormLabel fontSize={"sm"} fontWeight="normal"
              transform={
                credit["garanties"] ? "scale(0.85) translateY(29px)" : ""
              }>Garanties</FormLabel>
                    <Select 
                    name="garanties"
                    onChange={handleCreditDataChange}
                    defaultValue={credit["garanties"]}
                    placeholder='' size='sm'>
                      <option></option>
                      {Garanties.map((garanties,index) =>
                        <option value={garanties} key={index}>{garanties}</option>
                      )}
                    </Select>
                  </FormControl>
      </HStack>
    </>
  )
}

export default ObjetCredit