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
    Code
 
  } from "@chakra-ui/react";
import { FaUserEdit } from 'react-icons/fa';

import { AiOutlineUserAdd,AiOutlineDelete,AiOutlineFolderView } from 'react-icons/ai'
import { MdOutlineManageAccounts } from 'react-icons/md'
import { HiViewList } from 'react-icons/hi'
import EditableRow from 'components/Tables/EditableRowUsers';
import ReadOnlyRow from 'components/Tables/ReadOnlyRowUsers';
import Prospect  from './Prospect/Prospect' 
import axiosInstance from 'services/axios';
import { ProspectContext } from 'context/ProspectsContext';
import Confirmation from 'components/Modals/Confirmation';
import { Link } from 'react-router-dom';
const Prospects = () => {
  const { prospects, setProspects } = useContext(ProspectContext)
  const [prospect, setProspect] = useState([])
  const { setReloadProspects } = useContext(ProspectContext)
  const [ showModal, setShowModal ] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast()

  const handleClick = (prospectData) => {
    setProspect(prospectData)
    onOpen()
  }

  const [showConfirmation, setShowConfirmation] = useState({
    show: false,
    payLoad: {}
  })
  const handleDeleteClick = (prospect) =>{
    setShowConfirmation({
      show: true,
      payLoad: prospect
    })
  }


  const handleDelete = async (event, prospect) => {
    event.preventDefault()
    const response = await axiosInstance.delete(`/prospects/${prospect.prospect_id}`)
    setReloadProspects(true)
    toast({
      title: `${response.data.message}`,
      status: "success",
      isClosable: true,
      duration: 1500
    })
  }

  useEffect(()=>{
    console.log(prospects)
  },[prospects])

  return (
    <>
    <Prospect
        isOpen={isOpen} 
        onClose={onClose}
        prospect={prospect}
        />
    <HStack mx={2} justifyContent="space-between">
        <Tag size={"lg"} key={"lg"}  colorScheme="blue" >
            <TagLeftIcon as={MdOutlineManageAccounts} />
            <TagLabel>Listes des Prospects</TagLabel>
        </Tag>
    </HStack>
  <Confirmation
      header={`Supprimer prospect: ${showConfirmation.payLoad.nom} ${showConfirmation.payLoad.prenom}`} 
      content={"Voulez-vous effectuer cette opération ?"}
      setShowConfirmation={setShowConfirmation}
      showConfirmation={showConfirmation.show}
      payLoad={showConfirmation.payLoad}
      action={handleDelete}
      />
    {prospects.length > 0 ? (
    
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
            <Table size="lg"  >
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
                    Nom
                    </Th>
                    <Th
                        textAlign="center"
                        style={{
                          padding: 3,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                    >
                    Prénom
                    </Th>
                    <Th
                        textAlign="center"
                        style={{
                          padding: 3,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                    >
                    Telephone
                    </Th>
                    <Th
                        textAlign="center"
                        style={{
                          padding: 3,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                    >
                    Nationalité
                    </Th>
                    <Th
                        textAlign="center"
                        style={{
                          padding: 3,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                    >
                    Nombre de Crédit
                    </Th>
                    <Th
                        textAlign="center"
                        style={{
                          padding: 1,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                    >
                    Actions
                    </Th>
                </Tr>
              </Thead>
              <Tbody>
                {prospects.map((prospect) => {
                      return (
                         <Tr key={prospect.prospect_id} >
                          <Td
                            textAlign="center"
                            style={{
                              padding: 1,
                              overflowWrap: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {prospect["nom"]}
                          </Td>
                          <Td
                            textAlign="center"
                            style={{
                              padding: 1,
                              overflowWrap: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {prospect["prenom"]}
                          </Td>
                          <Td
                            textAlign="center"
                            style={{
                              padding: 1,
                              overflowWrap: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {prospect["telephone"]}
                          </Td>
                          <Td
                            textAlign="center"
                            style={{
                              padding: 1,
                              overflowWrap: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {prospect["nationalite"]}
                          </Td>
                          <Td
                            textAlign="center"
                            style={{
                              padding: 1,
                              overflowWrap: "break-word",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {prospect["credits"].length}
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
                        /> 
                        <Link to={"/dashboard/viewDemande"} state={{'id' : prospect.prospect_id}}>
                        <IconButton
                          variant="outline"
                          color="blue.400"
                          aria-label="Call Sage"
                          fontSize="15px"
                          
                          size="xs"
                          
                          icon={<HiViewList />}
                        /> 
                        </Link>
                        <IconButton
                          variant="outline"
                          color="red.400"
                          aria-label="Call Sage"
                          fontSize="15px"
                          m={2}
                          size="xs"
                          onClick={(e)=>{ handleDeleteClick(prospect)}}
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
          <Code mt={2}>Aucun Enregistrement Trouvé</Code>
        </Stack>
      )}
      

      </>
  )
}

export default Prospects