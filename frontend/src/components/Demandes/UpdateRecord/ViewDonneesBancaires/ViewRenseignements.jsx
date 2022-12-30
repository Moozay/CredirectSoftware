
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
import { UpdateContext } from 'context/UpdateContext'
import { CreditContext } from 'context/CreditContext';

const ViewRenseignements = ({handleRenChange}) => {
  const { banqueList } = useContext(CreditContext)
  const [section, setSection] = useState("renseignements_bancaires")
  const {donneesPersonnelles,isEditing} = useContext(UpdateContext)

  const handleFormChange = (index, event) =>{
    let data = [...donneesPersonnelles.emprunteur.renseignements_bancaires]
    data[index][event.target.name] = event.target.value
    handleRenChange(data)
    }


  const addField = () =>{
    let newField = {nom:"",prenom:"",banque:"",solde:"",cmc:""}
    const data = [...donneesPersonnelles.emprunteur.renseignements_bancaires,newField]
    handleRenChange(data)

  }

  const removeField = (index)=>{
    let data = [...donneesPersonnelles.emprunteur.renseignements_bancaires]
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
          w= "100%"
          disabled={!isEditing}
        >
          Add New
        </Button>
      <HStack direction='row' justifyContent={"space-between"} my={2} mb={2}>
            <Code bgColor={colorMode=='light'?"#efefef":""} children='Bénéficiare' p={1} w="99%" textAlign={"center"} />
            <Code bgColor={colorMode=='light'?"#efefef":""} children='Banque' p={1} w="48%" textAlign={"center"} />
            <Code bgColor={colorMode=='light'?"#efefef":""} children='Solde' p={1} w="48%" textAlign={"center"} />
            <Code bgColor={colorMode=='light'?"#efefef":""} children='CMC' p={1} w="48%" textAlign={"center"} /> 
            <Code bgColor={colorMode=='light'?"#efefef":""} children='Action' p={1} w="48%" textAlign={"center"} />            
        </HStack>
        
        {donneesPersonnelles.emprunteur.renseignements_bancaires?.map((input, index)=>{
          return (
            <HStack alignItems={"flex-start"} mt={5} key={index}>
            <FormControl  isRequired variant="floating" >
                    <FormLabel fontSize={"sm"}
            fontWeight="normal"
            transform={input.nom? "scale(0.85) translateY(-30px)" : ""}
>Nom</FormLabel>
                    <Input
                    value={input.nom}
                      size="sm"
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                      name="nom"
                      onChange={(e)=>handleFormChange(index,e)}
                      isReadOnly={!isEditing}
                    />

                  </FormControl>
                 <FormControl  isRequired variant="floating" >
                    <FormLabel 
                    fontSize={"sm"}
                    fontWeight="normal"
                    transform={input.prenom? "scale(0.85) translateY(-30px)" : ""}>Prénom</FormLabel>
                    <Input
                    value={input.prenom}
                      size="sm"
                      name="prenom"
                      _placeholder={{ color: "gray.500" }} 
                      onChange={(e)=>handleFormChange(index,e)}
                      isReadOnly={!isEditing}
                      type="text"
                    />

                  </FormControl>
                
                  <FormControl  isRequired >
                    <Select 
                      placeholder='-Select-' 
                      size='sm'
                      name="banque"
                      value={input.banque}
                      textAlign="center"
                      pointerEvents={isEditing? "":"none"}
                      onChange={(e)=>handleFormChange(index,e)}
                      >
                       {banqueList.map((banque,index)=>
                        <option value={banque} key={index}>{banque}</option>
                       )}
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
                        isReadOnly={!isEditing}
                        onChange={(e)=>handleFormChange(index,e)}
                        value={input.solde}
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
                        isReadOnly={!isEditing}
                        fixedDecimalScale={true} 
                        name="cmc"
                        onChange={(e)=>handleFormChange(index,e)}
                        value={input.cmc}
                        placeholder='# ### ###.##' />
                        <InputRightAddon children='د.م' />
                    </InputGroup>

                  </FormControl>
                  <FormControl>
        <Button
          disabled={!isEditing}
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

export default ViewRenseignements