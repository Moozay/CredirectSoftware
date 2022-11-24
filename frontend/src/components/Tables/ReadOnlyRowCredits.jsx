import React, { useEffect, useState, useContext } from "react";

import { Tr, Td, Checkbox, IconButton } from "@chakra-ui/react";

import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import { HiViewList } from 'react-icons/hi'
import { IoDownloadSharp } from 'react-icons/io5';



const ReadOnlyRowCredits = ({
  demande,
  handleEditClick,
  handleDownload,
  handleShowClick,
  handleDelete,
}) => {
    return (
        <Tr id={demande.credit_id} >
          <Td
            textAlign="center"
            style={{
              padding: 1,
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {demande.prospectInfo.nom}
          </Td>
          <Td
            textAlign="center"
            style={{
              padding: 1,
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {demande.prospectInfo.prenom}
          </Td>
          <Td
            textAlign="center"
            style={{
              padding: 1,
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {demande.type_credit}
          </Td>
          <Td
            textAlign="center"
            style={{
              padding: 1,
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {demande.montant}
          </Td>
          <Td
            textAlign="center"
            style={{
              padding: 1,
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          >
            {demande.statusCredit}
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

export default ReadOnlyRowCredits;
