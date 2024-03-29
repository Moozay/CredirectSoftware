import React, { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  DrawerBody,
  Flex,
  Text,
  Heading,
  Box,
  useToast,
  Radio,
  RadioGroup, 
  HStack,
  VStack,
  Button,
} from "@chakra-ui/react";
import axiosInstance from "services/axios";
import { UpdateContext } from "context/UpdateContext";
import { Keys } from "assets/lang/Keywords";
import { DemandeContext } from "context/DemandeContext";
import { useContext } from "react";
import { UserContext } from "context/UserContext";
import CurrencyFormat from "react-currency-format";

const Demande = ({ isOpen, onClose, demande, status }) => {
  const { demandes, setDemandes } = useContext(DemandeContext);
  const isMounted = useRef(false);
  const { changeStringToFloat } = useContext(UpdateContext);

  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [creditAgent, setCreditAgent] = useState({});
  const { user, setUser } = useContext(UserContext);
  const toast = useToast();
  const handleModify = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setCreditAgent(e);
    console.log(e);
  };

  const handleSubmit = () => {
    console.log(creditAgent);
    const updateCreditAgent = {
      credit_id: demande["credit_id"],
      agent_id: creditAgent,
    };
    axiosInstance
      .post(
        `credits/agentupdate/${updateCreditAgent.credit_id}/${updateCreditAgent.agent_id}`
      )
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
    console.log(updateCreditAgent);
  };

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
    setCreditAgent(demande["agent_id"]);
    console.log(users);
  }, [demande]);

  return (
    <Drawer placement="right" size="lg" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          Demande Details: {demande?.date?.split("T")[0]}
        </DrawerHeader>
        <DrawerBody>
          {demande ? (
            <VStack alignItems={"flex-start"} w="100%">
              <HStack w="100%" my={4}>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["type_credit"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{demande.type_credit}</Text>
                </Flex>
              </HStack>
              {demande.type_credit != "consommation" && (
                <>
                  <HStack w="100%" my={4}>
                    <Flex>
                      <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                        {Keys["objet_credit"]} :{" "}
                      </Heading>
                      <Text fontSize="sm">{demande.objet_credit}</Text>
                    </Flex>
                    <Flex>
                      <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                        {Keys["nature_bien"]} :{" "}
                      </Heading>
                      <Text fontSize="sm">{demande.nature_bien}</Text>
                    </Flex>
                  </HStack>
                  <HStack w="100%" my={4}>
                    <Flex>
                      <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                        {Keys["etat_bien"]} :{" "}
                      </Heading>
                      <Text fontSize="sm">{demande.etat_bien}</Text>
                    </Flex>
                  </HStack>
                  <HStack w="100%" my={4}>
                    <Flex>
                      <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                        {Keys["usage_bien"]} :{" "}
                      </Heading>
                      <Text fontSize="sm">{demande.usage_bien}</Text>
                    </Flex>
                    <Flex>
                      <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                        {Keys["montant_travaux"]} :{" "}
                      </Heading>
                      <Text fontSize="sm">{demande.montant_travaux}</Text>
                    </Flex>
                  </HStack>
                  <HStack>
                    <Flex>
                      <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                        {Keys["montant_acte"]} :{" "}
                      </Heading>
                      <Text fontSize="sm">{demande.montant_acte}</Text>
                    </Flex>
                    <Flex>
                      <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                        {Keys["montant_venal"]} :{" "}
                      </Heading>
                      <Text fontSize="sm">{demande.montant_venal}</Text>
                    </Flex>
                  </HStack>
                  <HStack w="100%" my={4}>
                    <Flex>
                      <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                        {Keys["adresse"]} :{" "}
                      </Heading>
                      <Text fontSize="sm">
                        {demande.adresse_bien?.adresse1}
                      </Text>
                    </Flex>
                    <Flex>
                      <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                        {Keys["ville"]} :{" "}
                      </Heading>
                      <Text fontSize="sm">{demande.adresse_bien?.ville}</Text>
                    </Flex>
                    <Flex>
                      <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                        {Keys["pays"]} :{" "}
                      </Heading>
                      <Text fontSize="sm">{demande.adresse_bien?.pays}</Text>
                    </Flex>
                  </HStack>
                  <HStack w="100%" my={4}>
                    <Flex>
                      <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                        {Keys["superficie"]} :{" "}
                      </Heading>
                      <Text fontSize="sm">{demande.superficie}</Text>
                    </Flex>
                    <Flex>
                      <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                        {Keys["titre_foncier"]} :{" "}
                      </Heading>
                      <Text fontSize="sm">{demande.titre_foncier}</Text>
                    </Flex>
                  </HStack>
                  <HStack w="100%" my={4}>
                    <Flex>
                      <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                        {Keys["garanties"]} :{" "}
                      </Heading>
                      <Text fontSize="sm">{demande.garanties}</Text>
                    </Flex>
                  </HStack>
                  <HStack>
                    <Flex>
                      <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                        {Keys["promoteur"]} :{" "}
                      </Heading>
                      <Text fontSize="sm">{demande.promoteur}</Text>
                    </Flex>
                    {demande.promoteur === "Oui" && (
                      <Flex>
                        <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                          {Keys["promoteur_nom"]} :{" "}
                        </Heading>
                        <Text fontSize="sm">{demande.promoteur_nom}</Text>
                      </Flex>
                    )}
                  </HStack>
                </>
              )}
              <HStack w="100%" my={4}>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["montant"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{demande.montant}</Text>
                </Flex>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["duree_credit"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{demande.duree_credit}</Text>
                </Flex>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["frequence"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{demande.frequence}</Text>
                </Flex>
              </HStack>
              <HStack w="100%" my={4}>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["taux"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{demande.taux}</Text>
                </Flex>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["mensualite"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{demande.mensualite}</Text>
                </Flex>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["franchise"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{demande.franchise}</Text>
                </Flex>
              </HStack>
              <HStack w="100%" my={4}>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["taux_endt"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{demande.taux_endt}</Text>
                </Flex>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["teg"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{demande.teg}</Text>
                </Flex>
              </HStack>
              <HStack w="100%" my={4}>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["qot_financement"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{demande.qot_financement}</Text>
                </Flex>
                <Flex>
                  <Heading fontSize={"13px"} fontWeight="semibold" m="1">
                    {Keys["commentaires"]} :{" "}
                  </Heading>
                  <Text fontSize="sm">{demande.commentaires}</Text>
                </Flex>
              </HStack>
              <HStack w="100%" my={4}>
                {(demande["statusCredit"] === status[8] ||
                  demande["statusCredit"] === status[9]) && (
                  <Flex>
                    <Heading fontSize={"13px"} fontWeight="bold" m="1">
                      Honnoraires Client :{" "}
                    </Heading>
                    <Text fontSize="sm">
                      <CurrencyFormat
                        displayType="text"
                        value={demande["hc"]}
                        decimalSeparator=","
                        thousandSeparator=" "
                        decimalScale={2}
                        fixedDecimalScale={true}
                        isNumericString
                      />
                    </Text>
                  </Flex>
                )}
                {demande["statusCredit"] === status[9] && (
                  <Flex>
                    <Heading fontSize={"13px"} fontWeight="bold" m="1">
                      Honnoraires Banque :{" "}
                    </Heading>
                    <Text fontSize="sm">
                      <CurrencyFormat
                        displayType="text"
                        value={demande["hb"]}
                        decimalSeparator=","
                        thousandSeparator=" "
                        decimalScale={2}
                        fixedDecimalScale={true}
                        isNumericString
                      />
                    </Text>
                  </Flex>
                )}
              </HStack>
              {user["role"] !== "Agent" && (
                <>
                  {" "}
                  <VStack>
                    <Heading fontSize={"xl"}>Agent chargé</Heading>
                    <RadioGroup
                      value={creditAgent}
                      onChange={handleChange}
                      isDisabled={!isEditing}
                    >
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
                  )}
                </>
              )}
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

export default Demande;
