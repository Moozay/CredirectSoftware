import React, { useState }  from 'react'

import { 
    Button,
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    ModalContent,
    FormControl,
    FormLabel,
    Input,
    Select,
    InputGroup,
    InputRightElement,
    useToast,
    IconButton
  } from '@chakra-ui/react'

  import { 
    MdAdminPanelSettings,
    MdOutlineEmail,
  } from 'react-icons/md'
  import {BsKey} from 'react-icons/bs'
  import {VscSymbolNamespace} from "react-icons/vsc"

  import { AiOutlinePhone, AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import axiosInstance from 'services/axios'


const AddUser = (props) => {
    const [newUser, setNewUser] = useState({})
    const [roles, setRoles] = useState([
        "Agent",
        "Admin",
        "Manager",
      ])
    const [showPassword, setShowPassword] = React.useState(false)
    const handlePasswordClick = () => setShowPassword(!showPassword)
    const [randomPassword, setRandomPassword] = useState(null)
    const toast = useToast()
    const handleClose = () => {
        props.setShowModal(false)
    }

    const handleAddUserChange = (event) => {
        event.preventDefault()

        var fieldName = event.target.getAttribute("name")

        

        var fieldValue = event.target.value

        const formUser = {...newUser}
        formUser[fieldName] = fieldValue
        
        setNewUser(formUser)

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(newUser)
            axiosInstance.post("/users/create", newUser)
                .then(Response =>{
                    toast({
                        title: `User Created successfully`,
                        status: "success",
                        isClosable: true,
                        duration: 1500
                      })
                      props.setShowModal(false)
                      
                      const newUsers = {...props.users, newUser}
                      props.setLoaded(false)
                      
                })
                .catch(error =>{
                    toast({
                        title: "User not created",
                        description: error.response.data.detail,
                        status: "error",
                        isClosable: true,
                        duration: 1500
                      })
                      
                      const newUsers = {...props.users, newUser}
                      props.setLoaded(false)
                })
    }
    const handleGeneratePassword = () => {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var passwordLength = 12;
        var password = "";

        for (var i = 0; i <= passwordLength; i++) {
            var randomNumber = Math.floor(Math.random() * chars.length);
            password += chars.substring(randomNumber, randomNumber +1);
           }
        setRandomPassword(password)
        const userForm = {...newUser}
        userForm["password"] = password
        setNewUser(userForm)
    }

  return (
    <>
    <Modal closeOnEsc size="xl" isCentered isOpen={props.showModal} onClose={handleClose}>
            <ModalOverlay bg='none'
                backdropFilter='auto'
                backdropInvert='20%'
                backdropBlur='8px'/>
                <form onSubmit={handleSubmit}>
                    <ModalContent>
                    
                    <ModalHeader>Add New User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="userName" isRequired mb={2}>
                            <FormLabel fontSize={{ base: 'sm', sm: 'sm' }}>User name</FormLabel>
                            <InputGroup size='sm'>
                                <InputRightElement
                                    pointerEvents='none'
                                    children={<VscSymbolNamespace color='gray.300' />}
                                />
                                <Input
                                    size="sm"
                                    type="text"
                                    required="required"
                                    name={"user_name"}
                                    placeholder={"Enter username"}
                                    onChange={handleAddUserChange}
                                    style={{ padding: 8 }}
                                    
                                    autoComplete={"off"}
                                />
                                </InputGroup>
                        </FormControl>
                        <FormControl id="email" isRequired mb={4}>
                            <FormLabel fontSize={{ base: 'sm', sm: 'sm' }}>Email address</FormLabel>
                            <InputGroup size='sm'>
                                <InputRightElement
                                    pointerEvents='none'
                                    children={<MdOutlineEmail color='gray.300' />}
                                />
                                <Input
                                    size="sm"
                                    type="text"
                                    required="required"
                                    name={"email"}
                                    placeholder={"Enter email"}
                                    onChange={handleAddUserChange}
                                    style={{ padding: 8 }}
                                    
                                    autoComplete={"off"}
                                />
                                </InputGroup>
                        </FormControl>
                        <FormControl id="phone" isRequired mb={4}>
                            <FormLabel fontSize={{ base: 'sm', sm: 'sm' }}>Phone</FormLabel>
                            <InputGroup size='sm'>
                                <InputRightElement
                                    pointerEvents='none'
                                    children={<AiOutlinePhone color='gray.300' />}
                                />
                                    <Input
                                    size="sm"
                                    type="text"
                                    required="required"
                                    name={"phone"}
                                    placeholder={"Enter phone number"}
                                    onChange={handleAddUserChange}
                                    style={{ padding: 8 }}
                                    
                                    autoComplete={"off"}
                                />
                                </InputGroup>
                        </FormControl>
                        <FormControl isRequired mb={4}>
                        <FormLabel fontSize={{ base: 'sm', sm: 'sm' }}>Role</FormLabel>

                        <Select  
                            size='sm' 
                            name="role"
                            onChange={handleAddUserChange}
                            icon={<MdAdminPanelSettings/>}
                            
                            >
                                <option value="Agent">Select role</option>
                            {
                            roles.map( role => {
                            
                            return  (
                            
                            <option value={role}  key={role} >{role}</option>
                            )
                            })
                            }
                        </Select>
                        </FormControl>
                        <FormControl isRequired mb={4}>
                        <FormLabel fontSize={{ base: 'sm', sm: 'sm' }}>Password</FormLabel>
                        <InputGroup size='md'>
                            <Input
                                pr='4.5rem'
                                type={showPassword ? 'text' : 'password'}
                                placeholder='Enter password'
                                value={newUser["password"]}
                                onChange={handleAddUserChange}
                                name="password"
                            />
                            
                            <InputRightElement width='4.5rem'>
                                <IconButton 
                                        rounded='50%'
                                        size='xs' 
                                        onClick={handleGeneratePassword}
                                        icon={<BsKey/>}
                                        
                                        >
                                    {showPassword ? 'Hide' : 'Show'}
                                </IconButton>
                                <IconButton 
                                    rounded='50%'
                                    size='xs' 
                                    onClick={handlePasswordClick}
                                    icon={ showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/> }
                                    mx={2}
                                    >
                                {showPassword ? 'Hide' : 'Show'}
                                </IconButton>
                            </InputRightElement>
                        </InputGroup>
                        </FormControl>
                        
                    </ModalBody>
            
                    <ModalFooter>
                    
                    <Button colorScheme='blue' size={"sm"}  type="submit" >
                        Submit
                    </Button>
                    
                    </ModalFooter>
                    
                    </ModalContent>
            </form>
          </Modal>
    </>
  )
}

export default AddUser