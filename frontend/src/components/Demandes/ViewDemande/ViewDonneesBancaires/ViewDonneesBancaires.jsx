import React, {useEffect, useState, useContext} from 'react'
import { Button, ButtonGroup, Stack } from '@chakra-ui/react'

const ViewDonneesBancaires= () =>{
    const [isEditing, setIsEditing] = useState(false)

    const handleEdit=(status)=>{
        setIsEditing(status)
    }
    return(
        <>
        <Stack direction='row'>
            {isEditing?
            <>
            <Button  colorScheme='blue' variant='outline' onClick={handleEdit}>
                Soumettre
            </Button>
            <Button  colorScheme='blue' variant='outline' onClick={()=>handleEdit(false)}>
                Annuler
            </Button>
            </>:
            <Button  colorScheme='blue' variant='outline' onClick={()=>handleEdit(true)}>
                Edit
            </Button>}
        </Stack>
        </>
    )
}

export default ViewDonneesBancaires