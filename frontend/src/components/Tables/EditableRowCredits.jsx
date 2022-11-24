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

const EditableRowCredits = ({
  editCreditForm,
  handleEditCreditChange,
  handleEditFormSubmit,
  handleCancel,
  status
}) => {
  
  return (
    <Tr id={editCreditForm.credit_id} >
      <Td
        textAlign="center"
        style={{
          padding: 1,
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        {editCreditForm.prospectInfo.nom}
      </Td>
      <Td
        textAlign="center"
        style={{
          padding: 1,
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        {editCreditForm.prospectInfo.prenom}
      </Td>
      <Td
        textAlign="center"
        style={{
          padding: 1,
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        {editCreditForm.type_credit}
      </Td>
      <Td
        textAlign="center"
        style={{
          padding: 1,
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        {editCreditForm.montant}
      </Td>
      <Td style={{ padding: 2 }} textAlign="center">
       
        <Select  
          size='sm' 
          defaultValue={editCreditForm.statusCredit} 
          name="status"
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
      
      <Td
        textAlign="center"
        style={{
          padding: 2,
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
      <IconButton
      variant="outline"
      color="green.400"
      aria-label="Call Sage"
      fontSize="15px"
      size="xs"
      icon={<FaRegEdit />}
      onClick={(event)=>handleEditClick(event,demande)}

    /> 
    <IconButton
      variant="outline"
      color="blue.400"
      aria-label="Call Sage"
      fontSize="15px"
      
      size="xs"
      m={2}
      icon={<HiViewList />}
      onClick={(event)=>handleShowClick(event,demande)}
    />

    <IconButton
      variant="outline"
      color="blue.400"
      aria-label="Call Sage"
      fontSize="15px"
      
      size="xs"
      
      icon={<IoDownloadSharp />}
      onClick={(event)=>{handleDownload(event,demande["credit_id"])}}
    /> 

    <IconButton
      variant="outline"
      color="red.400"
      aria-label="Call Sage"
      fontSize="15px"
      m={2}
      size="xs"
      onClick={(event)=>{handleDelete(event,demande["prospect_id"])}}
      icon={<AiOutlineDelete />}
    /> 
    
      </Td>
      
  </Tr>
  
)
};

export default EditableRowCredits;
