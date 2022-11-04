import React, { useEffect, useState, useRef } from 'react'
import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Center,
    useToast,
    Avatar, 
    IconButton,
    AvatarBadge,
    useDisclosure
  } from '@chakra-ui/react';
  import { AiOutlineEdit } from 'react-icons/ai';
  import AvatarDefault from 'assets/avatar-1.png'


  import axiosInstance from 'services/axios';
  
 

  import UploadAvatar from '../Modals/User/UploadAvatar';

  

const Profile = () => {
    const [currentData, setCurrentData] = useState({})
    const [editDataForm, setEditDataForm] = useState({})

    const [showModal, setShowModal] = useState(false)
    const [avatarImg, setAvatarImg] = useState({})
    
    
    const isMounted = useRef(false)

    const user_name = useRef(currentData.user_name)
    const email = useRef(currentData.email)
    const phone = useRef(currentData.phone)

    const toast = useToast()

    const handleCancelBtn = (event) => {
        event.preventDefault()

        user_name.current.value = currentData.user_name
        email.current.value= currentData.email
        phone.current.value= currentData.phone

        setEditDataForm(currentData)
    
    }

    const handleEditDataChange = (event) => {
        event.preventDefault();
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editDataForm };

        newFormData[fieldName] = fieldValue;
        
        setEditDataForm(newFormData);
    }

    const storeData = async () => {
        try {
            const response = await axiosInstance.post("/users/update_profile", editDataForm)
            setCurrentData(editDataForm)
            toast({
                title: "the Profile has been edited successfully",
                status: "success",
                isClosable: true,
                duration: 1500
              })
        } catch (error) {   
        }
    }

    const handleEditSubmit = async (event) => {
        event.preventDefault()

        storeData()
    }

    const handleAvatarClick = () => {
        setShowModal( true ) 
    }

    useEffect(()=>{
        
        if ( isMounted.current == true ) return
        const initialize = async () => {
            

            const response = await axiosInstance.get("/users/me")
            setCurrentData(response.data)
            setEditDataForm(response.data)
            if( response.data.avatar ){
                setAvatarImg({
                    url: `http://localhost:8000/static/${ response.data.avatar }`,
                    preview: null,
                    name: response.data.user_id,
                    file:null
    
                })
            }else{
                setAvatarImg({
                    url: `http://localhost:8000/static/avatar-1.png`,
                    preview: null,
                    name: response.data.user_id,
                    file: null
    
                })
            }            
        }
        
        initialize()

        isMounted.current = true
        
        
        
    },[editDataForm,showModal])

    

  return (
    
    <Flex
      minH={'90vh'}
      align={'center'}
      justify={'center'}
      >
      <Stack
        spacing={4}
        w={'full'}
        maxW={'xl'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={6}>
        <Heading lineHeight={1.1} fontSize={{ base: 'sm', sm: 'xl' }}>
          Edit Profile
        </Heading>
        <FormControl id="userName">
          
          <Stack direction={['column', 'row']} spacing={6}>
            <Center w="full">
                
               <Avatar size="xl" src={avatarImg.url}  >
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme={"blue"}
                  aria-label="remove Image"
                  icon={<AiOutlineEdit />}
                  onClick={handleAvatarClick}
                />
              </Avatar>
            </Center>
          </Stack>
        <UploadAvatar 
            showModal={showModal} 
            setShowModal={setShowModal} 
            avatarImg={avatarImg}
            setAvatarImg={setAvatarImg}
        />
        </FormControl>
        <form onSubmit={handleEditSubmit}>
        <FormControl id="userName" isRequired mb={2}>
          <FormLabel fontSize={{ base: 'sm', sm: 'sm' }}>User name</FormLabel>
          <Input
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            name="user_name"
            defaultValue={editDataForm.user_name}
            onChange={handleEditDataChange}
            ref={user_name}
          />
        </FormControl>
        <FormControl id="email" isRequired mb={4}>
          <FormLabel fontSize={{ base: 'sm', sm: 'sm' }}>Email address</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
            name="email"
            defaultValue={editDataForm.email}
            onChange={handleEditDataChange}
            ref={email}
          />
        </FormControl>
        <FormControl id="phone" isRequired mb={4}>
          <FormLabel fontSize={{ base: 'sm', sm: 'sm' }}>Phone</FormLabel>
          <Input
            placeholder="+212 603840990"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            name="phone"
            defaultValue={editDataForm.phone}
            onChange={handleEditDataChange}
            ref={phone}
          />
        </FormControl>
        
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.900'}
            color={'white'}
            w="full"
            onClick={handleCancelBtn}>
            Cancel
          </Button>
          <Button
            bg={'blue.800'}
            color={'white'}
            w="full"
            type="submit">
            Submit
          </Button>
        </Stack>
        </form>
      </Stack>
      
    </Flex>
    
  )
}

export default Profile