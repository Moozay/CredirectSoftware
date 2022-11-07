import React, { useContext, useState } from "react";

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
  useColorMode,
} from "@chakra-ui/react";
import { CreditContext } from "context/CreditContext";
const EngagementsBancaires = ({ handleDonneesBancairesChange }) => {
  const { donneesBancaires, setDonneesBancaires } = useContext(CreditContext);
  const [section, setSection] = useState("engagements_bancaires")
  const {colorMode} = useColorMode()
  return (
    <>
      <HStack direction="row" justifyContent={"space-between"} my={2}>
        <Code bgColor={colorMode=='light'?"#efefef":""} children="Bénéficiare" p={1} w="100%" textAlign={"center"} />
        <Code bgColor={colorMode=='light'?"#efefef":""} children="Nature Crédit" p={1} w="48%" textAlign={"center"} />
        <Code bgColor={colorMode=='light'?"#efefef":""} children="Organisme" p={1} w="48%" textAlign={"center"} />
        <Code bgColor={colorMode=='light'?"#efefef":""} children="Echéance" p={1} w="48%" textAlign={"center"} />
        <Code bgColor={colorMode=='light'?"#efefef":""} children="Encours" p={1} w="48%" textAlign={"center"} />
        <Code bgColor={colorMode=='light'?"#efefef":""} children="Durée" p={1} w="48%" textAlign={"center"} />
      </HStack>
      <HStack alignItems={"flex-start"} my={4}>
        <FormControl  isRequired variant="floating">
          <FormLabel
            fontSize={"sm"}
            fontWeight="normal"
            transform={donneesBancaires[section]["nom"] ? "scale(0.85) translateY(-35px)" : ""}
          >
            Nom
          </FormLabel>
          <Input 
            size="sm" 
            name="nom"
            _placeholder={{ color: "gray.500" }} 
            onChange={(e)=>handleDonneesBancairesChange(e,section)}
            defaultValue={donneesBancaires[section]["nom"]}
            type="text" />
        </FormControl>
        <FormControl  isRequired variant="floating">
          <FormLabel 
          fontSize={"sm"}
            fontWeight="normal"
            transform={donneesBancaires[section]["prenom"] ? "scale(0.85) translateY(-35px)" : ""}
          >
          Prénom
          </FormLabel>
          <Input 
          size="sm" 
          defaultValue={donneesBancaires[section]["prenom"]}
          _placeholder={{ color: "gray.500" }} 
          onChange={(e)=>handleDonneesBancairesChange(e,section)}
          name="prenom"
          type="text" />
        </FormControl>
        <FormControl isRequired>
          <Select 
            placeholder="-Select-"
            size="sm"
            onChange={(e)=>handleDonneesBancairesChange(e,section)}
            name="nature_credit"
            defaultValue={donneesBancaires[section]["nature_credit"]}
            >
           <option value="immobilier">Immobilier</option>
                    <option value="hypothecaire">Hypothécaire</option>
                    <option value="consommation">Consommation</option>
          </Select>
        </FormControl>
        <FormControl  isRequired variant="floating">
          <Input 
            onChange={(e)=>handleDonneesBancairesChange(e,section)}
            name="organisme"
            size="sm" 
            _placeholder={{ color: "gray.500" }} 
            type="text" 
            defaultValue={donneesBancaires[section]["organisme"]}
            />
        </FormControl>
        <FormControl  isRequired>
          <InputGroup size="sm">
            <Input 
            onChange={(e)=>handleDonneesBancairesChange(e,section)}
            name="echeance"
            defaultValue={donneesBancaires[section]["echeance"]}
            placeholder="#,###,###.##" />
            <InputRightAddon children="د.م" />
          </InputGroup>
        </FormControl>
        <FormControl  isRequired>
          <InputGroup size="sm">
            <Input 
            onChange={(e)=>handleDonneesBancairesChange(e,section)}
            name="encours"
            defaultValue={donneesBancaires[section]["encours"]}
            placeholder="#,###,###.##" />
            <InputRightAddon children="د.م" />
          </InputGroup>
        </FormControl>
        <FormControl  isRequired variant="floating">
          <Input 
            onChange={(e)=>handleDonneesBancairesChange(e,section)}
            name="duree"
            size="sm" 
            defaultValue={donneesBancaires[section]["duree"]}
            _placeholder={{ color: "gray.500" }} type="text" />
        </FormControl>
      </HStack>
    </>
  );
};

export default EngagementsBancaires;
