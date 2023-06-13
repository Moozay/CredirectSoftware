import React from 'react'

import { 
    Button,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    ModalContent,
      AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  } from '@chakra-ui/react'

const confirmation = ({showConfirmation, setShowConfirmation, header, content, action,payLoad}) => {
    
    
    const handleClose = () => {
      setShowConfirmation(false)
    }

    const handleSubmit = (event,payLoad) => {
      action(event, payLoad)
      console.log(payLoad);
      handleClose()
  }

    return (
        <> 
        
          <Modal closeOnEsc size="2xl" isCentered isOpen={showConfirmation} onClose={()=>setShowConfirmation(false)} motionPreset="none" trapFocus={false}>
            <ModalOverlay bg='none'
                backdropFilter='auto'
                backdropInvert='10%'
                backdropBlur='1px'/>

                    <ModalContent>
                    
                    <ModalHeader>{header}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {content}
                    </ModalBody>
            
                    <ModalFooter>
                    
                    <Button colorScheme='blue' mr={3}  onClick={(event)=> handleSubmit(event,payLoad)} >
                        Oui
                    </Button>
                    <Button colorScheme='blue' mr={3}  onClick={handleClose} >
                        Non
                    </Button>
                    
                    </ModalFooter>
                    
                    </ModalContent>

          </Modal>
         
        </>
      )
}

export default confirmation