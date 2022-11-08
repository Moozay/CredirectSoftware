
import React,{useContext, useState} from 'react'

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
} from '@chakra-ui/react'
import { BiAddToQueue } from "react-icons/bi";
import { CreditContext } from 'context/CreditContext'
const RenseignementsBancaires = ({handleDonneesBancairesChange}) => {
  const { donneesBancaires, setDonneesBancaires } = useContext(CreditContext)
  const [section, setSection] = useState("renseignements_bancaires")
  const [inputField, setInputField] = useState([
    {nom:"",prenom:"",banque:"",solde:"",cmc:""}
  ])
  const handleFormChange = (index, event) =>{
    let data = [...inputField]
    data[index][event.target.name] = event.target.value
    setInputField(data)
    //handleRenChange(inputField)
    }

  const addField = () =>{
    let newField = {nom:"",prenom:"",banque:"",solde:"",cmc:""}
    setInputField([...inputField,newField])
    console.log(inputField);
  }

  const removeField = (index)=>{
    let data = [...inputField]
    data.splice(index,1)
    setInputField(data)
    //handleRenChange(inputField)
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
      <HStack direction='row' justifyContent={"space-between"} my={2}>
            <Code bgColor={colorMode=='light'?"#efefef":""} children='Bénéficiare' p={1} w="99%" textAlign={"center"} />
            <Code bgColor={colorMode=='light'?"#efefef":""} children='Banque' p={1} w="48%" textAlign={"center"} />
            <Code bgColor={colorMode=='light'?"#efefef":""} children='Solde' p={1} w="48%" textAlign={"center"} />
            <Code bgColor={colorMode=='light'?"#efefef":""} children='CMC' p={1} w="48%" textAlign={"center"} /> 
            <Code bgColor={colorMode=='light'?"#efefef":""} children='Supprime' p={1} w="48%" textAlign={"center"} />            
        </HStack>
        
        {inputField.map((input, index)=>{
          return (
            <HStack alignItems={"flex-start"} my={4}>
            <FormControl  isRequired variant="floating" >
                    <FormLabel fontSize={"sm"}
            fontWeight="normal"
            transform={donneesBancaires[section]["nom"] ? "scale(0.85) translateY(-35px)" : ""}
>Nom</FormLabel>
                    <Input
                    value={input.nom}
                      size="sm"
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                      name="nom"
 
                      onChange={(e)=>handleFormChange(index,e)}

                    />

                  </FormControl>
                 <FormControl  isRequired variant="floating" >
                    <FormLabel 
                    fontSize={"sm"}
                    fontWeight="normal"
                    transform={donneesBancaires[section]["prenom"] ? "scale(0.85) translateY(-35px)" : ""}>Prénom</FormLabel>
                    <Input
                    value={input.prenom}
                      size="sm"
                      name="prenom"
                      onChange={(e)=>handleFormChange(index,e)}
                      _placeholder={{ color: "gray.500" }} 
                      
          
                      type="text"
                    />

                  </FormControl>
                
                  <FormControl  isRequired >
                    <Select 
                      placeholder='-Select-' 
                      size='sm'
                      name="banque"
                      onChange={(e)=>handleFormChange(index,e)}
                      value={input.banque}
                      >
                        <option value="AWB">AWB</option>
                        <option value="BMCE">BMCE</option>
                        <option value="BMCI">BMCI</option>
                        <option value="CDM">CDM</option>
                        <option value="PB">PB</option>
                    </Select>
                  </FormControl>
                 <FormControl  isRequired >
                    <InputGroup size='sm'>
                        <Input 

                        name="solde"
                        value={input.solde}
                        onChange={(e)=>handleFormChange(index,e)}
                        placeholder='#,###,###.##' />
                        <InputRightAddon children='د.م' />
                    </InputGroup>

                  </FormControl>
                  <FormControl  isRequired  >
                    
                    <InputGroup size='sm'>
                        
                        <Input 
                        name="cmc"
                        
                        value={input.cmc}
                        onChange={(e)=>handleFormChange(index,e)}
                        placeholder='#,###,###.##' />
                        <InputRightAddon children='د.م' />
                    </InputGroup>

                  </FormControl>
        </HStack>
          )
        })}
        
    </>
  )
}

export default RenseignementsBancaires