
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
} from '@chakra-ui/react'
import { CreditContext } from 'context/CreditContext'
const RenseignementsBancaires = ({handleDonneesBancairesChange}) => {
  const { donneesBancaires, setDonneesBancaires } = useContext(CreditContext)
  const [section, setSection] = useState("renseignements_bancaires")
  const {colorMode} = useColorMode()
  return (
    <>
      <HStack direction='row' justifyContent={"space-between"} my={2}>
            <Code bgColor={colorMode=='light'?"#efefef":""} children='Bénéficiare' p={1} w="99%" textAlign={"center"} />
            <Code bgColor={colorMode=='light'?"#efefef":""} children='Banque' p={1} w="48%" textAlign={"center"} />
            <Code bgColor={colorMode=='light'?"#efefef":""} children='Solde' p={1} w="48%" textAlign={"center"} />
            <Code bgColor={colorMode=='light'?"#efefef":""} children='CMC' p={1} w="48%" textAlign={"center"} />            
        </HStack>
        <HStack alignItems={"flex-start"} my={4}>
        <FormControl  isRequired variant="floating" >
                    <FormLabel fontSize={"sm"}
            fontWeight="normal"
            transform={donneesBancaires[section]["nom"] ? "scale(0.85) translateY(-35px)" : ""}
>Nom</FormLabel>
                    <Input
                    defaultValue={donneesBancaires[section]["nom"]}
                      size="sm"
                      _placeholder={{ color: "gray.500" }}
                      type="text"
                      name="nom"
 
            onChange={(e)=>handleDonneesBancairesChange(e,section)}

                    />

                  </FormControl>
                 <FormControl  isRequired variant="floating" >
                    <FormLabel 
                    fontSize={"sm"}
                    fontWeight="normal"
                    transform={donneesBancaires[section]["prenom"] ? "scale(0.85) translateY(-35px)" : ""}>Prénom</FormLabel>
                    <Input
                    defaultValue={donneesBancaires[section]["prenom"]}
                      size="sm"
                      name="prenom"
                      onChange={(e)=>handleDonneesBancairesChange(e,section)}
                      _placeholder={{ color: "gray.500" }} 
                      
          
                      type="text"
                    />

                  </FormControl>
                
                  <FormControl  isRequired >
                    <Select 
                      placeholder='-Select-' 
                      size='sm'
                      name="banque"
                      onChange={(e)=>handleDonneesBancairesChange(e,section)}
                      defaultValue={donneesBancaires[section]["banque"]}
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
                        defaultValue={donneesBancaires[section]["solde"]}
                        onChange={(e)=>handleDonneesBancairesChange(e,section)}
                        placeholder='#,###,###.##' />
                        <InputRightAddon children='د.م' />
                    </InputGroup>

                  </FormControl>
                  <FormControl  isRequired  >
                    
                    <InputGroup size='sm'>
                        
                        <Input 
                        name="cmc"
                        
                        defaultValue={donneesBancaires[section]["cmc"]}
                        onChange={(e)=>handleDonneesBancairesChange(e,section)}
                        placeholder='#,###,###.##' />
                        <InputRightAddon children='د.م' />
                    </InputGroup>

                  </FormControl>
        </HStack>
    </>
  )
}

export default RenseignementsBancaires