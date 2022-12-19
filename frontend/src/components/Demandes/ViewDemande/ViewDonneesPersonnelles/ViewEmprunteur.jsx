import {React,useState, useMemo} from "react";
import {
    Stack,
    VStack,
    HStack,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputRightElement,
    InputGroup,
    RadioGroup,
    Radio,
    Select,
    Heading
  } from "@chakra-ui/react";
  import DatePicker from "react-datepicker";
  import { AiOutlineCalendar,AiFillCaretDown } from "react-icons/ai";
  import countryList from "react-select-country-list";


const ViewEmprunteur = ({DonneesPersonnelles,isEditing}) =>{
    const options = useMemo(() => countryList().getData(), []);

    return(
        <HStack alignItems={"flex-start"} mb={5}>
            <VStack alignItems={"flex-start"} w="100%" mx={3}>
                <HStack w={"100%"} my={4}>
                    <FormControl>
                        <FormLabel fontSize={"sm"} fontWeight="normal">
                            Nom
                        </FormLabel>
                        <Input readOnly={!isEditing} variant={"flushed"} size={"sm"} name="nom" type={"text"}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize={"sm"} fontWeight="normal">
                            Prenom
                        </FormLabel>
                        <Input readOnly={!isEditing} variant={"flushed"} size={"sm"} name="nom" type={"text"}/>
                    </FormControl>
                </HStack>
                <HStack w={"100%"} my={4}>
                    <FormControl>
                        <FormLabel fontSize={"sm"} fontWeight="normal">
                            Lieu de naissance
                        </FormLabel>
                        <Input readOnly={!isEditing} variant={"flushed"} size={"sm"} name="nom" type={"text"}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize={"sm"} fontWeight="normal">
                            Nationalite
                        </FormLabel>
                        <Input variant={"flushed"} size={"sm"} name="nom" type={"text"}/>
                    </FormControl>
                </HStack>
                <HStack w={"100%"} my={4}>
                    <FormControl>
                        <FormLabel fontSize={"sm"} fontWeight="normal">
                            Telephone
                        </FormLabel>
                        <Input variant={"flushed"} size={"sm"} name="nom" type={"text"}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize={"sm"} fontWeight="normal">
                            R.S. Employeur
                        </FormLabel>
                        <Input variant={"flushed"} size={"sm"} name="nom" type={"text"}/>
                    </FormControl>
                </HStack>
                <HStack w={"100%"} my={4}>
                    <FormControl>
                        <FormLabel fontSize={"sm"} fontWeight="normal">
                            Profession
                        </FormLabel>
                        <Input variant={"flushed"} size={"sm"} name="nom" type={"text"}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize={"sm"} fontWeight="normal">
                        Situation Familiale
                    </FormLabel>
                        <Select variant={"flushed"} size="sm">
                            <option></option>
                            <option value="Célibataire" key="Célibataire">
                                Célibataire
                            </option>
                            <option value="Marié(e)" key="Marié(e)">
                                Marié(e)
                            </option>
                            <option value="Veuf(ve)" key="Veuf(ve)">
                                Veuf(e)
                            </option>
                            <option value=" Divorcé(e)" key="Divorcé(e)">
                                Divorcé(e)
                            </option>
                        </Select>
                    </FormControl>
                </HStack>
                <HStack w={"100%"} my={4}>
                    <FormControl>
                        <FormLabel fontSize={"sm"} fontWeight="normal">
                        Date de naissance
                    </FormLabel>
                    <InputGroup>
                    <DatePicker
                        id="customDatePicker"
                        name="datenaissance"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        required
                        readOnly={!isEditing}
                    />
                    <InputRightElement children={<AiOutlineCalendar />} pb={2} />
                    </InputGroup>
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize={"sm"} fontWeight="normal">
                            R.S. Employeur
                        </FormLabel>
                        <Input variant={"flushed"} size={"sm"} name="nom" type={"text"}/>
                    </FormControl>
                </HStack>
                <HStack w={"50%"} my={4}>
                    <FormControl>
                        <FormLabel fontSize={"sm"} fontWeight="normal">
                            Part de partipation
                        </FormLabel>
                        <Input variant={"flushed"} size={"sm"} name="nom" type={"text"}/>
                    </FormControl>
                </HStack>
            </VStack>
            <VStack alignItems={"flex-start"} w="100%" mx={3}>
            <HStack w={"100%"} my={4}>
                    <FormControl>
                        <FormLabel fontSize={"sm"} fontWeight="normal">
                            N. Cin/Sejour
                        </FormLabel>
                        <Input variant={"flushed"} size={"sm"} name="nom" type={"text"}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize={"sm"} fontWeight="normal">
                        Date de naissance
                    </FormLabel>
                    <InputGroup variant={"flushed"}>
                    <DatePicker
                        id="customDatePicker"
                        name="datenaissance"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        required
                    />
                    <InputRightElement children={<AiOutlineCalendar />} pb={2} />
                    </InputGroup>
                    </FormControl>
                </HStack>
                <HStack w={"100%"} my={4}>
                    <FormControl>
                        <FormLabel fontSize={"sm"} fontWeight="normal">
                            Adresse
                        </FormLabel>
                        <Input variant={"flushed"} size={"sm"} name="nom" type={"text"}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel fontSize={"sm"} fontWeight="normal">
                            Ville de residence
                        </FormLabel>
                        <Input variant={"flushed"} size={"sm"} name="nom" type={"text"}/>
                    </FormControl>
                </HStack>
                <HStack my={4} w="100%">
          <FormControl variant={"flushed"} isRequired>
            <FormLabel
              fontSize={"sm"}
              fontWeight="normal"
            >
              Pays
            </FormLabel>
            <Select
              size="sm"
              name="pays"
              variant={"flushed"}
              icon={<AiFillCaretDown />}
              w="100%"
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
        <HStack my={4}>
          <FormControl my={3} isRequired>
            <FormLabel>Co-Emprunteur</FormLabel>
            <RadioGroup
            >
              <Stack direction="column">
                <Radio value="true">Oui</Radio>
                <Radio value="false">Non</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
        </HStack>
            </VStack>
        </HStack>
    )
}

export default ViewEmprunteur