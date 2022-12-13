import React, { useEffect, useState, useContext } from "react";

import { Tr, Td, Checkbox, IconButton } from "@chakra-ui/react";

import { FaUserEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaRegEdit } from "react-icons/fa";
import { HiViewList } from "react-icons/hi";
import { IoDownloadSharp } from "react-icons/io5";
 

const ReadOnlyColumn = ({
  demande,
  handleEditClick,
  handleDownload,
  handleClick,
  handleDeleteClick,
}) => {

  return (
    <>
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
            padding: 1,
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          {demande.banque}
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
    onClick={(event)=>handleClick(event,demande)}
/>

<IconButton
    variant="outline"
    color="blue.400"
    aria-label="Call Sage"
    fontSize="15px"
    
    size="xs"
    
    icon={<IoDownloadSharp />}
    onClick={(event)=>handleDownload(event,demande)}
/> 

<IconButton
    variant="outline"
    color="red.400"
    aria-label="Call Sage"
    fontSize="15px"
    m={2}
    size="xs"
    onClick={() => handleDeleteClick(demande)}
    icon={<AiOutlineDelete />}
/> 

    </Td>
    </>
  );
};

export default ReadOnlyColumn;
