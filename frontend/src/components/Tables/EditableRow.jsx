import React, { useState, useEffect } from "react";
import { 
  Input,
  Tr,
  Td,
  Checkbox, 
  IconButton,
  Select,
  InputGroup,
  InputLeftElement 
} from "@chakra-ui/react";

// React icons
import { 
  MdOutlineCancel, 
  MdAdminPanelSettings,
  MdOutlineEmail
} from 'react-icons/md'
import {VscSymbolNamespace} from "react-icons/vsc"
import {BsCheck} from 'react-icons/bs'
import {AiOutlinePhone} from 'react-icons/ai'

const EditableRow = ({
  editUserForm,
  handleEditUserChange,
  handleEditFormSubmit,
  handleCancel,
  roles
}) => {
  
  return (
    <Tr alignContent={"center"}>
        <Td style={{ padding: 2 }} textAlign="center">
        <InputGroup size='sm'>
          <InputLeftElement
            pointerEvents='none'
            children={<VscSymbolNamespace color='gray.300' />}
          />
          <Input
            size="sm"
            type="text"
            required="required"
            name={"user_name"}
            defaultValue={editUserForm["user_name"]}
            onChange={handleEditUserChange}
            style={{ padding: 0 }}
            textAlign="center"
          />
          </InputGroup>
        </Td>
        <Td style={{ padding: 2 }} textAlign="center">
        <InputGroup size='sm'>
          <InputLeftElement
            pointerEvents='none'
            children={<MdOutlineEmail color='gray.300' />}
          />
          <Input
            size="sm"
            type="text"
            required="required"
            name={"email"}
            defaultValue={editUserForm["email"]}
            onChange={handleEditUserChange}
            style={{ padding: 0 }}
            textAlign="center"
          />
          </InputGroup>
        </Td>
        <Td style={{ padding: 2 }} textAlign="center">
          <InputGroup size='sm'>
          <InputLeftElement
            pointerEvents='none'
            children={<AiOutlinePhone color='gray.300' />}
          />
            <Input
            size="sm"
            type="text"
            required="required"
            name={"phone"}
            defaultValue={editUserForm["phone"]}
            onChange={handleEditUserChange}
            style={{ padding: 0 }}
            textAlign="center"
          />
          </InputGroup>
          
        </Td>
        <Td style={{ padding: 2 }} textAlign="center">
       
          <Select  
            size='sm' 
            defaultValue={editUserForm["role"]} 
            name="role"
            onChange={handleEditUserChange}
            icon={<MdAdminPanelSettings/>}
            >
            {
            roles.map( role => {
              
              return  <option value={role}  key={role} >{role}</option>
            })
            }
            
          </Select>
          
        </Td>
        
        <Td style={{ padding: 2 }} textAlign="center" >
        <Checkbox
            
            name={"status"}
            size='lg' 
            colorScheme='orange'
            isChecked={editUserForm["status"]}
            onChange={handleEditUserChange}
            p={1}
          />
        </Td>
        
        <Td
          style={{ padding: 2 }} textAlign="center"
        >
          <IconButton
            variant="outline"
            color="blue.400"
            aria-label="Call Sage"
            fontSize="15px"
            m={2}
            size="xs"
            icon={<BsCheck />}
            onClick={handleEditFormSubmit}
            
          
          /> 
          <IconButton
            variant="outline"
            color="orange.400"
            aria-label="Call Sage"
            fontSize="15px"
            m={2}
            size="xs"
            icon={<MdOutlineCancel />}
            onClick={handleCancel}
            type="submit"
            
          /> 
        </Td>
    </Tr>
  );
};

export default EditableRow;
