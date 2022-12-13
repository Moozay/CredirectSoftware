import React, { useEffect, useState, useContext } from "react";

import { Tr, Td, Checkbox, IconButton } from "@chakra-ui/react";

import { FaUserEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import Confirmation from "components/Modals/Confirmation"; 

const ReadOnlyRow = ({
  user,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <Tr id={user.user_id} >
        <Td
          textAlign="center"
          style={{
            padding: 1,
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          {user["user_name"]}
        </Td>
        <Td
          textAlign="center"
          style={{
            padding: 1,
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          {user["email"]}
        </Td>
        <Td
          textAlign="center"
          style={{
            padding: 1,
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          {user["phone"]}
        </Td>
        <Td
          textAlign="center"
          style={{
            padding: 1,
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          {user["role"]}
        </Td>
        <Td
          textAlign="center"
          style={{
            padding: 1,
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
          <Checkbox
            colorScheme="green"
            name={"status"}
            isChecked={user["status"]}
            disabled
            p={1}
          />
        </Td>
        <Td
          textAlign="center"
          style={{
            padding: 1,
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >
       <IconButton
        variant="outline"
        color="green.400"
        aria-label="Call Sage"
        fontSize="15px"
        m={2}
        size="xs"
        icon={<FaUserEdit />}
        onClick={(event) => handleEditClick(event, user)}
      /> 
      <IconButton
        variant="outline"
        color="red.400"
        aria-label="Call Sage"
        fontSize="15px"
        m={2}
        size="xs"
        icon={<AiOutlineDelete />}
        onClick={() => handleDeleteClick(user)}
      /> 
        </Td>
    </Tr>
  );
};

export default ReadOnlyRow;
