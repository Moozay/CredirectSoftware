import React, { useEffect, useRef, useContext, useMemo, useState } from "react";
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  DrawerBody,
  Flex,
  Text,
  VStack,
  HStack,
  Heading,
  Box,
  useToast,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  Button,
} from "@chakra-ui/react";
import axiosInstance from "services/axios";
import { UserContext } from "context/UserContext";
import { Keys } from "assets/lang/Keywords";
const Prospect = ({ isOpen, onClose, prospect }) => {
  const isMounted = useRef(false);
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [prospectAgent, setProspectAgent] = useState({})
  const { user, setUser } = useContext(UserContext);
  const toast = useToast();
  const handleModify = () => {
    setIsEditing(!isEditing);
    
  };

  const handleChange = (e) =>{
    setProspectAgent(e)
    console.log(e);
  }

  const handleSubmit = () =>{
    console.log(prospectAgent);
    const updateProspectAgent = {
      "prospect_id" : prospect['prospect_id'],
      "agent_id" : prospectAgent
    }
    axiosInstance
      .post(`prospects/agentupdate/${updateProspectAgent.prospect_id}/${updateProspectAgent.agent_id}`)
      .then((response) => {
        toast({
          title: `Enregistrement mis à jour avec succès`,
          status: "success",
          isClosable: true,
          duration: 1500,
        });
        console.log(response);
      })
      .catch((error) => {
        toast({
          title: `Enregistrement non mis à jours`,
          status: error,
          isClosable: true,
          duration: 1500,
        });
      });
    setIsEditing(false);
    console.log(updateProspectAgent);
  }
  useEffect(() => {
    const initialize = async () => {
      if (user["role"] !== "Agent") {
        const response = await axiosInstance.get("/users/agents");
        const filteredAgents = response.data.filter((agent)=>
          agent["status"] === true
        )
        setUsers(filteredAgents);
      }
    };
    initialize();
    setProspectAgent(prospect['agent_id'])
    console.log(users);
  }, [prospect]);

  return (
    <Drawer placement="right" size="lg" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Données prospect </DrawerHeader>
        <DrawerBody>
          {prospect ? (
            <VStack alignItems={"flex-start"} w="100%">
              <HStack w="100%" my={4}>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["nom"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{prospect.nom}</Text>
                </Flex>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["prenom"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{prospect.prenom}</Text>
                </Flex>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["cin_sejour"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{prospect.cin_sejour}</Text>
                </Flex>
              </HStack>
              <HStack w="100%" my={4}>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["datenaissance"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">
                    {prospect.datenaissance?.split("T")[0]}
                  </Text>
                </Flex>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["lieunaissance"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{prospect.lieunaissance}</Text>
                </Flex>
              </HStack>
              <HStack w="100%" my={4}>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["nationalite"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{prospect.nationalite}</Text>
                </Flex>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["telephone"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{prospect.telephone}</Text>
                </Flex>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["situation"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{prospect.situation}</Text>
                </Flex>
              </HStack>
              <HStack w="100%" my={4}>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["adresse"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{prospect.adresse?.adresse1}</Text>
                </Flex>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["ville"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{prospect.adresse?.ville}</Text>
                </Flex>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["pays"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{prospect.adresse?.pays}</Text>
                </Flex>
              </HStack>
              <HStack w="100%" my={4}>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["rs_employeur"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{prospect.rs_employeur}</Text>
                </Flex>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["profession"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{prospect.telephone}</Text>
                </Flex>
              </HStack>
              <HStack w="100%" my={4}>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["type_profession"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{prospect.type_profession}</Text>
                </Flex>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["caisse"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">
                    {prospect.caisse ? prospect.caisse : "-----"}
                  </Text>
                </Flex>
              </HStack>
              <HStack w="100%" my={4}>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["datembauche"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">
                    {prospect.datembauche?.split("T")[0]}
                  </Text>
                </Flex>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["revenue"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{prospect.revenue}</Text>
                </Flex>
              </HStack>
              <HStack w="100%" my={4}>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["source"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{prospect.source}</Text>
                </Flex>
                {prospect.agent != null && (
                  <Flex>
                    <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                      {Keys["agent"]} :{" "}
                    </Heading>
                    <Text fontSize="sm">{prospect.agent}</Text>
                  </Flex>
                )}
                {prospect.parrainage != null && (
                  <Flex>
                    <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                      {Keys["parrainage"]} :{" "}
                    </Heading>
                    <Text fontSize="sm">{prospect.parrainage}</Text>
                  </Flex>
                )}
              </HStack>
             {user['role'] !== 'Agent' && 
             <> <VStack>
             <Heading fontSize={"xl"}>Agent chargé</Heading>
             <RadioGroup value={prospectAgent} onChange={handleChange} isDisabled={!isEditing}>
               <VStack direction="row" align={"flex-start"}>
                 {users.map((user, index) => (
                   <Radio
                     size={"sm"}
                     value={user["user_id"]}
                     key={user["user_name"]}
                   >
                     {user["user_name"]}
                   </Radio>
                 ))}
               </VStack>
             </RadioGroup>
           </VStack>
           {!isEditing ? (
             <Button
               colorScheme={"orange"}
               size={"xs"}
               onClick={handleModify}
             >
               Modifier
             </Button>
           ) : (
             <Button
               colorScheme={"orange"}
               size={"xs"}
               onClick={handleSubmit}
             >
               Soumettre
             </Button>
           )}</>}
            </VStack>
          ) : (
            <>
              <Text>Empty data</Text>
            </>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Prospect;
