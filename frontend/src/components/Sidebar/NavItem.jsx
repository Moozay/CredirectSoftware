import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import { Flex, Text, Icon, Menu, MenuButton } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";

const NavItem = ({ icon, title, path, active, navSize, onClose }) => {
    
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(true);
  const l = location.pathname.split("/")[location.pathname.split("/").length - 1];
  const { colorMode, toggleColorMode } = useColorMode();
  
  useEffect(() => {
    if (l == path.split("/")[path.split("/").length - 1]) {
      setActiveNav(true);
    } else {
      setActiveNav(false);
    }
    
  }, [location, path]);

  return (
    <Flex
      my={2}
      p={2}
      
      borderLeft={activeNav ? "4px" : ""}
      borderRight={activeNav ? "4px" : ""}
      borderLeftColor={activeNav  ? (colorMode == "light" ? "#e4e4e4" : "#181E29") : ""}
      borderRightColor={activeNav  ? (colorMode == "light" ? "#e4e4e4" : "#181E29") : ""}
      _hover={{
        textDecor: "none",
        backgroundColor: colorMode == "light"? "#ffad5c":"#07041d",
        color: "#000",
      }}
      backgroundColor={activeNav ? (colorMode == "light"? "#ffb56b":"#07041d") : ""}
      flexDir="column"
      w="100%"
      alignItems={navSize == "small" ? "center" : "flex-start"}
      
    >
      <Menu placement="right">
        <Link
          w={navSize == "large" && "100%"}
          to={path}
          onClick={onClose}
        >
          <MenuButton w="100%">
            <Flex>
              {/* #00AFFF */}
              <Icon
                as={icon}
                fontSize="xl"
                color="white"
              />
              <Text ml={5} display={navSize == "small" ? "none" : "flex"} color="white">
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
      </Menu>
    </Flex>
  );
};
export default NavItem;
