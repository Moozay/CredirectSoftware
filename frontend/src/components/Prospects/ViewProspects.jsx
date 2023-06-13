import React, { useContext, useState, useMemo } from 'react'
import Prospects from './Prospects'
import Prospect from './Prospect/Prospect'
import AttributeAgent from './Update/AttributAgent'
import { useDisclosure } from '@chakra-ui/react'
import axiosInstance from 'services/axios'
import { UserContext } from 'context/UserContext'

const ViewProspects = () => {
    const [prospect, setProspect] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [users, setUsers ] = useState();
    const { user } = useContext(UserContext);

    const initialize = async () => {
          const response = await axiosInstance.get("/users/agents");
          console.log(response.data);
          setUsers(response.data);
      };

  return (
    <>
        <Prospect isOpen={isOpen} onClose={onClose} prospect={prospect} user= {user} users={users}/>
        <Prospects  isOpen={isOpen} onClose={onClose} prospect={prospect} initialize={initialize} setProspect={setProspect} onOpen={onOpen}/>
    </>
  )
}

export default ViewProspects