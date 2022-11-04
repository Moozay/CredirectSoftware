import React, { useState } from 'react'

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

import Avatar from 'react-avatar-edit'
import axiosInstance from 'services/axios'
import AvatarDefault from 'assets/avatar-1.png'

const UploadAvatar = ({showModal, setShowModal, avatarImg, setAvatarImg}) => {
    
     
    const [filename, setFileName] = useState("")
    const [src, setSrc] = useState(null)
    
    const dataURLtoFile= (dataurl, filename)=> {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    const onBoxClose = () => {
        setAvatarImg({
                url : avatarImg.url,
                preview: null,
                name : avatarImg.name,
                file: avatarImg.file
            })
    }

    const onCrop = (preview) => {
        
        var myFile = dataURLtoFile(preview, avatarImg.name);
        
        setAvatarImg({
            url : avatarImg.url,
            preview: preview,
            name : avatarImg.name,
            file: myFile
        })
    }

    const onBeforeFileLoad = (elem) => {
        if(elem.target.files[0].size < 71680){
            
            setAvatarImg({
                url : avatarImg.url,
                preview: avatarImg.preview,
                name : elem.target.files[0].name,
                file: elem.target.files[0]
            })
        }else{
            elem.target.value = "";
        };
    }
    const handleClose = () => {
        
        setShowModal(false)
    
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        
        const formData = new FormData()
        formData.append(
            "avatar",
            avatarImg.file,
            avatarImg.name
            )
        
        const response = axiosInstance.post("/users/update_profile/image", formData)
            
        
        handleClose();
    }
    return (
        <> 
        
          <Modal closeOnEsc size="3xl" isCentered isOpen={showModal} onClose={handleClose}>
            <ModalOverlay bg='none'
                backdropFilter='auto'
                backdropInvert='20%'
                backdropBlur='8px'/>
                <form onSubmit={handleSubmit}>
                    <ModalContent>
                    
                    <ModalHeader>Upload Profile Image</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Avatar
                        width={"3xl"}
                        height={295}
                        onCrop={onCrop}
                        onClose={onBoxClose}
                        onBeforeFileLoad={onBeforeFileLoad}
                        src={avatarImg.url ? avatarImg.url : AvatarDefault } 
                        />
                    </ModalBody>
            
                    <ModalFooter>
                    
                    <Button colorScheme='blue' mr={3}  type="submit" >
                        Submit
                    </Button>
                    
                    </ModalFooter>
                    
                    </ModalContent>
            </form>
          </Modal>
         
        </>
      )
}

export default UploadAvatar