import React, {useEffect, useState, useContext} from 'react'
import { Button, ButtonGroup, Flex, Stack,Heading, Spacer } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import ViewRenseignements from './ViewRenseignements'
import ViewEngagements from './ViewEnagements'
import { UpdateContext } from 'context/UpdateContext'

const ViewDonneesBancaires= () =>{
    const {isEditing,donneesPersonnelles ,setDonneesPersonnelles} = useContext(UpdateContext)

    const handleEngChange = (data) =>{
        setDonneesPersonnelles({
            ...donneesPersonnelles,
            "emprunteur":{
              ...donneesPersonnelles.emprunteur,
              "engagements_bancaires": data
            }
          })
        console.log((donneesPersonnelles));
      }
    
      const handleRenChange = (data) =>{
        setDonneesPersonnelles({
          ...donneesPersonnelles,
          "emprunteur":{
            ...donneesPersonnelles.emprunteur,
            "renseignements_bancaires": data
          }
        })
        console.log(donneesPersonnelles);
      }

    return(
        <>
        <Flex>
        <Heading as="h5" size="sm" >
         Renseignements  Données
        </Heading>
        <Spacer/>
        </Flex>
        <ViewRenseignements isEditing={isEditing} handleRenChange={handleRenChange}/>
        <Heading as="h5" size="sm" mt={6}>
         Engagements  Données
        </Heading>
        <ViewEngagements isEditing={isEditing} handleEngChange={handleEngChange}/>
        </>
    )
}

export default ViewDonneesBancaires