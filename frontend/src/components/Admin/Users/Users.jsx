import React, { useEffect, useState, useRef, Fragment } from 'react'
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
    TagLeftIcon
  } from "@chakra-ui/react";

import { AiOutlineUserAdd } from 'react-icons/ai'
import { MdOutlineManageAccounts } from 'react-icons/md'

import EditableRow from 'components/Tables/EditableRow';
import ReadOnlyRow from 'components/Tables/ReadOnlyRow';

import axiosInstance from 'services/axios';
import AddUser from 'components/Modals/Users/AddUser';

const Users = () => {
    const [users, setUsers] = useState([])
    const [editUserForm, setEditUserForm] = useState({});
    const [editUserId, setEditUserId] = useState(null);
    const [roles, setRoles] = useState([
        "Admin",
        "Manager",
        "Agent"
      ])
    const [ showModal, setShowModal ] = useState(false)
    const toast = useToast()

    const [loaded, setLoaded] = useState(false)

    // Edit Functions
    const handleEditClick = (event, user) => {
        event.preventDefault()
        
        setEditUserId(user.user_id);
        const formValues = user;
        setEditUserForm(formValues);
    }
    
    const handleEditUserChange = (event) => {
        event.preventDefault()
        
        var fieldName = event.target.getAttribute("name")
        var fieldValue = null
        if(event.target.getAttribute("type") == "checkbox"){
            fieldValue = event.target.checked
            console.log(fieldValue)
        }else{
            fieldValue = event.target.value
            console.log(fieldValue)
        }
        
        const newFormUser = { ...editUserForm }

        newFormUser[fieldName] = fieldValue

        setEditUserForm(newFormUser)

    }

    const handleEditFormSubmit = async (event)=>{
        event.preventDefault()

        const editedUser = editUserForm

        const newUsers = [...users]
        const index = users.findIndex((user) => user.user_id == editUserId)

        newUsers[index] = editedUser

        setUsers(newUsers)
        storeUser(editedUser)
        setEditUserId(null)
    }

    const storeUser = async ( editedUser ) => {
        try {
            const response = axiosInstance.post("/users/update", editedUser)
            
        } catch (error) {
            
        }
    }
    
    // Add Functions
    const handleAddClick = () => {
        setShowModal(true)
    } 

    // Delete Functions
    const handleDelete = async (event, user) => {
        event.preventDefault()
        console.log(user)
        try {
            const response = await axiosInstance.delete(`/users/${user.user_id}`)
            
            toast({
                title: `${response.data.message}`,
                status: "success",
                isClosable: true,
                duration: 1500
              })
              initialize()
            
        } catch (err) {
            console.log(err)
        }
    }

    // Cancel Function
    const handleCancel = () => {

    }
    const initialize = async () => {
        const response = await axiosInstance.get("/users/all")
        // console.log(response.data)
        setUsers(response.data)
    }
    
    useEffect(()=>{
        
        if( loaded == true ) return
        
        initialize()

        setLoaded(true)


    },[users, editUserId, loaded])

  return (
    <>
    <HStack mx={2} justifyContent="space-between">
        <Tag size={"lg"} key={"lg"}  colorSchema='blue' >
            <TagLeftIcon as={MdOutlineManageAccounts} />
            <TagLabel>Manage Users</TagLabel>
        </Tag>
        
        <Button
            variant="outline"
            colorSchema='blue'
            aria-label="Call Sage"
            fontSize="14px"
            m={2}
            size="sm"
            leftIcon={<AiOutlineUserAdd />}
            onClick={handleAddClick}
        >Add New User</Button>
        <AddUser showModal={showModal} setShowModal={setShowModal} setLoaded={setLoaded}/>
    </HStack>
    {users.length > 0 ? (
    
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
          <form onSubmit={handleEditFormSubmit}>
            <Table size="lg" >
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
                    Username
                    </Th>
                    <Th
                        textAlign="center"
                        style={{
                          padding: 3,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                    >
                    Email
                    </Th>
                    <Th
                        textAlign="center"
                        style={{
                          padding: 3,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                    >
                    Phone
                    </Th>
                    <Th
                        textAlign="center"
                        style={{
                          padding: 3,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                    >
                    Role
                    </Th>
                    <Th
                        textAlign="center"
                        style={{
                          padding: 3,
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                    >
                    Status
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
                {users.map((user) => (
                    <Fragment>
                        {editUserId === user.user_id ? (
                            <EditableRow
                              editUserForm={editUserForm}
                              handleEditUserChange={handleEditUserChange}
                              handleEditFormSubmit={handleEditFormSubmit}
                              handleCancel={handleCancel}
                              roles={roles}
                            />
                          ) : (
                            <ReadOnlyRow
                              user={user}
                              handleEditClick={handleEditClick}
                              handleDelete={handleDelete}
                            />
                        )}
                      </Fragment>
                    ))}
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

export default Users