import React, { useContext, useState } from "react";

import { Link } from "react-router-dom";

import { FiMenu, FiUsers } from "react-icons/fi";

import { BiLogOutCircle } from "react-icons/bi";

import { FaSun, FaMoon, FaUsersCog } from "react-icons/fa";
import { RiFileEditLine } from "react-icons/ri";
import { MdOutlineManageAccounts, MdPayments } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";
import { AiFillDashboard } from "react-icons/ai";

import { useColorMode } from "@chakra-ui/color-mode";

import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
} from "@chakra-ui/react";

import NavItem from "./NavItem";

import { AuthProvider } from "context/JWTAuthContext";
import { useAuth } from "hooks/useAuth";
import { UserContext, UserProvider } from "context/UserContext";
import { AiFillFolderOpen } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
const Sidebar = (props) => {
  const [navSize, changeNavSize] = useState("small");
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === "light";

  const { user, setUser } = useContext(UserContext);
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <AuthProvider>
      <Flex
        pos="sticky"
        left="5"
        right={props.right}
        h="95vh"
        marginTop="2.5vh"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 15%)"
        borderRadius={navSize == "small" ? "15px" : "15px"}
        w={navSize == "small" ? "80px" : "200px"}
        flexDir="column"
        justifyContent="space-between"
        // bgColor={"#ff7f00"}
        css={
          colorMode == "light"
            ? {
                background: "#ff7f00" /* fallback for old browsers */,
                background:
                  "-webkit-linear-gradient(to bottom, #f2994a, #f2c94c)",
                background: "linear-gradient(to bottom, #f7941e, #d6811dbf)",
              }
            : {
                background: "#ff7f00" /* fallback for old browsers */,
                background:
                  "-webkit-linear-gradient(to bottom, #f2994a, #f2c94c)",
                background: "linear-gradient(to bottom, #2b2645, #000318bf)",
              }
        }
      >
        <Flex flexDir="column" maxH="80%">
          <Flex
            px="5%"
            py={"auto"}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
            as="nav"
            borderTopRadius={navSize == "small" ? "15px" : "15px"}
            bgColor={colorMode == "light" ? "#ffad5c" : "#07041d"}
          >
            <Flex
              w={navSize == "small" ? "80px" : "200px"}
              justifyContent="space-between"
              alignItems={navSize == "small" ? "center" : "flex-start"}
              flexDir={navSize == "small" ? "column" : ""}
            >
              <IconButton
                colorScheme={"whiteAlpha"}
                my={3}
                size="sm"
                color={isLight ? "black" : "white"}
                icon={<FiMenu />}
                isRound=" true"
                onClick={() => {
                  if (navSize == "small") changeNavSize("large");
                  else changeNavSize("small");
                }}
              />
              <IconButton
                my={3}
                mx={"auto"}
                display={navSize == "small" ? "none" : "flex"}
                mr={navSize != "small" ? "25px" : ""}
                right={true}
                icon={isLight ? <FaMoon /> : <FaSun />}
                size="sm"
                color={isLight ? "black" : "white"}
                isRound=" true"
                colorScheme={"whiteAlpha"}
                onClick={toggleColorMode}
              ></IconButton>
            </Flex>
          </Flex>

          <Flex
            maxH="100%"
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
            justifyContent={"flex-start"}
            as="nav"
            overflowY="auto"
            overflowX="hidden"
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
              <NavItem
                navSize={navSize}
                icon={AiFillDashboard}
                title="Metrics"
                path="metrics"
              />
            <NavItem
              navSize={navSize}
              icon={BsBank2}
              title="Nouvelle Demande"
              path="demandeCredit"
            />
            <NavItem
              navSize={navSize}
              icon={AiFillFolderOpen}
              title="Suivie Demandes"
              path="demandes"
            />
            <NavItem
              navSize={navSize}
              icon={MdPayments}
              title="Les Honnaires"
              path="honnaires"
            />
            <NavItem
              navSize={navSize}
              icon={FaUsers}
              title="Liste des Prospects"
              path="prospects"
            />
            {user.role == "Admin" && (
              <NavItem
                navSize={navSize}
                icon={FaUsersCog}
                title="Manage Users"
                path="users"
              />
            )}
          </Flex>
        </Flex>
        <Flex
          p="5%"
          flexDir="column"
          w="100%"
          alignItems={navSize == "small" ? "center" : "flex-start"}
          mb={4}
        >
          <Divider display={navSize == "small" ? "none" : "flex"} />
          <Flex
            mt={4}
            align="center"
            flexDir={navSize == "small" ? "column" : ""}
            justifyContent={"space-between"}
            w="100%"
          >
            <Link to="profile">
              <Flex>
                <Avatar
                  size="sm"
                  src={`http://192.168.11.200:8000/static/${user.avatar}`}
                  display={navSize == "small" ? "none" : "flex"}
                />
                <Flex
                  flexDir="column"
                  ml={4}
                  display={navSize == "small" ? "none" : "flex"}
                >
                  <Heading as="h3" size="sm" fontSize="12px" color="white">
                    {user.user_name}
                  </Heading>
                  <Text fontSize="10px" color="gray.200">
                    {user.role}
                  </Text>
                </Flex>
              </Flex>
            </Link>
            <IconButton
              colorScheme="whiteAlpha"
              color={isLight ? "black" : "white"}
              size="sm"
              w="25px"
              isRound=" true"
              icon={<BiLogOutCircle />}
              onClick={handleLogout}
            ></IconButton>
          </Flex>
        </Flex>
      </Flex>
    </AuthProvider>
  );
};

export default Sidebar;
