import React, {useEffect, useRef, useState} from 'react'
import {
   Drawer,
   DrawerHeader,
   DrawerContent,
   DrawerOverlay,
   DrawerBody,
   Flex,
   Text,
   Heading,
   Box

} from '@chakra-ui/react'
import axiosInstance from 'services/axios'
import { Keys } from 'assets/lang/Keywords'
const Prospect = ({ isOpen, onClose, prospect }) => {
 
  const isMounted = useRef(false)

  useEffect(()=>{
    console.log(prospect)
  },[prospect])

  return (
    <Drawer placement="right" size="lg" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Prospect Details</DrawerHeader>
          <DrawerBody>
            
              {
              prospect ?
               (
                <Flex flexDir="row"  ml="5">
                              <Flex>
                              <Heading
                                fontSize={"13px"}
                                fontWeight="semibold"
                                
                                m="1"
                              >
                                {Keys["nom"]} :{" "}
                              </Heading>
                              <Text fontSize="sm" >
                                {prospect.nom}
                              </Text>
                              </Flex>
                              <Flex>
                              <Heading
                                fontSize={"13px"}
                                fontWeight="semibold"
                                
                                m="1"
                              >
                                {Keys["prenom"]} :{" "}
                              </Heading>
                              <Text fontSize="sm" >
                                {prospect.prenom}
                              </Text>
                              </Flex>
                            </Flex>
               ):(
                <><Text>Empty data</Text></>
               )
              }
            
          </DrawerBody>
        </DrawerContent>
      </Drawer>
  )
}

export default Prospect