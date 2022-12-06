import React, { useState, useEffect } from "react";
import { 
  Input,
  Tr,
  Td,
  Checkbox, 
  IconButton,
  Select,
  InputGroup,
  InputLeftElement, 
  Box
} from "@chakra-ui/react";

// React icons
import { 
  MdOutlineCancel, 
  MdAdminPanelSettings,
  MdOutlineEmail,
  MdOtherHouses
} from 'react-icons/md'
import {VscSymbolNamespace} from "react-icons/vsc"
import {BsCheck} from 'react-icons/bs'
import {AiOutlinePhone} from 'react-icons/ai'

const EditableColumn = ({
  editCreditForm,
  handleEditCreditChange,
  handleEditFormSubmit,
  handleCancel,
  status,
  banques
}) => {
  
  return (
    <>
    <Td style={{ padding: 2 }} textAlign="center">
       <Select  
         size='sm' 
         defaultValue={editCreditForm.statusCredit} 
         name="statusCredit"
         onChange={handleEditCreditChange}
         icon={<MdAdminPanelSettings/>}
         >
         {
         status.map( status => {
           
           return  <option value={status}  key={status} >{status}</option>
         })
         }
         
       </Select>
       
     </Td>
     <Td style={{ padding: 2 }} textAlign="center">
       <Select  
         size='sm' 
        defaultValue={editCreditForm.banque} 
         name="banque"
         onChange={handleEditCreditChange}
         icon={<MdOtherHouses/>}
         >
            <option value="-" key={"pas_encore"}>
              -
            </option>
         {
         banques.map( banque => {
           
           return  <option value={banque}  key={banque} >{banque}</option>
         })
         }
         
       </Select>
       
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
    </>
  );
};

export default EditableColumn;
