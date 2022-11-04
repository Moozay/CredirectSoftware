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

const confirmation = ({showModal, setShowModal, header, content ,handleSubmit}) => {
    
    
    const handleClose = () => {
        setShowModal(false)
    }

    return (
        <> 
        
          <Modal closeOnEsc size="3xl" isCentered isOpen={showModal} onClose={handleClose}>
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
                    
                    <Button colorScheme='blue' mr={3}  onClick={handleSubmit} >
                        Confirm Submit
                    </Button>
                    
                    </ModalFooter>
                    
                    </ModalContent>

          </Modal>
         
        </>
      )
}

export default confirmation