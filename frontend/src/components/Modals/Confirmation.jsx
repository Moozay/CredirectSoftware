import React from 'react'

import { 
    Button,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    ModalContent
  } from '@chakra-ui/react'

const confirmation = ({showConfirmation, setShowConfirmation, header, content, action,payLoad}) => {
    
    
    const handleClose = () => {
      setShowConfirmation({
        ...showConfirmation,
        show: false,
        payLoad: {}
      })
    }

    const handleSubmit = (event,payLoad) => {
      action(event, payLoad)
      console.log(payLoad);
      handleClose()
  }

    return (
        <> 
        
          <Modal closeOnEsc size="3xl" isCentered isOpen={showConfirmation} onClose={handleClose}>
            <ModalOverlay bg='none'
                backdropFilter='auto'
                backdropInvert='20%'
                backdropBlur='8px'/>

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