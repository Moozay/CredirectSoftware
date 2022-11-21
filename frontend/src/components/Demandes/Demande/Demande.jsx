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
const Demande = ({ isOpen, onClose, demande }) => {
 
  const isMounted = useRef(false)

  useEffect(()=>{
    console.log(demande)
  },[demande])

  return (
    <Drawer placement="right" size="lg" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>Demande Details</DrawerHeader>
          <DrawerBody>
            
              {
              demande ?
               (
                <Flex flexDir="row"  ml="5">
                              <Flex>
                              <Heading
                                fontSize={"13px"}
                                fontWeight="semibold"
                                
                                m="1"
                              >
                                {Keys["type_credit"]} :{" "}
                              </Heading>
                              <Text fontSize="sm" >
                                {demande.type_credit}
                              </Text>
                              </Flex>
                              <Flex>
                              <Heading
                                fontSize={"13px"}
                                fontWeight="semibold"
                                
                                m="1"
                              >
                                {Keys["montant"]} :{" "}
                              </Heading>
                              <Text fontSize="sm" >
                                {demande.montant}
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

export default Demande