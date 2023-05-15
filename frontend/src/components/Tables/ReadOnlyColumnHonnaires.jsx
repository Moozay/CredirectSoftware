import React, { useEffect, useState, useContext } from "react";

import {
  Tr,
  Td,
  Checkbox,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEdit, FaFileSignature } from "react-icons/fa";
import { HiViewList } from "react-icons/hi";
import { IoDownloadSharp } from "react-icons/io5";
import { HamburgerIcon } from "@chakra-ui/icons";
import CurrencyFormat from 'react-currency-format';
import { CreditContext } from "context/CreditContext";
import { UserContext } from "context/UserContext";


const ReadOnlyColumn = ({
  demande,
  handleEditClick,

}) => {
  const { changeStringToFloat} = useContext(CreditContext)
  const { user, setUser } = useContext(UserContext);


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
        {demande.hc === null?"":(<CurrencyFormat 
              decimalSeparator=","
              thousandSeparator=" "
              decimalScale={2}
              fixedDecimalScale={true}
              name="montant_debloque"
              value={(demande["hc"])}
              isNumericString
              displayType="text"/>)}
      </Td>
      {user["role"] !== "Agent" &&  <Td
      
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
          isChecked={demande["status_honnaires"]["hb"]}
          disabled
          p={1}
        />
    </Td>}
     
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
          isChecked={demande["status_honnaires"]["hc"]}
          disabled
          p={1}
        />
    </Td>

      <Td
      
        textAlign="center"
        style={{
          padding: 2,
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        <Menu isLazy>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant={"outline"}
            size={"xs"}
          />
          <MenuList>
            <MenuItem
              height={4}
              fontSize={"sm"}
              icon={<FaRegEdit />}
              onClick={(event) => handleEditClick(event, demande)}
            >
              Payments
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </>
  );
};

export default ReadOnlyColumn;
