import React, {useEffect, useState, useContext} from 'react'
import { Button, ButtonGroup, Stack, Heading, Flex, Spacer } from '@chakra-ui/react'
import ViewEmprunteur from './ViewEmprunteur'
const ViewDonneesPersonnelles = () =>{
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit=(status)=>{
        setIsEditing(status)
    }
    return(
        <>
        <Flex >
        <Heading as="h5" size="sm" >
            Emprunteur Données
        </Heading>
        <Spacer/>
        <Stack direction='row'mb={6}>
            {isEditing?
            <>
            <Button  colorScheme='green' variant='outline' onClick={handleEdit}>
                Soumettre
            </Button>
            <Button  colorScheme='red' variant='outline' onClick={()=>handleEdit(false)}>
                Annuler
            </Button>
            </>:
            <Button  colorScheme='blue' variant='outline' onClick={()=>handleEdit(true)}>
                Edit
            </Button>}
        </Stack>
        </Flex>
        <ViewEmprunteur isEditing={isEditing}/>
        </>
    )
}

export default ViewDonneesPersonnelles