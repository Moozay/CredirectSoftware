
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
import CurrencyFormat from 'react-currency-format';
import { DeleteIcon } from "@chakra-ui/icons";
import { CreditContext } from 'context/CreditContext'
const RenseignementsBancaires = ({handleRenChange}) => {
  const { donneesBancaires, setDonneesBancaires } = useContext(CreditContext)
  const [section, setSection] = useState("renseignements_bancaires")
  let ren_data = donneesBancaires.renseignements_bancaires
  const handleFormChange = (index, event) =>{
    let data = [...donneesBancaires.renseignements_bancaires]
    data[index][event.target.name] = event.target.value
    

    handleRenChange(data)
    console.log(ren_data);
    }

  const addField = () =>{
    let newField = {nom:"",prenom:"",banque:"",solde:"",cmc:""}
    handleRenChange([...donneesBancaires.renseignements_bancaires,newField])
  }

  const removeField = (index)=>{
    let data = [...donneesBancaires.renseignements_bancaires]
    data.splice(index,1)
    handleRenChange(data)
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
            <Code bgColor={colorMode=='light'?"#efefef":""} children='Action' p={1} w="48%" textAlign={"center"} />            
        </HStack>
        
        {donneesBancaires.renseignements_bancaires.map((input, index)=>{
          return (
            <HStack alignItems={"flex-start"} my={4} key={index}>
            <FormControl  isRequired variant="floating" >
                    <FormLabel fontSize={"sm"}
            fontWeight="normal"
            transform={input.nom? "scale(0.85) translateY(-35px)" : ""}
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
                    transform={input.prenom? "scale(0.85) translateY(-35px)" : ""}>Prénom</FormLabel>
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
                      textAlign="center"

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
                        <CurrencyFormat 
                        customInput={Input}
                        decimalSeparator=","
                        thousandSeparator=" "
                        decimalScale={2}
                        fixedDecimalScale={true}
                        name="solde"
                        value={input.solde}
                        onChange={(e)=>handleFormChange(index,e)}
                        placeholder='# ### ###.##' />
                        <InputRightAddon children='د.م' />
                    </InputGroup>

                  </FormControl>
                  <FormControl  isRequired  >
                    
                    <InputGroup size='sm'>
                        
                    <CurrencyFormat 
                        customInput={Input}
                        decimalSeparator=","
                        thousandSeparator=" "
                        decimalScale={2}
                        fixedDecimalScale={true} 
                        name="cmc"
                        
                        value={input.cmc}
                        onChange={(e)=>handleFormChange(index,e)}
                        placeholder='# ### ###.##' />
                        <InputRightAddon children='د.م' />
                    </InputGroup>

                  </FormControl>
                  <FormControl>
        <Button
          leftIcon={<DeleteIcon />}
          color={"#ff7659"}
          variant="outline"
          size="sm"
          alignContent={"center"}
          border={"none"}
          onClick={() => removeField(index)}
        >Supprime</Button>
        </FormControl>
        </HStack>
          )
        })}
        
    </>
  )
}

export default RenseignementsBancaires