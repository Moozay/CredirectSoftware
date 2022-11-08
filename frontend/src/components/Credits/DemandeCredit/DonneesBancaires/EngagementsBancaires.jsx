import React, { useContext, useState } from "react";

import { BiAddToQueue } from "react-icons/bi";

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
  Button
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { CreditContext } from "context/CreditContext";
import Index from "components/Index";
const EngagementsBancaires = ({ handleEngChange }) => {
  const { donneesBancaires, setDonneesBancaires } = useContext(CreditContext);
  const [section, setSection] = useState("engagements_bancaires")
  const [inputField, setInputField] = useState([
    { nom : "",prenom:"",nature_credit: "",organisme: "",echeance: "",encours: "",duree: ""}

  ])

  const handleFormChange = (index,event)=>{
    let data = [...inputField]
    data[index][event.target.name] = event.target.value
    setInputField(data)
    handleEngChange(inputField)
  }

  const addField = () => {
    let newField =     { nom : "",prenom:"",nature_credit: "",organisme: "",echeance: "",encours: "",duree: ""}
    setInputField([...inputField,newField])
    console.log(inputField);
  }

  const removeField = (index) => {
    let data = [...inputField]
    data.splice(index,1)
    setInputField(data)
    handleEngChange(data)
    console.log("removed", index, data);
  }
  const {colorMode} = useColorMode()
  return (
    <>
    <Button
          leftIcon={<BiAddToQueue />}
          color={"#ff7659"}
          variant="outline"
          size="sm"
          border={"none"}
          onClick={addField}
        >
          Add New
        </Button>
      <HStack direction="row" justifyContent={"space-between"} my={2}>
        <Code bgColor={colorMode=='light'?"#efefef":""} children="Bénéficiare" p={1} w="100%" textAlign={"center"} />
        <Code bgColor={colorMode=='light'?"#efefef":""} children="Nature Crédit" p={1} w="48%" textAlign={"center"} />
        <Code bgColor={colorMode=='light'?"#efefef":""} children="Organisme" p={1} w="48%" textAlign={"center"} />
        <Code bgColor={colorMode=='light'?"#efefef":""} children="Echéance" p={1} w="48%" textAlign={"center"} />
        <Code bgColor={colorMode=='light'?"#efefef":""} children="Encours" p={1} w="48%" textAlign={"center"} />
        <Code bgColor={colorMode=='light'?"#efefef":""} children="Durée" p={1} w="48%" textAlign={"center"} />
        <Code bgColor={colorMode=='light'?"#efefef":""} children="Supprime" p={1} w="48%" textAlign={"center"} />

      </HStack>
        {inputField.map((input,index)=> {
          return (
        <HStack alignItems={"flex-start"} my={4} key={index} direction="row" justifyContent={"space-between"}>
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
            onChange={(e)=>handleFormChange(index,e)}
            value={input.nom}
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
          value={input.prenom}
          _placeholder={{ color: "gray.500" }} 
          onChange={(e)=>handleFormChange(index,e)}          name="prenom"
          type="text" />
        </FormControl>
        <FormControl isRequired>
          <Select 
            placeholder="-Select-"
            size="sm"
            onChange={(e)=>handleFormChange(index,e)}            name="nature_credit"
            value={input.nature_credit}
            >
           <option value="immobilier">Immobilier</option>
                    <option value="hypothecaire">Hypothécaire</option>
                    <option value="consommation">Consommation</option>
          </Select>
        </FormControl>
        <FormControl  isRequired variant="floating">
          <Input 
            onChange={(e)=>handleFormChange(index,e)}            name="organisme"
            size="sm" 
            _placeholder={{ color: "gray.500" }} 
            type="text" 
            value={input.organisme}
            />
        </FormControl>
        <FormControl  isRequired>
          <InputGroup size="sm">
            <Input 
            onChange={(e)=>handleFormChange(index,e)}            name="echeance"
            value={input.echeance}
            placeholder="#,###,###.##" />
            <InputRightAddon children="د.م" />
          </InputGroup>
        </FormControl>
        <FormControl  isRequired>
          <InputGroup size="sm">
            <Input 
onChange={(e)=>handleFormChange(index,e)}            name="encours"
            value={input.encours}
            placeholder="#,###,###.##" />
            <InputRightAddon children="د.م" />
          </InputGroup>
        </FormControl>
        <FormControl  isRequired variant="floating">
          <Input 
            onChange={(e)=>handleFormChange(index,e)}
            name="duree"
            size="sm" 
            value={input.duree}
            _placeholder={{ color: "gray.500" }} type="text" />
        </FormControl>
        <FormControl>
        <Button
          leftIcon={<DeleteIcon />}
          color={"#ff7659"}
          variant="outline"
          size="sm"
          border={"none"}
          onClick={() => removeField(index)}
        >Supprime</Button>
        </FormControl>
      </HStack>
          )
        })}
    </>
  );
};

export default EngagementsBancaires;
