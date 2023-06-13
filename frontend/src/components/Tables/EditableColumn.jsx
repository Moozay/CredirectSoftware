import React, { useState, useEffect, useContext } from "react";
import { 
  Input,
  Tr,
  Td,
  Checkbox, 
  IconButton,
  Select,
  InputGroup,
  InputLeftElement, 
  Box,
  FormControl
} from "@chakra-ui/react";
import CurrencyFormat from 'react-currency-format';

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
import { UserContext } from "context/UserContext";

const EditableColumn = ({
  editCreditForm,
  handleEditCreditChange,
  handleEditFormSubmit,
  handleCancel,
  status,
  banques
}) => {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
    <Td  style={{ padding: 2 }} textAlign="center">
       <Select  
         size='sm' 
         defaultValue={editCreditForm.statusCredit} 
         name="statusCredit"
         onChange={handleEditCreditChange}
         icon={<MdAdminPanelSettings/>}
         pointerEvents={editCreditForm.statusCredit === "Débloqué" && user["role"] === "Agent"? "none" : ""}
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
            padding: 1,
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          <FormControl isReadOnly={editCreditForm.statusCredit === 'Validation accord & contrat' ? false:true}>
          <InputGroup size='sm'>
              <CurrencyFormat 
              is
              customInput={Input}
              decimalSeparator=","
              thousandSeparator=" "
              decimalScale={2}
              fixedDecimalScale={true}
              name="montant_valide"
              value={editCreditForm.montant_valide}
              onChange={handleEditCreditChange}
              placeholder='# ### ###.##' />
          </InputGroup>
          </FormControl> 
        </Td>
        <Td
        
          textAlign="center"
          style={{
            padding: 1,
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          <FormControl isReadOnly={editCreditForm.statusCredit === 'Débloqué' ? false:true}>
          <InputGroup size='sm'>
              <CurrencyFormat 
              is
              customInput={Input}
              decimalSeparator=","
              thousandSeparator=" "
              decimalScale={2}
              fixedDecimalScale={true}
              name="montant_debloque"
              value={editCreditForm.montant_debloque}
              onChange={handleEditCreditChange}
              placeholder='# ### ###.##' />
          </InputGroup>
          </FormControl> 
        </Td>
    
     <Td  style={{ padding: 2 }} textAlign="center">
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
         m={0.4}
         size="xs"
         icon={<BsCheck />}
         onClick={handleEditFormSubmit}
         
       
       /> 
       <IconButton
         variant="outline"
         color="orange.400"
         aria-label="Call Sage"
         fontSize="15px"
         m={0.4}
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
