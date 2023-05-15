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

const ReadOnlyColumn = ({
  status,
  demande,
  handleEditClick,
  handleDownloadDc,
  handleDownloadMandat,
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
        {demande.montant_valide}
      </Td>
      <Td
      
        textAlign="center"
        style={{
          padding: 1,
          overflowWrap: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        {demande.montant_debloque}
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
              Statut
            </MenuItem>
            <MenuItem
              height={4}
              fontSize={"sm"}
              icon={<IoDownloadSharp />}
              onClick={(event) => handleDownloadDc(event, demande)}
            >
              Demande
            </MenuItem>
            {(demande["statusCredit"] === status[8] ||
                demande["statusCredit"] === status[0]) && (<MenuItem
                  height={4}
                  fontSize={"sm"}
                  icon={<FaFileSignature />}
                  onClick={(event) => handleDownloadMandat(event, demande)}
                >
                  Mandat
                </MenuItem>)}
           
            <Link
              to={"/dashboard/viewProspect"}
              state={{
                id: demande.credit_id,
                return_link: "/dashboard/demandes",
              }}
            >
              <MenuItem height={4} fontSize={"sm"} icon={<FaUserEdit />}>
              Modifier
              </MenuItem>
            </Link>
            <MenuItem
              height={4}
              fontSize={"sm"}
              icon={<HiViewList />}
              onClick={(event) => handleClick(event, demande)}
            >
              Détailler
            </MenuItem>
            <MenuItem
              height={4}
              fontSize={"sm"}
              onClick={() => handleDeleteClick(demande)}
              icon={<AiOutlineDelete />}
            >
              Supprimer
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </>
  );
};

export default ReadOnlyColumn;
