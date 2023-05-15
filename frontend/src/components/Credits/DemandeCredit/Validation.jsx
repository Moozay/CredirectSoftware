import React, { useContext, useEffect } from "react";
import { Flex, Heading, Divider, Text } from "@chakra-ui/react";
import { CreditContext } from "context/CreditContext";
import { Keys } from "assets/lang/Keywords";
import { useColorMode } from "@chakra-ui/react";
const Validation = () => {
  const { donneesPersonelles, setdonneesPersonelles } =
    useContext(CreditContext);
  const { donneesBancaires, setDonneesBancaires } = useContext(CreditContext);
  const { credit, setCredit, banquEnvoye } = useContext(CreditContext);
  const { colorMode } = useColorMode();
  console.log(banquEnvoye);

  useEffect(() => {}, [donneesBancaires, credit, donneesPersonelles]);

  return (
    <Flex justifyContent={"space-between"} flexDir="row" mt="1">
      <Flex
        flexDir="column"
        h="70vh"
        mx="1"
        border="1px"
        borderColor={"gray.300"}
        borderRadius="3px"
        bgColor={colorMode == "light" ? "#fff5ef" : "#1a294554"}
        w="33%"
      >
        <Heading
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 5%)"
          textAlign="center"
          fontSize="12px"
          py="2px"
        >
          Emprunteur & Co-Emprunteur
        </Heading>
        <Divider />
        <Flex
          flexDir={"column"}
          mx="1"
          overflowY={"auto"}
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "black",
              borderRadius: "24px",
            },
          }}
        >
          {Object.entries(donneesPersonelles).map(([k, v]) => {
            return typeof v === "object" ? (
              <Flex flexDir="column">
                <Heading fontSize={"13px"} fontWeight="semibold" w="50%" m="1">
                  {Keys[k]} :{" "}
                </Heading>
                {Object.entries(v).map(([kk, vv]) => {
                  return typeof vv === "object" ? (
                    <Flex flexDir="column" ml="5">
                      <Heading
                        fontSize={"13px"}
                        fontWeight="semibold"
                        w="50%"
                        m="1"
                      >
                        {Keys[kk]} :{" "}
                      </Heading>
                      {Object.entries(vv).map(([kkk, vvv]) => {
                        return (
                          <Flex flexDir="row" ml="5">
                            <Heading
                              fontSize={"13px"}
                              fontWeight="semibold"
                              w="50%"
                              m="1"
                            >
                              {Keys[kkk]} :{" "}
                            </Heading>
                            <Text fontSize="sm" mx="2">
                              {vvv}
                            </Text>
                          </Flex>
                        );
                      })}
                    </Flex>
                  ) : (
                    <Flex flexDir="row" ml="5">
                      <Heading
                        fontSize={"13px"}
                        fontWeight="semibold"
                        w="50%"
                        m="1"
                      >
                        {Keys[kk]} :{" "}
                      </Heading>
                      <Text fontSize="sm" mx="4">
                        {vv}
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
            ) : (
              <Flex flexDir="column">
                <Heading fontSize={"13px"} fontWeight="semibold" w="50%" m="1">
                  {Keys[k]} :{" "}
                </Heading>
                <Text fontSize="sm" mx="3">
                  {v}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>

      <Flex
        flexDir="column"
        h="70vh"
        mx="1"
        border="1px"
        borderColor={"gray.300"}
        borderRadius="3px"
        bgColor={colorMode == "light" ? "#fff5ef" : "#1a294554"}
        w="33%"
      >
        <Heading
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 5%)"
          textAlign="center"
          fontSize="12px"
          py="2px"
        >
          Renseignement & Engagement Bancaire
        </Heading>
        <Divider />
        <Flex
          flexDir={"column"}
          mx="1"
          overflowY={"auto"}
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "black",
              borderRadius: "24px",
            },
          }}
        >
          {Object.entries(donneesBancaires).map(([k, v]) => {
            return typeof v === "object" ? (
              <Flex flexDir="column">
                <Heading fontSize={"13px"} fontWeight="semibold" w="50%" m="1">
                  {Keys[k]} :{" "}
                </Heading>
                {Object.entries(v).map(([kk, vv]) => {
                  return typeof vv === "object" ? (
                    <Flex flexDir="column" ml="5" paddingBottom="20px">
                      {Object.entries(vv).map(([kkk, vvv]) => {
                        return (
                          <Flex flexDir="row" ml="5">
                            <Heading
                              fontSize={"13px"}
                              fontWeight="semibold"
                              w="50%"
                              m="1"
                            >
                              {Keys[kkk]} :{" "}
                            </Heading>
                            <Text fontSize="sm" mx="2">
                              {vvv}
                            </Text>
                          </Flex>
                        );
                      })}
                    </Flex>
                  ) : (
                    <Flex flexDir="row" ml="5">
                      <Heading
                        fontSize={"13px"}
                        fontWeight="semibold"
                        w="50%"
                        m="1"
                      >
                        {Keys[kk]} :{" "}
                      </Heading>
                      <Text fontSize="sm" mx="4">
                        {vv}
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
            ) : (
              <Flex flexDir="column">
                <Heading fontSize={"13px"} fontWeight="semibold" w="50%" m="1">
                  {Keys[k]} :{" "}
                </Heading>
                <Text fontSize="sm" mx="3">
                  {v}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
      <Flex
        flexDir="column"
        h="70vh"
        mx="1"
        border="1px"
        borderColor={"gray.300"}
        borderRadius="3px"
        bgColor={colorMode == "light" ? "#fff5ef" : "#1a294554"}
        w="33%"
      >
        <Heading
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 5%)"
          textAlign="center"
          fontSize="12px"
          py="2px"
        >
          Crédit Details
        </Heading>
        <Divider />
        <Flex
          flexDir={"column"}
          ml="2"
          mb="1"
          overflowY={"auto"}
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              height: "1px",
              background: "black",
              borderRadius: "24px",
            },
          }}
        >
          {Object.entries(credit).map(([k, v]) => {
            return typeof v === "object" ? (
              <Flex flexDir="column">
                <Heading fontSize={"13px"} fontWeight="semibold" w="50%" m="1">
                  {Keys[k]} :{" "}
                </Heading>
                {Object.entries(v).map(([kk, vv]) => {
                  return (
                    <Flex flexDir="row" ml="5">
                      <Heading
                        fontSize={"13px"}
                        fontWeight="semibold"
                        w="50%"
                        m="1"
                      >
                        {Keys[kk]} :{" "}
                      </Heading>
                      <Text fontSize="sm" mx="2">
                        {vv}
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
            ) : (
              <Flex flexDir="row">
                <Heading fontSize={"13px"} fontWeight="semibold" w="50%" m="1">
                  {Keys[k]} :{" "}
                </Heading>
                <Text fontSize="sm" mx="2">
                  {v}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
      <Flex
        flexDir="column"
        h="70vh"
        mx="1"
        border="1px"
        borderColor={"gray.300"}
        borderRadius="3px"
        bgColor={colorMode == "light" ? "#fff5ef" : "#1a294554"}
        w="33%"
      >
        <Heading
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 5%)"
          textAlign="center"
          fontSize="12px"
          py="2px"
        >
          Choix Banques
        </Heading>
        <Divider />
        <Flex
          flexDir={"column"}
          ml="2"
          mb="1"
          overflowY={"auto"}
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              height: "1px",
              background: "black",
              borderRadius: "24px",
            },
          }}
        >
          {Object.entries(banquEnvoye).map(([k, v]) => {
            return typeof v === "object" ? (
              <Flex flexDir="column">
                <Heading fontSize={"13px"} fontWeight="semibold" w="50%" m="1">
                  Choix Banques {parseInt(k) + 1}:{" "}
                </Heading>
                {Object.entries(v).map(([kk, vv]) => {
                  return (
                    <Flex flexDir="row" ml="5">
                      <Heading
                        fontSize={"13px"}
                        fontWeight="semibold"
                        w="50%"
                        m="1"
                      >
                        {Keys[kk]} :{" "}
                      </Heading>
                      <Text fontSize="sm" mx="2">
                        {vv}
                      </Text>
                    </Flex>
                  );
                })}
              </Flex>
            ) : (
              <Flex flexDir="row">
                <Heading fontSize={"13px"} fontWeight="semibold" w="50%" m="1">
                  {Keys[k]} :{" "}
                </Heading>
                <Text fontSize="sm" mx="2">
                  {v}
                </Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Validation;
