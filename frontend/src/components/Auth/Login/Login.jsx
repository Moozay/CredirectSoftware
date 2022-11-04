import React, { useState } from 'react'

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    useColorModeValue,
    useToast
  } from '@chakra-ui/react';

import Logo from "components/Logo/Logo"
import { useAuth } from 'hooks/useAuth';


const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth()
    const toast = useToast()

    

    const handleSubmit = (e) => {
        e.preventDefault();
    
        submitLogin();
    };

    const submitLogin = async () => {
        try {
          await login(email, password)
        } catch (error) {
          toast({
            title: "Invalid email or password",
            status: "error",
            isClosable: true,
            duration: 1500
          })
        }
        
    }


  return (
    <Flex
      minH={'100vh'}
      
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.800', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} w={"30%"} py={12} px={6}>
        <Stack align={'center'}>
          <Logo/>

        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          
          p={8}>
          <Stack spacing={4}>
          <form onSubmit={handleSubmit}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input 
                type="email"
                value={email}
                required="required"
                onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input 
                type="password"
                value={password}
                required="required"
                onChange={(e) => setPassword(e.target.value)} 
                />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.800'}>Forgot password?</Link>
              </Stack>
              <Button
                bg={'#f7941e'}
                color={'white'}
                _hover={{
                  bg: 'orange',
                }}
                type="submit" 
                >
                Sign in
              </Button>
            </Stack>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}

export default Login