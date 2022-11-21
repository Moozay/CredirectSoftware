import React, { useEffect, useState, Fragment, useContext } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableContainer,
    Stack,
    Skeleton,
    useToast,
    HStack,
    Button,
    Tag,
    TagLabel,
    TagLeftIcon,
    Td,
    IconButton,
    useDisclosure,
 
  } from "@chakra-ui/react";
import { FaUserEdit } from 'react-icons/fa';
import { IoDownloadSharp } from 'react-icons/io5';


import { AiOutlineUserAdd,AiOutlineDelete,AiOutlineFolderView } from 'react-icons/ai'
import { MdOutlineManageAccounts } from 'react-icons/md'
import { HiViewList } from 'react-icons/hi'
import EditableRow from 'components/Tables/EditableRow';
import ReadOnlyRow from 'components/Tables/ReadOnlyRow';
import Demande from './Demande/Demande'; 
import axiosInstance from 'services/axios';
import { DemandeContext } from 'context/DemandeContext';
import { saveAs } from 'file-saver';

const Demandes = () => {
  const { demandes, setDemandes } = useContext(DemandeContext)
  const [demande, setDemande] = useState([])
  const { reload, setReload } = useContext(DemandeContext)
  const [ showModal, setShowModal ] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()

  const handleClick = (demandeData) => {
    setDemande(demandeData)
    onOpen()
  }

  const handleDownload = async (event, id) => {
    event.preventDefault()
    const response = await axiosInstance.get(`/credits/download/${id}`, {
      params: {
        cacheBustTimestamp : Date.now()
      },
      responseType: 'blob',
      headers:{
        Accept: 'application/ocet-stream',
      },
    })
    const blob = new Blob([response.data], {type: 'application/pdf'})
    const link =document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = id+'.pdf'
    link.click()
    toast({
      title: `dossier de prêt téléchargé`,
      status: "success",
      isClosable: true,
      duration: 1500
    })
  }

  const handleDelete = async (event, id) => {
    event.preventDefault()
    const response = await axiosInstance.delete(`/credits/${id}`)
    setReload(true)
    toast({
      title: `${response.data.message}`,
      status: "success",
      isClosable: true,
      duration: 1500
    })
  }

  useEffect(()=>{
    console.log(demandes)
  },[demandes])

  return (
    <>
    <Demande
        isOpen={isOpen} 
        onClose={onClose}
        demande={demande}
        />
    <HStack mx={2} justifyContent="space-between">
        <Tag size={"lg"} key={"lg"}  colorSchema='blue' >
            <TagLeftIcon as={MdOutlineManageAccounts} />
            <TagLabel>Listes des Demandes</TagLabel>
        </Tag>
    </HStack>
    {demandes.length > 0 ? (
    
    <TableContainer
          m={2}
          border="1px"
          borderColor="gray.200"
          borderRadius="4px"
          overflowY="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "2px",
              height: "2px",
            },
            "&::-webkit-scrollbar-track": {
              width: "2px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "black",
              borderRadius: "24px",
            },
          }}
        >
          <form >
            <Table size="lg" variant='striped'  >
              <Thead>
                <Tr>
                <Th
                        textAlign="center"
                        style={{
                          padding: 3,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                    >
                    Id Credit
                    </Th>
                    <Th
                        textAlign="center"
                        style={{
                          padding: 3,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                    >
                    Type de credit
                    </Th>
                    <Th
                        textAlign="center"
                        style={{
                          padding: 3,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                    >
                    Montant
                    </Th>
                    <Th
                        textAlign="center"
                        style={{
                          padding: 3,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                    >
                    Duree
                    </Th>
                    <Th
                        textAlign="center"
                        style={{
                          padding: 3,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                    >
                    Mensualite
                    </Th>
                    <Th
                        textAlign="center"
                        style={{
                          padding: 3,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                    >
                    Id Prospect
                    </Th>
                    <Th
                        textAlign="center"
                        style={{
                          padding: 3,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                    >
                    Actions
                    </Th>
                </Tr>
              </Thead>
              <Tbody>
                {demandes.map((demande) => {
                  return (
                        <Tr >
                          <Td
                            textAlign="center"
                            style={{
                              padding: 1,
                              overflowWrap: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {demande["credit_id"]}
                          </Td>
                          <Td
                            textAlign="center"
                            style={{
                              padding: 1,
                              overflowWrap: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {demande["type_credit"]}
                          </Td>
                          <Td
                            textAlign="center"
                            style={{
                              padding: 1,
                              overflowWrap: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {demande["montant"]}
                          </Td>
                          <Td
                            textAlign="center"
                            style={{
                              padding: 1,
                              overflowWrap: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {demande["duree_credit"]}
                          </Td>
                          <Td
                            textAlign="center"
                            style={{
                              padding: 1,
                              overflowWrap: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {demande["mensualite"]}
                          </Td>
                          <Td
                            textAlign="center"
                            style={{
                              padding: 1,
                              overflowWrap: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {demande["prospect_id"]}
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
                          icon={<FaUserEdit />}
                        /> 
                        <IconButton
                          variant="outline"
                          color="blue.400"
                          aria-label="Call Sage"
                          fontSize="15px"
                          
                          size="xs"
                          m={2}
                          icon={<HiViewList />}
                          onClick={()=>handleClick(demande)}
                        />

                        <IconButton
                          variant="outline"
                          color="blue.400"
                          aria-label="Call Sage"
                          fontSize="15px"
                          
                          size="xs"
                          
                          icon={<IoDownloadSharp />}
                          onClick={(e)=>{handleDownload(e,demande["credit_id"])}}
                        /> 

                        <IconButton
                          variant="outline"
                          color="red.400"
                          aria-label="Call Sage"
                          fontSize="15px"
                          m={2}
                          size="xs"
                          onClick={(e)=>{handleDelete(e,demande["prospect_id"])}}
                          icon={<AiOutlineDelete />}
                        /> 
                        
                          </Td>
                          
                      </Tr>
                      
                    )
                    
               
                  
                  })}
              </Tbody>
            </Table>
          </form>
        </TableContainer>
      ) : (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )}
      

      </>
  )
}

export default Demandes