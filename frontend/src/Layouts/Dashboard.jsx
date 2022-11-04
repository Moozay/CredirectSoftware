import React from 'react'

// Routing
import { Outlet, useLocation } from "react-router-dom";

// Contexts and providers
import { LayoutContext, LayoutProvider } from 'context/LayoutContext';
import { CreditContext, CreditProvider } from 'context/CreditContext';
// Components
import Sidebar from "components/Sidebar/Sidebar";
import Panel from 'components/Panel';

import { useColorMode } from "@chakra-ui/color-mode";

// Chakra-ui components
import { 
    Flex,
    Text,
    HStack, 
    Divider,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink
} from "@chakra-ui/react";
import { UserProvider } from 'context/UserContext';
import { ProspectProvider } from 'context/ProspectsContext';

const Dashboard = () => {

  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation()

  

  return (
    <UserProvider>
      <ProspectProvider>
      <CreditProvider>
    <Flex 
          h="100vh" 
          flexDir="row" 
          backgroundColor={colorMode === "light"?"#f5f5f5":""}
          overflowY="hidden"
          >
              <Sidebar />
              <Divider orientation='vertical' ml="10" />
            <Flex
              w="100%"
              py="8px"
              px="24px"
              flexDir="column"
              overflowX="hidden"
              overflowY="auto"
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
              minH="100vh"
              
            >
              <HStack my={2} justifyContent="space-between">
                <Breadcrumb fontWeight='medium' fontSize='sm'>
                  {location.pathname.split("/").slice(1).map((path)=>{
                    {path = path.charAt(0).toUpperCase() + path.slice(1)}
                    return (
                      <BreadcrumbItem>
                        <Text>{path}</Text>
                      </BreadcrumbItem>
                    )
                  })}
                </Breadcrumb>
              </HStack>
              
              {location.pathname == "/dashbord"
              ?
              <Panel/>
              :
              <Outlet />
              }
          </Flex>
          {/* <Divider orientation='vertical' mr="10" />
          <Sidebar right="5" /> */}
             
          </Flex>
          </CreditProvider>
          </ProspectProvider>
          </UserProvider>
      
  )
}

export default Dashboard